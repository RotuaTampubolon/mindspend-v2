import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import {
  createBudgetService,
  getCurrentBudgetService,
  updateBudgetService,
} from '../services/budget.service';

export const createBudget = async (req: AuthRequest, res: Response) => {
  try {
    const { totalAmount, notes } = req.body;

    if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
      res.status(400).json({ message: 'Total budget harus diisi dan lebih dari 0' });
      return;
    }

    const result = await createBudgetService({
      userId: req.userId!,
      totalAmount: Number(totalAmount),
      notes,
    });

    res.status(201).json({
      message: 'Budget berhasil dibuat',
      data: result,
    });

  } catch (error: any) {
    if (error.message === 'BUDGET_ALREADY_EXISTS') {
      res.status(409).json({ message: 'Budget bulan ini sudah ada' });
      return;
    }
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

export const getCurrentBudget = async (req: AuthRequest, res: Response) => {
  try {
    const result = await getCurrentBudgetService(req.userId!);

    res.status(200).json({
      message: 'Budget ditemukan',
      data: result,
    });

  } catch (error: any) {
    if (error.message === 'BUDGET_NOT_FOUND') {
      res.status(404).json({ message: 'Budget bulan ini belum diset' });
      return;
    }
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

export const updateBudget = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { totalAmount, notes } = req.body;

    if (!totalAmount || isNaN(totalAmount) || totalAmount <= 0) {
      res.status(400).json({ message: 'Total budget harus diisi dan lebih dari 0' });
      return;
    }

    const result = await updateBudgetService({
      userId: req.userId!,
      budgetId: String(id),
      totalAmount: Number(totalAmount),
      notes,
    });

    res.status(200).json({
      message: 'Budget berhasil diupdate',
      data: result,
    });

  } catch (error: any) {
    if (error.message === 'BUDGET_NOT_FOUND') {
      res.status(404).json({ message: 'Budget tidak ditemukan' });
      return;
    }
    if (error.message === 'UNAUTHORIZED') {
      res.status(403).json({ message: 'Kamu tidak punya akses ke budget ini' });
      return;
    }
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};