import prisma from '../utils/prisma';

// ─── Helper: generate insight rule-based ────────────

const generateInsight = (adherenceRate: number, mood?: string | null): string => {
  let base: string;

  if (adherenceRate >= 90) {
    base = 'Luar biasa! Kamu sangat disiplin sama budget bulan ini.';
  } else if (adherenceRate >= 70) {
    base = 'Bagus, kamu masih on track dengan budget kamu.';
  } else if (adherenceRate >= 50) {
    base = 'Budget kamu mulai menipis. Coba lebih hati-hati di sisa periode ini.';
  } else {
    base = 'Pengeluaran kamu udah lewat setengah budget. Yuk evaluasi pengeluaran terbesar minggu ini.';
  }

  if (mood === 'STRESSED' || mood === 'BAD') {
    base += ' Kamu juga lagi merasa kurang baik, wajar kalau pengeluaran naik saat begini.';
  }

  return base;
};

// ─── Create CheckIn ──────────────────────────────────

interface CreateCheckInInput {
  userId: string;
  period: 'WEEKLY' | 'MONTHLY';
  mood?: 'GREAT' | 'OKAY' | 'STRESSED' | 'BAD';
  reflection?: string;
}

export const createCheckInService = async (input: CreateCheckInInput) => {
  const { userId, period, mood, reflection } = input;

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  // Ambil week number kalau periodnya WEEKLY
  const getWeekNumber = (date: Date): number => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfMonth = date.getDate();
    return Math.ceil((dayOfMonth + firstDay.getDay()) / 7);
  };

  const week = period === 'WEEKLY' ? getWeekNumber(now) : null;

  // 1. Ambil budget bulan ini
  const budget = await prisma.budget.findUnique({
    where: { userId_month_year: { userId, month, year } },
  });

  // 2. Hitung total spent & income bulan ini
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59);

  const [expenseResult, incomeResult] = await Promise.all([
    prisma.transaction.aggregate({
      where: { userId, type: 'EXPENSE', date: { gte: startOfMonth, lte: endOfMonth } },
      _sum: { amount: true },
    }),
    prisma.transaction.aggregate({
      where: { userId, type: 'INCOME', date: { gte: startOfMonth, lte: endOfMonth } },
      _sum: { amount: true },
    }),
  ]);

  const totalSpent = Number(expenseResult._sum.amount ?? 0);
  const totalIncome = Number(incomeResult._sum.amount ?? 0);
  const totalBudget = budget ? Number(budget.totalAmount) : null;

  // 3. Hitung adherence rate — North Star metric
  // Formula: MAX(0, (totalBudget - totalSpent) / totalBudget × 100)
  let adherenceRate: number | null = null;
  if (totalBudget && totalBudget > 0) {
    const raw = ((totalBudget - totalSpent) / totalBudget) * 100;
    adherenceRate = Math.max(0, Math.min(100, Math.round(raw * 100) / 100));
  }

  // 4. Generate insight
  const aiInsight = adherenceRate !== null
    ? generateInsight(adherenceRate, mood)
    : 'Set budget bulan ini dulu supaya kami bisa kasih insight yang lebih akurat.';

  // 5. Simpan snapshot
  const checkIn = await prisma.checkIn.create({
    data: {
      userId,
      period,
      month,
      year,
      week,
      totalBudget,
      totalSpent,
      totalIncome,
      adherenceRate,
      mood,
      reflection,
      aiInsight,
    },
  });

  return checkIn;
};

// ─── Get Latest CheckIn ──────────────────────────────

export const getLatestCheckInService = async (userId: string) => {
  const checkIn = await prisma.checkIn.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  if (!checkIn) {
    throw new Error('CHECKIN_NOT_FOUND');
  }

  return checkIn;
};

// ─── Get CheckIn History ─────────────────────────────

interface GetCheckInsInput {
  userId: string;
  period?: 'WEEKLY' | 'MONTHLY';
  limit?: number;
}

export const getCheckInsService = async (input: GetCheckInsInput) => {
  const { userId, period, limit } = input;

  const where: any = { userId };
  if (period) where.period = period;

  const checkIns = await prisma.checkIn.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit ?? 20,
  });

  return checkIns;
};