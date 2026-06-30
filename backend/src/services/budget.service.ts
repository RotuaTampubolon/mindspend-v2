import prisma from '../utils/prisma';

// ─── Helper: hitung pro-rated budget ────────────────
// Untuk user yang daftar di tengah bulan
const getProRatedAmount = (totalAmount: number, registrationDate: Date): number => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed

  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const remainingDays = totalDaysInMonth - now.getDate() + 1;

  // Kalau daftar di awal bulan, tidak perlu pro-rate
  const isFirstMonth =
    registrationDate.getFullYear() === year &&
    registrationDate.getMonth() === month;

  if (!isFirstMonth) return totalAmount;

  return Math.round((totalAmount / totalDaysInMonth) * remainingDays);
};

// ─── Create Budget ───────────────────────────────────

interface CreateBudgetInput {
  userId: string;
  totalAmount: number;
  notes?: string;
}

export const createBudgetService = async (input: CreateBudgetInput) => {
  const { userId, totalAmount, notes } = input;

  const now = new Date();
  const month = now.getMonth() + 1; // 1-indexed
  const year = now.getFullYear();

  // Cek apakah budget bulan ini sudah ada
  const existing = await prisma.budget.findUnique({
    where: { userId_month_year: { userId, month, year } },
  });

  if (existing) {
    throw new Error('BUDGET_ALREADY_EXISTS');
  }

  // Ambil tanggal registrasi user untuk pro-rate calculation
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const proRatedAmount = getProRatedAmount(totalAmount, user!.createdAt);

  const budget = await prisma.budget.create({
    data: {
      userId,
      month,
      year,
      totalAmount: proRatedAmount,
      notes,
    },
  });

  return {
    ...budget,
    originalAmount: totalAmount,
    isProRated: proRatedAmount !== totalAmount,
  };
};

// ─── Get Current Budget + Summary ───────────────────

export const getCurrentBudgetService = async (userId: string) => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const budget = await prisma.budget.findUnique({
    where: { userId_month_year: { userId, month, year } },
  });

  if (!budget) {
    throw new Error('BUDGET_NOT_FOUND');
  }

  // Hitung total expense bulan ini
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59);

  const expenseResult = await prisma.transaction.aggregate({
    where: {
      userId,
      type: 'EXPENSE',
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { amount: true },
  });

  const totalSpent = Number(expenseResult._sum.amount ?? 0);
  const totalBudget = Number(budget.totalAmount);
  const remaining = totalBudget - totalSpent;
  const usagePercent = totalBudget > 0
    ? Math.round((totalSpent / totalBudget) * 100)
    : 0;       

  // Financial status logic — dari product docs
  let financialStatus: 'HEALTHY' | 'WARNING' | 'DANGER' | 'CRITICAL';
  if (usagePercent < 50) financialStatus = 'HEALTHY';
  else if (usagePercent < 75) financialStatus = 'WARNING';
  else if (usagePercent < 90) financialStatus = 'DANGER';
  else financialStatus = 'CRITICAL';

  return {
    budget,
    summary: {
      totalBudget,
      totalSpent,
      remaining,
      usagePercent,
      financialStatus,
    },
  };
};

// ─── Update Budget ───────────────────────────────────

interface UpdateBudgetInput {
  userId: string;
  budgetId: string;
  totalAmount: number;
  notes?: string;
}

export const updateBudgetService = async (input: UpdateBudgetInput) => {
  const { userId, budgetId, totalAmount, notes } = input;

  // Pastikan budget ini milik user yang request
  const budget = await prisma.budget.findUnique({
    where: { id: budgetId },
  });

  if (!budget) {
    throw new Error('BUDGET_NOT_FOUND');
  }

  if (budget.userId !== userId) {
    throw new Error('UNAUTHORIZED');
  }

  const updated = await prisma.budget.update({
    where: { id: budgetId },
    data: { totalAmount, notes },
  });

  return updated;
}; 

// ─── Get Budget Summary (Enhanced) ──────────────────

export const getBudgetSummaryService = async (userId: string, budgetId: string) => {
  // 1. Ambil budget, pastikan milik user ini
  const budget = await prisma.budget.findUnique({
    where: { id: budgetId },
  });

  if (!budget) {
    throw new Error('BUDGET_NOT_FOUND');
  }

  if (budget.userId !== userId) {
    throw new Error('UNAUTHORIZED');
  }

  const { month, year } = budget;
  const totalBudget = Number(budget.totalAmount);

  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59);
  const now = new Date();

  // 2. Total spent bulan ini (sama seperti getCurrentBudgetService)
  const expenseResult = await prisma.transaction.aggregate({
    where: {
      userId,
      type: 'EXPENSE',
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { amount: true },
  });
  const totalSpent = Number(expenseResult._sum.amount ?? 0);

  // 3. Breakdown spending per kategori
  const categoryBreakdown = await prisma.transaction.groupBy({
    by: ['categoryId'],
    where: {
      userId,
      type: 'EXPENSE',
      date: { gte: startOfMonth, lte: endOfMonth },
    },
    _sum: { amount: true },
  });

  // groupBy cuma kasih categoryId, kita perlu join manual ke detail kategori
  const categoryIds = categoryBreakdown
    .map((c) => c.categoryId)
    .filter((id): id is string => id !== null);

  const categories = await prisma.category.findMany({
    where: { id: { in: categoryIds } },
  });

  const spendingByCategory = categoryBreakdown.map((item) => {
    const category = categories.find((c) => c.id === item.categoryId);
    const amount = Number(item._sum.amount ?? 0);

    return {
      categoryId: item.categoryId,
      categoryName: category?.name ?? 'Uncategorized',
      icon: category?.icon ?? 'other',
      color: category?.color ?? '#9CA3AF',
      amount,
      percentage: totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0,
    };
  });

  // Urutkan dari yang paling besar spending-nya
  spendingByCategory.sort((a, b) => b.amount - a.amount);

  // 4. Daily average — dua angka, dua cerita berbeda
  const totalDaysInMonth = new Date(year, month, 0).getDate();

  // Hari yang udah berjalan di bulan ini (minimal 1, hindari divide by zero)
  const isCurrentMonth = now.getFullYear() === year && now.getMonth() + 1 === month;
  const daysElapsed = isCurrentMonth ? now.getDate() : totalDaysInMonth;
  const daysRemaining = isCurrentMonth ? totalDaysInMonth - now.getDate() + 1 : 0;

  const actualDailyAverage = daysElapsed > 0
    ? Math.round(totalSpent / daysElapsed)
    : 0;

  const remaining = totalBudget - totalSpent;
  const recommendedDailySpend = daysRemaining > 0
    ? Math.round(Math.max(0, remaining) / daysRemaining)
    : 0;

  // 5. Financial status (logic sama seperti getCurrentBudgetService)
  const usagePercent = totalBudget > 0
    ? Math.round((totalSpent / totalBudget) * 100)
    : 0;

  let financialStatus: 'HEALTHY' | 'WARNING' | 'DANGER' | 'CRITICAL';
  if (usagePercent < 50) financialStatus = 'HEALTHY';
  else if (usagePercent < 75) financialStatus = 'WARNING';
  else if (usagePercent < 90) financialStatus = 'DANGER';
  else financialStatus = 'CRITICAL';

  return {
    budget,
    summary: {
      totalBudget,
      totalSpent,
      remaining,
      usagePercent,
      financialStatus,
    },
    spendingByCategory,
    dailyAverage: {
      actual: actualDailyAverage,
      recommended: recommendedDailySpend,
      daysElapsed,
      daysRemaining,
    },
  };
};