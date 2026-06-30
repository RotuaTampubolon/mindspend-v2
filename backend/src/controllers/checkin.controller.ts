import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import {
  createCheckInService,
  getLatestCheckInService,
  getCheckInsService,
} from '../services/checkin.service';

export const createCheckIn = async (req: AuthRequest, res: Response) => {
  try {
    const { period, mood, reflection } = req.body;

    if (!period || !['WEEKLY', 'MONTHLY'].includes(period)) {
      res.status(400).json({ message: 'Period harus WEEKLY atau MONTHLY' });
      return;
    }

    const validMoods = ['GREAT', 'OKAY', 'STRESSED', 'BAD'];
    if (mood && !validMoods.includes(mood)) {
      res.status(400).json({ message: 'Mood tidak valid' });
      return;
    }

    const result = await createCheckInService({
      userId: req.userId!,
      period,
      mood,
      reflection,
    });

    res.status(201).json({
      message: 'Check-in berhasil disimpan',
      data: result,
    });

  } catch (error: any) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

export const getLatestCheckIn = async (req: AuthRequest, res: Response) => {
  try {
    const result = await getLatestCheckInService(req.userId!);

    res.status(200).json({
      message: 'Check-in terakhir ditemukan',
      data: result,
    });

  } catch (error: any) {
    if (error.message === 'CHECKIN_NOT_FOUND') {
      res.status(404).json({ message: 'Belum ada check-in' });
      return;
    }
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

export const getCheckIns = async (req: AuthRequest, res: Response) => {
  try {
    const { period, limit } = req.query;

    const result = await getCheckInsService({
      userId: req.userId!,
      period: period as 'WEEKLY' | 'MONTHLY' | undefined,
      limit: limit ? Number(limit) : undefined,
    });

    res.status(200).json({
      message: 'Riwayat check-in ditemukan',
      data: result,
    });

  } catch (error: any) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};