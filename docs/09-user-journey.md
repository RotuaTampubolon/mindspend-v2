# User Journey

## Overview

Dokumen ini menggambarkan end-to-end journey Ayla — primary persona Mindspend —
mulai dari pertama kali mendengar tentang Mindspend hingga menjadi active user
yang sudah melewati minimal satu full budget period.

---

## Stage 1 — Discovery

**Touchpoint:** Rekomendasi dari teman

Ayla mendengar tentang Mindspend dari temannya yang juga mahasiswa.
Bukan dari iklan, bukan dari App Store — dari word of mouth.

**Context:**
Percakapan terjadi di situasi yang relatable — misalnya teman bercerita
bahwa dia akhirnya tahu kemana uangnya habis setelah pakai Mindspend.

**Ayla's Emotion:** Curious tapi skeptis.
Dia pernah coba manage keuangan sebelumnya tapi tidak pernah konsisten.

**Key Trigger:**
> *"Eh aku juga sering gitu, uang tiba-tiba habis ga tau kemana."*

**Ayla's Action:** Langsung cari aplikasinya di Play Store.

---

## Stage 2 — Download & First Impression

**Touchpoint:** Play Store listing

Ayla membuka Play Store, search "Mindspend", dan melihat
halaman aplikasi untuk pertama kali.

**What she evaluates in under 10 seconds:**
- Screenshot — apakah UI-nya clean dan tidak overwhelming?
- Rating dan jumlah download
- Deskripsi singkat — apakah langsung jelas ini untuk siapa?

**Ayla's Emotion:** Cautiously optimistic.

**Key Risk:**
Kalau first impression-nya overwhelming atau tidak jelas,
dia akan tutup dan tidak download.

**Ayla's Action:** Download aplikasi.

---

## Stage 3 — Onboarding

**Touchpoint:** In-app onboarding flow

Ini adalah momen paling kritis di seluruh journey.
Ayla harus merasakan value sebelum onboarding selesai —
bukan setelahnya.

**Flow:**

1. **Register** — nama, email, password
2. **Set Current Balance** — berapa uang yang Ayla punya sekarang
3. **Set Monthly Budget** — berapa yang boleh dia spend bulan ini
4. **Set Reminder Preference** — aktifkan Friday reminder atau tidak

**Ayla's Emotion:** Antusias di awal, tapi mulai drop kalau terlalu banyak step.

**Key Insight:**
Onboarding harus selesai dalam maksimal 4 step.
Setiap tambahan step = additional drop-off risk.

**Key Risk:**
Kalau Ayla tidak tahu harus set budget berapa,
dia akan stuck dan kemungkinan besar abandon onboarding.

**Design Implication:**
Berikan contoh atau suggestion budget yang realistic
untuk konteks mahasiswa — misalnya range Rp 500.000 – Rp 1.500.000.

**Ayla's Action:** Selesaikan onboarding, masuk ke dashboard pertama kali.

---

## Stage 4 — First Use

**Touchpoint:** Dashboard + Add Transaction

Ayla melihat dashboard untuk pertama kali.
Current balance dan budget sudah ter-set dari onboarding.

**First action yang diharapkan:**
Ayla langsung mencatat transaksi pertamanya — misalnya beli makan siang.

**Ayla's Emotion:** Ini adalah momen "aha" pertama.
Dia melihat balance berkurang dan remaining budget ter-update secara real-time.

**Key Moment:**
> *"Oh jadi segini ya yang aku habiskan hari ini."*

Ini adalah pertama kalinya Ayla punya visibility terhadap
pengeluarannya secara real-time — sesuatu yang tidak pernah dia miliki sebelumnya.

**Key Risk:**
Kalau add transaction flow-nya lebih dari 10 detik,
Ayla akan malas mencatat dan mulai skip.

**Ayla's Action:** Mulai rutin mencatat transaksi harian.

---

## Stage 5 — Daily Habit Formation

**Touchpoint:** App — daily transaction logging

Ayla mulai membangun kebiasaan mencatat transaksi.
Ini adalah stage paling fragile — habit belum terbentuk,
motivasi bisa drop kapan saja.

**Positive scenario:**
Ayla mencatat setiap pengeluaran, melihat remaining budget
berkurang secara gradual, dan mulai lebih mindful sebelum spend.

**Negative scenario:**
Ayla lupa catat satu hari → merasa data sudah tidak akurat →
berhenti pakai sama sekali.

**Key Risk:** One missed day bisa jadi breaking point.

**Design Implication:**
Pertimbangkan gentle reminder mid-week — bukan hanya Friday —
untuk membantu Ayla tetap on track mencatat transaksi.

*Catatan: Mid-week reminder ini adalah kandidat post-MVP feature.*

---

## Stage 6 — Weekly Financial Check-In

**Touchpoint:** Friday push notification + in-app Check-In screen

Hari Jumat, Ayla menerima push notification dari Mindspend.

**Notification copy:**
> *"Cek kondisi keuangan kamu minggu ini sebelum weekend. 📊"*

Ayla membuka notifikasi dan masuk ke Weekly Check-In screen.

**Yang Ayla lihat:**
- Budget usage minggu ini
- Financial Status terkini — Healthy / Warning / Danger / Critical
- Spending summary per kategori
- Static recommendation berbasis threshold

**Ayla's Emotion:** Ini adalah momen refleksi.
Untuk pertama kalinya dia punya konteks yang jelas
tentang kondisi keuangannya sebelum weekend.

**Two possible outcomes:**

*Jika status Healthy:*
> *"Oke, aku masih on track. Bisa sedikit lebih santai weekend ini."*

*Jika status Warning / Danger:*
> *"Oh ternyata udah segini. Kayaknya harus kurangin jajan weekend."*

**Key Value:**
Check-in ini terjadi sebelum Ayla masuk ke weekend —
periode dengan spending risk tertinggi.
Bukan setelah damage terjadi.

**Ayla's Action:**
Ayla bisa buka Check-In kapan saja secara manual,
tidak harus menunggu Friday reminder.

---

## Stage 7 — Mid-Month Adjustment

**Touchpoint:** Dashboard — Budget Update

Memasuki pertengahan bulan, Ayla sadar pengeluaran
untuk keperluan kuliah lebih besar dari biasanya —
ada project akhir yang butuh print dan beli alat.

**Ayla's Action:**
Dia membuka Mindspend dan update monthly budget
sesuai kondisi yang berubah.

**Key Insight:**
Ini adalah momen di mana Ayla membuat intentional decision —
bukan reaktif karena uang habis, tapi proaktif karena
dia sudah punya awareness terhadap kondisi keuangannya.

**Ayla's Emotion:** Merasa lebih in control dibanding bulan-bulan sebelumnya.

---

## Stage 8 — End of Month

**Touchpoint:** Dashboard — Period Summary

Akhir bulan tiba. Budget period hampir berakhir.

**Ayla melihat:**
- Berapa total yang sudah dia spend bulan ini
- Apakah dia berhasil stay within budget
- Current balance yang akan carry over ke bulan depan

**Two possible outcomes:**

*Jika berhasil within budget:*
Ayla merasakan sense of accomplishment untuk pertama kalinya
dalam hal keuangan. Ini adalah motivasi untuk konsisten di bulan berikutnya.

*Jika melebihi budget:*
Ayla tetap punya data yang jelas — kategori mana yang paling banyak
menguras budget. Bukan lagi "uang habis ga tau kemana" —
tapi "aku tahu aku overspend di food dan jajan bulan ini."

**Key Value:**
Bahkan jika Ayla gagal stay within budget di bulan pertama,
dia sudah memiliki awareness yang tidak pernah dia miliki sebelumnya.
Itu sendiri adalah progress.

---

## Stage 9 — Month 2 dan Seterusnya

**Touchpoint:** New budget period — onboarding bulan kedua

Tanggal 1 bulan baru. Budget counter reset.
Current balance carry over dari bulan sebelumnya.

Ayla memulai periode baru dengan:
- Data spending dari bulan lalu sebagai referensi
- Habit mencatat transaksi yang sudah mulai terbentuk
- Awareness yang lebih baik tentang spending pattern-nya sendiri

**Retention Driver:**
Ayla sudah invest waktu dan data ke Mindspend.
Switching cost mulai terbentuk secara natural.

---

## Emotion Arc Summary

| Stage | Emotion |
|---|---|
| Discovery | Curious, skeptis |
| Download | Cautiously optimistic |
| Onboarding | Antusias → fragile kalau terlalu panjang |
| First Use | "Aha moment" pertama |
| Daily Habit | Fragile — habit belum solid |
| Weekly Check-In | Reflective, mulai merasa in control |
| Mid-Month Adjustment | Proaktif, intentional |
| End of Month | Accomplished atau aware — keduanya valuable |
| Month 2+ | Committed, habit terbentuk |

---

## Key Risks Summary

| Stage | Risk | Mitigation |
|---|---|---|
| Download | First impression tidak clear | Play Store listing harus sharp dan focused |
| Onboarding | Terlalu banyak step | Maksimal 4 step, ada budget suggestion |
| First Use | Add transaction terlalu lama | Flow harus selesai < 10 detik |
| Daily Habit | Satu hari skip = abandon | Pertimbangkan mid-week reminder post-MVP |
| Weekly Check-In | Notification di-ignore | Copy harus relatable dan timely |