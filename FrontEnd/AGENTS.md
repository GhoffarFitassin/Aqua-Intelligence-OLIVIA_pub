# 🤖 Dokumentasi AI Agent: Water Quality & Growth Analytics (Core Agent)

Agent utama ini bertugas untuk memantau kualitas air secara *real-time* dari sensor IoT dan memprediksi kesehatan serta pertumbuhan ikan lele (berdasarkan parameter biometrik) guna mencegah gagal panen.

---

## 1. Variabel Dataset (Input Parameter)
Data yang dikumpulkan dari node IoT (seperti pada data `IoTPond12.csv`) mencakup metrik lingkungan air dan estimasi populasi/biometrik ikan:

| Parameter Sensor/Data | Batas Aman / Normal | Logika Bahaya / Signifikansi |
| :--- | :--- | :--- |
| **TEMPERATURE (Suhu)** | 26°C - 30°C | Suhu ekstrem atau fluktuatif dapat memicu *upwelling* dan stres metabolisme pada ikan. |
| **TURBIDITY (Kekeruhan)** | Tergantung sistem | Menunjukkan tingkat kepadatan partikel tersuspensi/plankton. Jika terlalu tinggi, insang ikan bisa tersumbat. |
| **DISSOLVED OXYGEN (DO)** | > 4.0 mg/L | Sangat krusial. DO yang mendekati 0 (seperti di beberapa baris data) akan menyebabkan ikan mati lemas (*hypoxia*). |
| **pH (Keasaman)** | 6.5 - 8.5 | pH yang terlalu tinggi (basa) mengubah amonium menjadi amonia beracun secara cepat. |
| **AMMONIA (NH3)** | < 0.1 mg/L | Limbah dari sisa pakan/kotoran. Merupakan pembunuh senyap yang membakar insang. |
| **NITRATE (NO3)** | < 50 mg/L | Produk akhir siklus nitrogen; jika terlalu tinggi menandakan penumpukan bahan organik (kualitas air memburuk). |
| **Population** | Sesuai volume kolam | Kepadatan tebar (*stocking density*). Kepadatan berlebih mempercepat penurunan kualitas air. |
| **Length & Weight** | Bertambah seiring usia | Digunakan agent untuk mengukur performa pertumbuhan (FCR) dan mendeteksi jika ikan kerdil akibat air buruk. |

## 2. Arsitektur Model Machine Learning
Agent ini menggunakan pendekatan kombinasi untuk menganalisis data deret waktu (*time-series*) dan metrik tabular.

- **Rekomendasi Algoritma:** **XGBoost ** (untuk klasifikasi bahaya air) dan **LSTM** (untuk tren pertumbuhan *Length & Weight*).
- **Infrastruktur:** Dijalankan pada *service* Python terpisah yang terintegrasi dengan backend **Laravel** via Inertia.js
- **Alasan Pemilihan:** 
  1. Mampu memproses jutaan baris data tabular (*log* sensor hitungan detik/menit) dengan sangat cepat.
  2. Tahan terhadap *noise* atau *missing value* dari sensor IoT.
  3. Memiliki fitur *Feature Importance* (misal: AI tahu bahwa DO drop dan Ammonia naik adalah penyebab utama masalah).
- **Output AI:** Mengklasifikasikan status kolam (Aman/Waspada/Bahaya) serta memberikan proyeksi berat dan panjang ikan di minggu berikutnya.

## 3. Alur Kerja Prediksi (System Workflow)
Langkah-langkah bagaimana Agent ini beroperasi di latar belakang:

1. **Pengumpulan:** Sensor IoT mencatat 11 kolom data (`created_at`, `TEMPERATURE`, `TURBIDITY`, `DO`, `pH`, `AMMONIA`, `NITRATE`, dll) ke *database* utama setiap beberapa detik/menit.
2. **Analisis AI:** Setiap interval tertentu (misal: 1 jam), *job scheduler* dari backend **Laravel** mengirimkan *batch* data terbaru ke *service* AI Python.
3. **Peringatan/Aksi:** Jika hasil deteksi model adalah "Bahaya" (misal: DO = 0, Amonia naik), sistem mengeksekusi peringatan ke aplikasi web **React**.
4. **Ekstraksi Akar Masalah (Root Cause):** AI merangkum variabel mana yang anomali dan menyusun instruksi To-Do list bagi peternak.

## 4. Matriks Keputusan AI (*Actionable Insights*)
Instruksi rekomendasi otomatis yang akan muncul di antarmuka web (React) pengguna berdasarkan pembacaan data IoT:

- **Skenario A (DO Mendekati 0 & Amonia/Nitrat Tinggi)**
  - *Status Web:* 🔴 BAHAYA KRITIS
  - *Tugas dari AI:* "Segera hidupkan aerator maksimal dan lakukan pergantian air (Sifon) dasar kolam 30%."
  - *Saran Tambahan:* "Puasakan ikan (jangan beri pakan) selama 24 jam untuk menekan produksi amonia."

- **Skenario B (Turbidity & Suhu Fluktuatif)**
  - *Status Web:* 🟡 WASPADA UPWELLING
  - *Tugas dari AI:* "Periksa penumpukan lumpur di dasar kolam. Pertimbangkan pemberian probiotik air."

- **Skenario C (Kualitas Air Stabil, Pertumbuhan Normal)**
  - *Status Web:* 🟢 AMAN & OPTIMAL
  - *Tugas dari AI:* "Kondisi air sangat baik. Lanjutkan jadwal pemberian pakan standar untuk mengejar target berat (Weight) panen."

---

**💡 Tips Pitching/Presentasi ke Juri:**
> *"Dengan menggabungkan 6 sensor lingkungan dan 3 parameter biometrik populasi secara real-time, Agent AI kami tidak hanya mencegah kerugian massal akibat kualitas air yang buruk, tetapi juga mengoptimalkan pakan demi mencapai target panen yang presisi."*
