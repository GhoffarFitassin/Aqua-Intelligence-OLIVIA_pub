# 🧠 Bedah Fitur ML: Pencegahan Gagal Panen (Upwelling Warning)

Fitur ini adalah nyawa dari **Decision Support System (DSS)** pada Aqua-Intelligence. Tujuannya adalah mendeteksi pola anomali kualitas air *sebelum* ikan mengalami stres mematikan, sehingga peternak memiliki *golden time* (waktu emas) untuk menyelamatkan kolam.

---

## 1. Variabel Dataset (Input Parameter)
Model Machine Learning (ML) akan mengolah data angka dari minimal 5 parameter kualitas air yang dikumpulkan oleh sensor. 

*(Sebagai informasi: Ikan lele memang kuat, namun kombinasi Amonia tinggi dan Oksigen rendah sangat mematikan bagi mereka).*

| Parameter Sensor | Batas Aman (Lele) | Logika Bahaya (Jika Melewati Batas) |
| :--- | :--- | :--- |
| **Amonia (NH3)** | < 0.1 mg/L | Merupakan racun utama dari kotoran/sisa pakan. Akan membakar insang ikan. |
| **DO (Dissolved Oxygen)** | > 4.0 mg/L | Oksigen terlarut. Jika rendah, ikan akan megap-megap di permukaan air. |
| **pH (Keasaman)** | 6.5 - 8.5 | Perubahan drastis (terutama menjadi basa) membuat Amonia menjadi jauh lebih beracun. |
| **Suhu** | 26°C - 30°C | Suhu yang tiba-tiba turun memicu *upwelling* (kotoran di dasar kolam naik ke permukaan). |
| **Nitrat (NO3)** | < 50 mg/L | Indikator tingginya sisa organik di dalam kolam. |

## 2. Arsitektur Model Machine Learning
Karena tujuannya adalah mengeluarkan status bahaya, kita menggunakan algoritma **Klasifikasi (Classification)**.

- **Rekomendasi Algoritma:** **XGBoost** atau **Random Forest** (dijalankan pada *service* Python terpisah yang terintegrasi dengan backend **Laravel** via API).
- **Alasan Pemilihan:** 
  1. Sangat akurat untuk membaca pola data berupa angka (tabular).
  2. Tahan terhadap *outlier* (angka sensor yang kadang *error* sesaat tidak akan langsung merusak prediksi).
  3. Memiliki fitur **Feature Importance** (kemampuan AI untuk mengetahui parameter mana yang memicu bahaya).
- **Output AI:** Mengklasifikasikan status kolam menjadi **Aman**, **Waspada**, atau **Bahaya**.

## 3. Alur Kerja Prediksi (System Workflow)
1. **Pengumpulan:** Sensor IoT mengirim data kelima parameter di atas setiap 15 menit ke *database* utama.
2. **Analisis AI:** Setiap 1 jam, backend **Laravel** (melalui *job scheduler* yang memanggil *service* Python) mengambil tren data tersebut dan memasukannya ke model XGBoost.
3. **Peringatan Dini:** Jika prediksi model adalah "Bahaya", sistem langsung mengirim *alert* ke aplikasi web **React** milik peternak.
4. **Ekstraksi Akar Masalah (Root Cause):** AI mendeteksi parameter mana yang paling "rusak" (misal: Amonia terdeteksi melonjak 30%), lalu AI merangkai rekomendasi tindakan.

## 4. Matriks Keputusan AI (*Actionable Insights*)
Ini adalah bagian terpenting. Berdasarkan pola yang terdeteksi, AI secara otomatis membuatkan **To-Do List** untuk peternak di halaman Dashboard Web:

- **Skenario A (Amonia Tinggi + DO Rendah)**
  - *Status Web:* 🔴 BAHAYA
  - *Tugas dari AI:* "Segera lakukan pergantian air bawah (Sifon) minimal 30% dan nyalakan aerator secara maksimal."
  - *Saran Tambahan:* "Puasakan ikan (jangan beri pakan) hari ini agar tidak menambah kotoran."

- **Skenario B (pH Turun/Air Terlalu Asam + Suhu Dingin)**
  - *Status Web:* 🟡 WASPADA
  - *Tugas dari AI:* "Segera taburkan kapur Dolomit untuk menetralkan pH air agar ikan tidak stres."

- **Skenario C (Semua Parameter Stabil)**
  - *Status Web:* 🟢 AMAN
  - *Tugas dari AI:* "Kualitas air prima. Silakan berikan pakan sesuai jadwal harian."

---

**💡 Tips Pitching/Presentasi ke Juri:**
Saat menjelaskan fitur ini, gunakan kalimat sakti ini:
> *"Sistem kami mengubah kebiasaan peternak dari yang selama ini bersifat **Reaktif** (baru panik mengganti air ketika sudah ada ikan yang mati mengambang), menjadi **Preventif** (sistem sudah menyuruh peternak mengganti air 12 jam sebelum ikan mulai keracunan)."* 
Hal ini sangat menguatkan argumen pencapaian SDG 8 (mencegah kerugian).
