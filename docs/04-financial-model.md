# Financial Model

## Core Concepts

### Current Balance

Jumlah uang yang dimiliki user saat ini berdasarkan semua transaksi
yang telah dicatat di Mindspend.

**Formula:**

Current Balance = Starting Balance + Total Income - Total Expense

---

### Income

Semua transaksi yang menambah saldo user.

Contoh:

- Kiriman Bulanan
- Freelance
- Bonus
- Cashback

---

### Expense

Semua transaksi yang mengurangi saldo user.
Hanya expense yang dicatat di Mindspend yang dihitung —
pengeluaran sebelum user mendaftar tidak masuk ke kalkulasi.

Contoh:

- Food
- Transport
- Shopping
- Entertainment

---

### Monthly Budget

Batas pengeluaran bulanan yang ditentukan secara sadar oleh user.

Budget berfungsi sebagai spending commitment, bukan cerminan dari
jumlah uang yang dimiliki. Income tambahan tidak otomatis
mengubah budget yang sudah di-set.

---

### Budget Period

Budget mengikuti calendar-based period — reset setiap tanggal 1
di awal bulan baru.

**First Month Pro-Rated:**

User yang mendaftar di tengah bulan akan mendapatkan budget
yang disesuaikan secara proporsional dengan sisa hari di bulan tersebut.

**Formula:**

First Month Budget = (Monthly Budget / Total Days in Month) × Remaining Days

**Contoh:**

User mendaftar 15 Januari dengan monthly budget Rp 1.000.000.

First Month Budget = (1.000.000 / 31) × 17 = Rp 548.387

Mulai 1 Februari, budget kembali ke full amount yang di-set user.

---

### Remaining Budget

Sisa budget yang masih tersedia di periode berjalan.

**Formula:**

Remaining Budget = Active Period Budget - Total Expense

Total Expense yang dihitung hanya mencakup pengeluaran yang
dicatat sejak user pertama kali mendaftar di Mindspend.

---

### Carry Over Balance

Current Balance tidak di-reset saat bulan berganti.

Sisa saldo dari bulan sebelumnya tetap carry over ke periode
berikutnya — karena uang yang tidak habis adalah uang yang
masih nyata dimiliki user.

Yang di-reset setiap bulan hanya **budget counter**, bukan balance.