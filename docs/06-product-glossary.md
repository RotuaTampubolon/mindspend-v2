# Product Glossary

Dokumen ini berisi definisi istilah yang digunakan di seluruh sistem Mindspend.
Semua term di sini harus konsisten digunakan di codebase, UI copy, dan dokumentasi.

---

## Balance

Jumlah uang yang dimiliki user saat ini, dihitung berdasarkan semua
transaksi yang telah dicatat di Mindspend.

**Formula:**
Balance = Starting Balance + Total Income - Total Expense

---

## Current Balance

Saldo terkini user setelah seluruh transaksi di-kalkulasi.
Tidak di-reset saat bulan berganti — sisa saldo carry over ke periode berikutnya.

*Lihat: Carry Over Balance di Financial Model.*

---

## Income

Transaksi yang menambah saldo user.
Dapat masuk kapan saja — tidak terikat dengan budget period.

Contoh:

- Kiriman Bulanan
- Freelance
- Bonus
- Cashback

---

## Expense

Transaksi yang mengurangi saldo user.
Hanya expense yang dicatat di Mindspend yang masuk ke kalkulasi budget.

Contoh:

- Food
- Transport
- Shopping
- Entertainment

---

## Monthly Budget

Batas pengeluaran bulanan yang ditentukan secara sadar oleh user.

Budget berfungsi sebagai spending commitment — bukan cerminan dari
saldo yang dimiliki. Income tambahan tidak otomatis mengubah budget.

*Lihat: Budget Is a Commitment di Product Principles.*

---

## Active Period Budget

Budget yang berlaku di periode berjalan.

Untuk user yang mendaftar di tengah bulan, active period budget
dihitung secara pro-rated berdasarkan sisa hari di bulan tersebut.

**Formula:**
First Month Budget = (Monthly Budget / Total Days in Month) × Remaining Days

Mulai bulan kedua, active period budget = full monthly budget.

---

## Remaining Budget

Sisa budget yang masih tersedia di periode berjalan.

**Formula:**
Remaining Budget = Active Period Budget - Total Expense

---

## Budget Period

Periode aktif budget user. Mengikuti calendar-based cycle —
dimulai tanggal 1 dan berakhir di hari terakhir setiap bulan.

Budget counter di-reset setiap awal bulan baru.
Current Balance tidak ikut di-reset.

---

## Transaction

Aktivitas finansial yang dicatat oleh user di Mindspend.

Terdiri dari dua tipe:

- **Income** — menambah saldo
- **Expense** — mengurangi saldo

---

## Category

Klasifikasi transaksi untuk membantu user memahami
ke mana uang mereka pergi.

Kategori yang tersedia di MVP:

- Food
- Transport
- Shopping
- Entertainment
- Others

---

## Financial Status

Status kondisi keuangan user berdasarkan persentase
budget usage di periode berjalan.

| Status | Kondisi | Budget Usage |
|---|---|---|
| **Healthy** | On track, spending terkontrol | < 50% |
| **Warning** | Mendekati batas, perlu hati-hati | 50% – 75% |
| **Danger** | Budget hampir habis, perlu immediate action | 75% – 90% |
| **Critical** | Budget nyaris atau sudah terlampaui | > 90% |

---

## Weekly Financial Check-In

Ringkasan kondisi keuangan yang di-deliver setiap hari Jumat
melalui push notification dan in-app screen.

Terdiri dari:

- Budget usage summary
- Financial Status terkini
- Static recommendation berbasis threshold

Tujuan: mendorong user melakukan financial reflection sebelum
memasuki weekend — periode dengan spending risk tertinggi.

---

## Reminder

Push notification yang dikirim sistem untuk membantu user
tetap aware terhadap kondisi keuangan mereka.

Di MVP, reminder dikirim setiap hari Jumat sebagai trigger
untuk Weekly Financial Check-In.

---

## Carry Over Balance

Mekanisme di mana sisa Current Balance dari bulan sebelumnya
tidak di-reset dan tetap terbawa ke periode berikutnya.

Yang di-reset setiap awal bulan: budget counter.
Yang tidak di-reset: Current Balance.