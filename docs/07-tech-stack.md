# Tech Stack

Dokumen ini menjelaskan technology stack yang digunakan pada Mindspend MVP
beserta reasoning di balik setiap keputusan teknologi yang dipilih.

---

## Frontend

### Flutter

Framework utama untuk mobile development.

**Reasoning:** Dipilih untuk mempelajari Flutter secara hands-on sambil
membangun production-ready app. Single codebase untuk Android dan iOS,
dan APK build lebih straightforward dibanding setup sebelumnya di V1.

### Riverpod

State management solution untuk Flutter.

**Reasoning:** Sweet spot antara simplicity dan scalability untuk solo
developer. Boilerplate lebih sedikit dibanding Bloc, lebih scalable
dibanding Provider. Populer di Flutter community dan well-maintained.

### GoRouter

Navigation dan routing solution untuk Flutter.

**Reasoning:** Official recommended router dari Flutter team.
Declarative routing yang clean dan mudah di-maintain seiring
app berkembang.

### Dio

HTTP client untuk komunikasi dengan backend.

**Reasoning:** Lebih feature-rich dibanding http package bawaan Flutter.
Support interceptors untuk global error handling dan JWT token injection.

### Flutter Secure Storage

Local storage untuk menyimpan sensitive data di device.

**Reasoning:** Menyimpan JWT token secara aman menggunakan Keychain
di iOS dan Keystore di Android — lebih secure dibanding shared preferences.

---

## Backend

### Node.js + Express.js

Runtime dan framework untuk backend API.

**Reasoning:** Familiar dari V1. Lightweight dan cukup untuk kebutuhan
REST API di MVP stage tanpa over-engineering.

### JWT

Mekanisme authentication untuk semua API request.

**Reasoning:** Stateless, tidak butuh session storage di server,
dan mudah di-implement di mobile client.

### bcrypt

Password hashing sebelum disimpan ke database.

**Reasoning:** Industry standard untuk password hashing.
Tidak pernah store plain text password.

### Prisma

ORM untuk interaksi dengan database.

**Reasoning:** Type-safe query, schema migration yang clean,
dan developer experience yang jauh lebih baik dibanding raw SQL
untuk solo developer.

---

## Database

### PostgreSQL

Relational database engine.

**Reasoning:** Solid, battle-tested, dan fully supported oleh Prisma
dan Railway. Relational structure cocok untuk financial data
yang butuh consistency dan integrity.

---

## Analytics

### PostHog

Product analytics tool untuk tracking user behavior dan measuring
success metrics.

**Reasoning:** Free tier 1 juta events per bulan — lebih dari cukup
untuk MVP stage. Official Flutter SDK tersedia. Mendukung funnel analysis,
retention tracking, dan event-based analytics yang dibutuhkan untuk
mengukur semua metrics di `05-success-metrics.md`.

**Events yang akan di-track:**

- `user_registered`
- `onboarding_completed`
- `budget_created`
- `transaction_created`
- `checkin_opened`
- `reminder_delivered`
- `budget_period_ended`

---

## Infrastructure

### Railway

Platform deployment untuk backend dan database.

**Reasoning:** Simple setup, support PostgreSQL dan Node.js
dalam satu platform, free tier cukup untuk MVP stage.

### Git + GitHub

Version control dan repository management.

**Reasoning:** Industry standard. GitHub juga berfungsi sebagai
portfolio visibility untuk project ini.

---

## Design

### Figma

Design tool untuk UI/UX dan prototyping.

**Reasoning:** Industry standard untuk product design.
Memudahkan handoff dari design ke development.

---

## Development Principles

### Keep It Simple

Hindari over-engineering selama fase MVP.
Setiap keputusan teknologi harus bisa dijustifikasi dengan kebutuhan nyata,
bukan karena terdengar impressive.

### Build for Learning

Tujuan utama project ini adalah memahami end-to-end product development —
dari problem definition sampai shipped product.
Tech stack dipilih untuk memaksimalkan learning value, bukan hanya familiarity.

### Scale Later

Optimisasi dan scalability akan dievaluasi setelah MVP tervalidasi.
Premature optimization adalah musuh di fase ini.