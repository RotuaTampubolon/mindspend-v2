import prisma from '../utils/prisma';

// ─── Create Transaction ──────────────────────────────

interface CreateTransactionInput {
  userId: string;
  categoryId?: string;
  amount: number;
  type: 'INCOME' | 'EXPENSE';
  note?: string;
  date: string;
}

export const createTransactionService = async (input: CreateTransactionInput) => {
  const { userId, categoryId, amount, type, note, date } = input;

  const transaction = await prisma.transaction.create({
    data: {
      userId,
      categoryId: categoryId ?? null,
      amount,
      type,
      note: note ?? null,
      date: new Date(date),
    },
    include: {
      category: true,
    },
  });

  return transaction;
};

// ─── Get Transactions ────────────────────────────────

interface GetTransactionsInput {
  userId: string;
  type?: 'INCOME' | 'EXPENSE';
  month?: number;
  year?: number;
}

export const getTransactionsService = async (input: GetTransactionsInput) => {
  const { userId, type, month, year } = input;

  // Build filter
  const where: any = { userId };

  if (type) {
    where.type = type;
  }

  if (month && year) {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59);
    where.date = { gte: startOfMonth, lte: endOfMonth };
  }

  const transactions = await prisma.transaction.findMany({
    where,
    include: { category: true },
    orderBy: { date: 'desc' },
  });

  return transactions;
};

// ─── Delete Transaction ──────────────────────────────

export const deleteTransactionService = async (
  transactionId: string,
  userId: string
) => {
  // Cek ownership
  const transaction = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    throw new Error('TRANSACTION_NOT_FOUND');
  }

  if (transaction.userId !== userId) {
    throw new Error('UNAUTHORIZED');
  }

  await prisma.transaction.delete({
    where: { id: transactionId },
  });

  return { deleted: true };
};