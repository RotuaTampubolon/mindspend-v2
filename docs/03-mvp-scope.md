# MVP Scope

## MVP Objective

Memvalidasi apakah kombinasi budget tracking dan weekly financial check-in
dapat membantu mahasiswa lebih disiplin dalam mengelola pengeluaran bulanan.

---

## Core Loop

Sebelum masuk ke feature list, penting untuk memahami core loop yang ingin
divalidasi di MVP ini:

> User set budget → catat transaksi → monitor progress →
> terima weekly check-in → reflect → adjust behavior

Semua feature di MVP dirancang untuk mendukung loop ini.
Tidak ada yang di luar loop ini yang masuk scope MVP.

---

## Features Included

### Authentication

- Register
- Login
- Logout

### Onboarding

- Set Current Balance
- Set Monthly Budget
- Set Reminder Preference

*Onboarding adalah first-time setup. Budget yang dibuat di sini
bisa di-update kapan saja setelah onboarding selesai.*

### Dashboard

- Current Balance
- Monthly Budget
- Used Budget
- Remaining Budget
- Financial Status *(Healthy / Warning / Danger)*

### Transaction Management

- Add Income
- Add Expense
- Delete Transaction
- Transaction History

*Edit transaction tidak termasuk MVP. User dapat menghapus dan
menambahkan ulang transaksi yang salah input.*

### Budget Management

- Update Monthly Budget

*Create budget sudah di-handle saat onboarding. Feature ini memungkinkan
user menyesuaikan budget kapan saja — misalnya saat mendekati akhir semester
dengan pengeluaran project yang meningkat.*

### Weekly Financial Check-In

- Friday Reminder
- Budget Usage Summary
- Financial Status *(Healthy / Warning / Danger)*
- Static Recommendation berbasis threshold

*Recommendation di MVP menggunakan static template berbasis budget usage,
bukan AI. AI-powered insight akan diintroduce di V2 setelah
sufficient spending data terkumpul dari real users.*

**Threshold logic:**

| Budget Usage | Recommendation |
|---|---|
| < 50% | On track. Pertahankan spending pattern ini. |
| 50% – 75% | Hati-hati. Lebih dari setengah budget sudah terpakai. |
| 75% – 90% | Warning. Kurangi discretionary spending. |
| > 90% | Danger. Tahan semua pengeluaran non-essential. |

---

## Out of Scope

Fitur berikut tidak termasuk dalam MVP dan akan dievaluasi untuk
roadmap selanjutnya:

- AI Financial Assistant *(target V2)*
- Edit Transaction *(user dapat delete + re-add)*
- Savings Goals
- Investment Tracking
- Debt Management
- Gamification
- Achievement System

---

## Validation Criteria

MVP dianggap berhasil jika:

- User dapat menyelesaikan onboarding dan set budget pertama mereka
- User mencatat transaksi secara rutin dalam satu periode budget
- User membuka Weekly Financial Check-In setelah reminder dikirim
- User melakukan budget adjustment minimal satu kali berdasarkan kondisi keuangan mereka