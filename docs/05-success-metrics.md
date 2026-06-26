# Success Metrics

## Objective

Mengukur apakah Mindspend berhasil membantu user menjadi lebih sadar
dan disiplin dalam mengelola pengeluaran bulanannya.

---

## Analytics Infrastructure

Semua metrics di dokumen ini di-track menggunakan **PostHog**.

Setiap user action yang relevan akan di-capture sebagai event
dan di-monitor melalui PostHog dashboard.

---

## North Star Metric

### Budget Adherence Rate

Persentase user yang berhasil tetap berada di dalam budget
yang telah mereka tentukan di periode berjalan.

**Formula:**
Budget Adherence Rate = Users Within Budget / Total Active Users

**How to measure:**

PostHog event `budget_period_ended` dengan property
`is_within_budget: true / false` per user per period.

---

## Supporting Metrics

### Weekly Active Users (WAU)

Jumlah unique user yang membuka dan menggunakan aplikasi
minimal satu kali dalam satu minggu.

**Target MVP:** 35%+

**How to measure:**

PostHog built-in Active Users report,
filter by `app_opened` event per weekly cohort.

---

### Transaction Creation Rate

Rata-rata jumlah transaksi yang dicatat per active user per minggu.
Mengukur seberapa rutin user engage dengan core feature Mindspend.

**Formula:**
Transaction Creation Rate = Total Transactions / Total Active Users

**Target MVP:** Minimal 3 transaksi per user per minggu.

**How to measure:**

PostHog event `transaction_created` dengan property
`type: income / expense`.

---

### Budget Setup Rate

Persentase user yang berhasil menyelesaikan onboarding
dan set budget pertama mereka.

**Formula:**
Budget Setup Rate = Users With Budget / Registered Users

**Target MVP:** 80%+

**How to measure:**

PostHog funnel dari event `onboarding_started`
→ `budget_created`.

---

### Weekly Check-In Open Rate

Persentase user yang membuka Weekly Financial Check-In
setelah Friday reminder dikirim.

**Formula:**
Check-In Open Rate = Opened Check-In / Delivered Reminder

**Target MVP:** 30%+

**How to measure:**

PostHog event `checkin_opened` dibandingkan dengan
total `reminder_delivered` per minggu.

---

### User Retention

Mengukur apakah user masih aktif menggunakan Mindspend
setelah beberapa hari sejak pertama daftar.

| Checkpoint | Target MVP |
|---|---|
| Day 1 Retention | 40%+ |
| Day 7 Retention | 20%+ |
| Day 30 Retention | 10%+ |

**How to measure:**

PostHog built-in Retention report,
anchor event `user_registered`.

---

## Success Criteria MVP

MVP dianggap berhasil jika seluruh kriteria berikut terpenuhi
dalam periode observasi minimal 4 minggu:

- Budget Setup Rate mencapai 80%+
- Minimal 30% user membuka Weekly Check-In setelah reminder
- Transaction Creation Rate minimal 3x per user per minggu
- Day 7 Retention minimal 20%