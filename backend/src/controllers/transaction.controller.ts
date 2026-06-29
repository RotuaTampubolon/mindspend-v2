import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import {
  createTransactionService,
  getTransactionsService,
  deleteTransactionService,
} from '../services/transaction.service';

export const createTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryId, amount, type, note, date } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      res.status(400).json({ message: 'Amount harus diisi dan lebih dari 0' });
      return;
    }

    if (!type || !['INCOME', 'EXPENSE'].includes(type)) {
      res.status(400).json({ message: 'Type harus INCOME atau EXPENSE' });
      return;
    }

    if (!date) {
      res.status(400).json({ message: 'Tanggal transaksi wajib diisi' });
      return;
    }

    const result = await createTransactionService({
      userId: req.userId!,
      categoryId,
      amount: Number(amount),
      type,
      note,
      date,
    });

    res.status(201).json({
      message: 'Transaksi berhasil dicatat',
      data: result,
    });

  } catch (error: any) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

export const getTransactions = async (req: AuthRequest, res: Response) => {
  try {
    // Query params: ?type=EXPENSE&month=6&year=2026
    const { type, month, year } = req.query;

    const result = await getTransactionsService({
      userId: req.userId!,
      type: type as 'INCOME' | 'EXPENSE' | undefined,
      month: month ? Number(month) : undefined,
      year: year ? Number(year) : undefined,
    });

    res.status(200).json({
      message: 'Transaksi ditemukan',
      data: result,
    });

  } catch (error: any) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

export const deleteTransaction = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;

    await deleteTransactionService(id, req.userId!);

    res.status(200).json({
      message: 'Transaksi berhasil dihapus',
    });

  } catch (error: any) {
    if (error.message === 'TRANSACTION_NOT_FOUND') {
      res.status(404).json({ message: 'Transaksi tidak ditemukan' });
      return;
    }
    if (error.message === 'UNAUTHORIZED') {
      res.status(403).json({ message: 'Kamu tidak punya akses ke transaksi ini' });
      return;
    }
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};