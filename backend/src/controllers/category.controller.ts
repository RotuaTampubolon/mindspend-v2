import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { getCategoriesService } from '../services/category.service';

export const getCategories = async (req: AuthRequest, res: Response) => {
  try {
    const result = await getCategoriesService(req.userId!);

    res.status(200).json({
      message: 'Kategori ditemukan',
      data: result,
    });

  } catch (error: any) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};