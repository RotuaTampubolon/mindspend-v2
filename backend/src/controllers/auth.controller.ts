import { Request, Response } from 'express';
import { registerUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validasi input
    if (!name || !email || !password) {
      res.status(400).json({
        message: 'Nama, email, dan password wajib diisi',
      });
      return;
    }

    // 2. Serahkan ke service
    const result = await registerUser({ name, email, password });

    // 3. Kirim response
    res.status(201).json({
      message: 'Registrasi berhasil',
      data: result,
    });

  } catch (error: any) {
    // Kalau email sudah terdaftar
    if (error.message === 'EMAIL_ALREADY_EXISTS') {
      res.status(409).json({
        message: 'Email sudah terdaftar',
      });
      return;
    }

    // Error lain yang tidak terduga
    res.status(500).json({
      message: 'Terjadi kesalahan server',
    });
  }
};