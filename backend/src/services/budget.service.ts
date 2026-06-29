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