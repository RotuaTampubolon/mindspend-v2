# User Flow

## Overview

Dokumen ini menggambarkan detailed user flow Mindspend MVP —
setiap screen, decision point, dan action yang dapat dilakukan user.

**Notation yang digunakan:**
- `[ ]` → Screen
- `( )` → Action / Decision Point
- `→` → Flow direction
- `✓` → Success state
- `✗` → Error / Failed state

---

## 1. Authentication Flow

### 1.1 Register

Alur pertama kali user membuat akun baru di Mindspend.
[ Splash Screen ]

→ ( Sudah punya akun? )

→ Ya  → [ Login Screen ]

→ Tidak → [ Register Screen ]
[ Register Screen ]

→ Input: Nama, Email, Password

→ ( Tap "Daftar" )

→ ✗ Validasi gagal → Show inline error → Stay di Register Screen

→ ✓ Register berhasil → [ Onboarding Step 1 ]

---

### 1.2 Login

Alur untuk user yang sudah punya akun dan ingin masuk kembali.
[ Login Screen ]

→ Input: Email, Password

→ ( Tap "Masuk" )

→ ✗ Kredensial salah → Show inline error → Stay di Login Screen

→ ✓ Login berhasil → [ Dashboard ]

---

### 1.3 Logout
[ Settings Screen ]

→ ( Tap "Logout" )

→ ( Confirmation dialog )

→ Batal     → Stay di Settings Screen

→ Konfirmasi → Clear local token → [ Login Screen ]

---

## 2. Onboarding Flow

Onboarding hanya terjadi sekali — saat pertama kali user mendaftar.
Maksimal 3 step. Tidak bisa di-skip.

### Step 1 — Set Current Balance
[ Onboarding 1/3 ]

→ Copy: "Berapa uang yang kamu punya sekarang?"

→ Input: Current Balance

→ Helper: "Ini adalah saldo awal kamu di Mindspend."

→ ( Tap "Lanjut" )

→ ✗ Input kosong / tidak valid → Show inline error

→ ✓ → [ Onboarding 2/3 ]

---

### Step 2 — Set Monthly Budget

Jika user mendaftar di tengah bulan, sistem otomatis kalkulasi
pro-rated budget dan menampilkan hasilnya secara transparan.
[ Onboarding 2/3 ]

→ Copy: "Berapa maksimal pengeluaran kamu bulan ini?"

→ Input: Monthly Budget

→ Helper: "Contoh: Rp 500.000 – Rp 1.500.000 untuk mahasiswa."

→ Info: "Budget bulan ini: Rp [hasil pro-rated]"

→ ( Tap "Lanjut" )

→ ✗ Input kosong / tidak valid → Show inline error

→ ✓ → [ Onboarding 3/3 ]

---

### Step 3 — Set Reminder Preference

Notification permission tidak diminta di sini.
Permission akan diminta setelah user mencatat transaksi pertama.
[ Onboarding 3/3 ]

→ Copy: "Mau diingatkan setiap Jumat untuk cek keuangan kamu?"

→ Toggle: Aktifkan Friday Reminder

→ ( Tap "Mulai" )

→ ✓ → [ Dashboard ] ← First time experience

---

## 3. Dashboard Flow

Halaman utama yang menjadi pusat navigasi user di Mindspend.
[ Dashboard ]

Menampilkan:

Current Balance
Active Period Budget
Used Budget
Remaining Budget
Financial Status (Healthy / Warning / Danger / Critical)

→ ( Tap "Tambah Transaksi" ) → [ Add Transaction Flow ]

→ ( Tap "Weekly Check-In" )  → [ Weekly Check-In Flow ]

→ ( Tap "Riwayat" )          → [ Transaction History Screen ]

→ ( Tap "Pengaturan" )       → [ Settings Screen ]

---

## 4. Transaction Flow

### 4.1 Add Income
[ Add Transaction Screen — Income ]

→ Input: Nominal

→ Input: Kategori

→ Kiriman Bulanan

→ Freelance

→ Bonus

→ Cashback

→ Others

→ Input: Catatan (opsional)

→ Input: Tanggal (default: hari ini)

→ ( Tap "Simpan" )

→ ✗ Validasi gagal → Show inline error

→ ✓ Transaksi tersimpan

→ Update Current Balance

→ [ Notification Permission Request ] ← jika transaksi pertama

→ [ Dashboard ]

---

### 4.2 Add Expense
[ Add Transaction Screen — Expense ]

→ Input: Nominal

→ Input: Kategori

→ Food

→ Transport

→ Shopping

→ Entertainment

→ Keperluan Kuliah

→ Others

→ Input: Catatan (opsional)

→ Input: Tanggal (default: hari ini)

→ ( Tap "Simpan" )

→ ✗ Validasi gagal → Show inline error

→ ✓ Transaksi tersimpan

→ Update Current Balance

→ Update Remaining Budget

→ [ Notification Permission Request ] ← jika transaksi pertama

→ [ Dashboard ]

---

### 4.3 Delete Transaction
[ Transaction History Screen ]

→ ( Tap transaksi )

→ [ Transaction Detail Screen ]

→ ( Tap "Hapus" )

→ ( Confirmation dialog )

→ Batal      → Stay di Transaction Detail

→ Konfirmasi → Hapus transaksi

→ Recalculate Current Balance & Remaining Budget

→ [ Transaction History Screen ]

---

## 5. Transaction History Flow
[ Transaction History Screen ]

Menampilkan:

List transaksi diurutkan terbaru
Filter: Semua / Pemasukan / Pengeluaran
Filter: Periode (bulan ini / bulan lalu)

→ ( Tap transaksi ) → [ Transaction Detail Screen ]

→ ( Tap filter )    → Apply filter → Refresh list

---

## 6. Budget Management Flow

User dapat mengupdate budget kapan saja selama periode berjalan —
misalnya saat mendekati akhir semester dengan pengeluaran yang meningkat.
[ Settings Screen ]

→ ( Tap "Update Budget" )

→ [ Update Budget Screen ]

→ Tampilkan: Current monthly budget

→ Input: New monthly budget

→ Helper: "Budget baru berlaku mulai sekarang."

→ ( Tap "Simpan" )

→ ✗ Input tidak valid → Show inline error

→ ✓ Budget ter-update

→ Recalculate Remaining Budget

→ [ Dashboard ]

---

## 7. Weekly Check-In Flow

Check-In dapat diakses melalui dua entry point:
- Friday push notification
- Shortcut di Dashboard — kapan saja
[ Weekly Check-In Screen ]

Menampilkan:

Period    : Minggu ke-[N] bulan ini
Usage     : [X]% dari budget terpakai
Status    : Healthy / Warning / Danger / Critical
Summary   : Spending per kategori
Recommendation berbasis threshold:
  > Healthy  < 50%  → "Kamu on track. Pertahankan spending
    pattern ini sampai akhir bulan."

  > Warning  50-75% → "Hati-hati. Lebih dari setengah budget
    sudah terpakai. Prioritaskan pengeluaran yang penting."

  > Danger   75-90% → "Budget hampir habis. Kurangi
    discretionary spending sekarang."

  > Critical > 90%  → "Tahan semua pengeluaran non-essential
    sampai bulan berakhir."

→ ( Tap "Tutup" )                   → [ Dashboard ]

→ ( Tap "Lihat Riwayat Transaksi" ) → [ Transaction History ]

---

## 8. Notification Flow

### 8.1 Permission Request

Triggered setelah user berhasil mencatat transaksi pertama.
[ Permission Request Screen ]

→ Copy: "Aktifkan reminder agar kamu tidak lupa

cek keuangan setiap Jumat."

→ ( Tap "Izinkan" )

→ System notification permission dialog

→ Allow → Permission granted → [ Dashboard ]

→ Deny  → Permission denied  → [ Dashboard ]

(dapat diaktifkan kembali dari Settings)

→ ( Tap "Nanti Saja" ) → Dismiss → [ Dashboard ]

---

### 8.2 Friday Reminder
[ Push Notification — setiap Jumat ]

→ Title : "Weekly Check-In"

→ Body  : "Cek kondisi keuangan kamu sebelum weekend."

→ ( Tap notifikasi )   → [ Weekly Check-In Screen ]

→ ( Swipe dismiss )    → Notification hilang

Check-In tetap bisa diakses via Dashboard

---

## 9. Settings Flow
[ Settings Screen ]

Menampilkan:

Nama user
Email
Update Budget
Reminder Preference (toggle on/off)
Logout

→ ( Tap "Update Budget" )  → [ Budget Management Flow ]

→ ( Toggle Reminder )      → Update preference → Show confirmation

→ ( Tap "Logout" )         → [ Logout Flow ]

---

## Flow Summary

| Flow | Entry Point | Exit Point |
|---|---|---|
| Register | Splash Screen | Dashboard via Onboarding |
| Login | Splash Screen | Dashboard |
| Onboarding | Post-Register | Dashboard |
| Add Transaction | Dashboard | Dashboard |
| Delete Transaction | Transaction History | Transaction History |
| Weekly Check-In | Dashboard / Notification | Dashboard |
| Update Budget | Settings | Dashboard |
| Logout | Settings | Login Screen |
