# Panduan Desain Antarmuka (UI/UX) Aqua-Intelligence

Dokumen ini berisi panduan desain untuk pengembangan *frontend* aplikasi.

## 1. Teknologi Utama
- **Frontend Framework:** React
- **Backend (Referensi API):** Laravel

## 2. Palet Warna (Color Palette)
Aplikasi menggunakan sistem warna bertema alam bahari (*natural-aquatic*) yang disesuaikan secara dinamis untuk kenyamanan mata peternak di lapangan, menghindari kesan template AI neon generik yang terlalu mencolok.

### 🌌 Mode Gelap (Oceanic Deep)
*   **Latar Belakang Utama:** 🌌 **`#0B131A`** - *Deep Slate Marine*
    *   Warna hitam kebiruan pekat yang menyerupai kedalaman air tenang. Sangat elegan dan menghemat daya layar.
*   **Latar Belakang Card & Panel:** 🟦 **`rgba(20, 35, 47, 0.45)`** - *Translucent Dark Slate*
    *   Menggunakan efek *glassmorphism* tipis dengan pembatas (*border*) halus berukuran 1px (`rgba(20, 184, 166, 0.08)`).
*   **Latar Belakang Sidebar:** 🌌 **`#070D12`** - *Midnight Marine*
    *   Lebih gelap dari latar utama untuk memberikan dimensi kedalaman visual yang jelas.
*   **Aksen Utama (Primary):** 🟢 **`#14B8A6`** - *Organic Ocean Teal*
    *   Warna hijau toska alami air sehat. Digunakan untuk tombol utama, ikon aktif, dan status sukses/aman.
*   **Aksen Sekunder (Secondary):** 🔵 **`#38BDF8`** - *Clear Sky Blue*
    *   Warna biru air bersih. Digunakan untuk grafik tren utama dan aksen sekunder.

### ☀️ Mode Terang (Fresh Morning Mist)
*   **Latar Belakang Utama:** ☀️ **`#F4F7F6`** - *Fresh Mist*
    *   Warna putih-hijau mint lembut yang sangat terang namun sejuk di mata di bawah cahaya matahari langsung.
*   **Latar Belakang Card & Panel:** ⬜ **`rgba(255, 255, 255, 0.7)`** - *Frosted White Glass*
    *   Efek kaca putih dengan pembatas tipis (`rgba(20, 184, 166, 0.12)`).
*   **Latar Belakang Sidebar:** 🟢 **`#E2ECE9`** - *Soft Clay Teal*
    *   Warna tanah liat teal yang lembut dan natural sebagai jangkar navigasi kiri.
*   **Aksen Utama (Primary):** 🟢 **`#0F766E`** - *Deep Marine Teal*
    *   Warna teal tua berdaya kontras tinggi untuk memastikan semua tombol dan status aman terbaca dengan jelas.
*   **Aksen Sekunder (Secondary):** 🔵 **`#0284C7`** - *Rich Sky Blue*
    *   Warna biru laut cerah untuk visualisasi garis tren dan chart.

---

## 3. Tata Letak (Layout) & Divider
Berdasarkan referensi desain visual *business dashboard*:

### Struktur Halaman
- **Sidebar Navigasi (Kiri):** Membentang penuh secara vertikal (*full-height*). Menggunakan warna latar sidebar sesuai tema aktif, dengan ikon navigasi vertikal. Dilengkapi tombol toggle tema (Matahari/Bulan) di bagian bawah.
- **Header:** Tergabung (*seamless*) dengan latar belakang utama, menampilkan judul halaman dan indikator status kolam.
- **Sistem Grid / Card:** Konten dibagi menjadi blok-blok (*cards*) glassmorphic dengan efek translusen dan pembatas tipis yang elegan. Ujung *card* melengkung sedang (`border-radius: 12px`).

### Pembatas (Divider) & Ruang (Spacing)
- **Negative Space (Celah antar Card):** Menggunakan celah konsisten `20px` untuk memperlihatkan latar belakang yang sejuk.
- **Divider Internal:** Menggunakan garis pembatas tipis dengan tingkat ketebalan rendah (`opacity` 5-10% dari warna aksen) untuk memisahkan daftar aktivitas atau To-Do list.

---

## 4. Komponen Visual
- **Tipografi:** Menggunakan Google Fonts **Outfit** untuk judul (modern & premium) dan **Inter** untuk teks body (sangat bersih dan mudah dibaca). Teks utama berwarna putih (`#F8FAFC`) di mode gelap, dan gelap kebiruan (`#0F172A`) di mode terang.
- **Grafik (Charts):** Visualisasi data (tren suhu, DO, amonia, dll.) menggunakan warna aksen bahari yang kontras tinggi namun natural. Area di bawah grafik diberi gradien memudar untuk efek kedalaman.
- **Timeline / Jadwal:** Horizontal Gantt chart di bagian bawah menggunakan warna status adaptif (Bahaya, Waspada, Stabil) yang dihaluskan agar menyatu dengan latar belakang tema masing-masing.
- **Panel Samping Kanan (Right Panel):** Panel notifikasi dan To-Do list AI terintegrasi secara dinamis di sebelah kanan, dapat bergeser ke bawah pada perangkat dengan layar lebih kecil.
