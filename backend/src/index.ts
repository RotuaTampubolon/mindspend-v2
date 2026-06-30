import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import budgetRoutes from "./routes/budget.routes"
import transactionRoutes from './routes/transaction.routes';
import categoryRoutes from './routes/category.routes';
import checkinRoutes from './routes/checkin.routes';

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares ──────────────────────────────
// Parse JSON body dari setiap request
app.use(express.json());

// Izinkan cross-origin request (Flutter → Backend)
app.use(cors());

// ── Health Check ─────────────────────────────
// Endpoint sederhana untuk verify server jalan
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Mindspend API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/auth", authRoutes);
app.use('/budgets', budgetRoutes);
app.use('/transactions', transactionRoutes);
app.use('/categories', categoryRoutes);
app.use('/check-ins', checkinRoutes);

// ── Start Server ─────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
