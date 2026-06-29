import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Request type supaya bisa tambah userId
export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // 1. Ambil token dari header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      message: 'Akses ditolak. Token tidak ditemukan.',
    });
    return;
  }

  // 2. Ekstrak token — "Bearer eyJhbGci..." → "eyJhbGci..."
  const token = authHeader.split(' ')[1];

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    // 4. Inject userId ke request — controller bisa akses ini
    req.userId = decoded.userId;

    // 5. Lanjut ke controller
    next();

  } catch (error) {
    res.status(401).json({
      message: 'Token tidak valid atau sudah expired.',
    });
  }
};