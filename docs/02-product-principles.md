# Product Principles

## Simplicity First

Mencatat transaksi harus cepat dan tidak menyita waktu user.

**Guardrail:** User dapat menambahkan transaksi dalam kurang dari 10 detik.
Kalau flow-nya lebih dari itu, UI/UX-nya perlu di-revisit.

---

## Prevention Over Reporting

Mindspend berfokus membantu user mencegah overspending sebelum terjadi —
bukan menampilkan laporan setelah damage sudah terjadi.

**Guardrail:** Setiap feature baru harus bisa menjawab pertanyaan ini:
*"Apakah ini membantu user sebelum masalah terjadi, atau hanya setelahnya?"*

---

## Weekly Reflection

Setiap hari Jumat user menerima Weekly Financial Check-In.

Momen ini dirancang untuk mendorong financial reflection sebelum memasuki
weekend — periode dengan spending risk tertinggi bagi mayoritas mahasiswa.

**Guardrail:** Check-in tidak boleh memakan waktu lebih dari 2 menit.
Friction tinggi = user skip = fitur tidak berguna.

---

## Actionable Insights

Setiap insight yang ditampilkan harus memicu tindakan yang jelas.
Insight tanpa recommended action bukan insight — itu hanya informasi.

**Contoh yang benar:**

> Kamu sudah menggunakan 75% budget bulan ini. Kurangi spending akhir pekan
> agar tetap on track sebelum bulan berakhir.

**Guardrail:** Setiap insight harus punya satu clear next action.
Kalau tidak bisa dirumuskan, insight itu tidak layak ditampilkan.

---

## Budget Is a Commitment

Budget adalah batas pengeluaran yang ditentukan secara sadar oleh user —
bukan angka yang reaktif mengikuti saldo atau income yang masuk.

Income tambahan tidak otomatis meningkatkan monthly budget.
User harus secara eksplisit memilih untuk mengubah budget mereka sendiri.

---

## Real Money Tracking

Current balance tidak di-reset ketika bulan berganti.

Sisa uang dari bulan sebelumnya tetap carry over ke periode berikutnya —
karena uang yang tidak habis adalah uang yang masih nyata dimiliki user.