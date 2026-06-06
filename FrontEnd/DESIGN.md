# Panduan Desain Antarmuka (UI/UX) Lele Dumbo

Dokumen ini berisi panduan desain sistem visual untuk pengembangan *frontend* aplikasi **Lele Dumbo** (sistem deteksi pencegahan gagal panen lele terintegrasi IoT & AI). Panduan ini mengadopsi prinsip desain yang bersih, minimalis, dan fungsional dari Vercel Developer Platform dengan modifikasi bertema budidaya lele modern (*stark modern-aquatic*).

## 1. Palet Warna (Color Palette)

Aplikasi menggunakan skema warna stark monokromatik kontras tinggi dengan aksen mesh gradient untuk memberikan kesan modern, premium, dan profesional bagi peternak lele.

### 🌌 Mode Gelap (Oceanic Stark Dark)
*   **Latar Belakang Halaman (Canvas Soft):** `#0a0a0a` - Hitam pekat modern.
*   **Latar Belakang Card & Modal (Canvas):** `#111111` - Hitam sedikit abu-abu untuk membedakan kartu.
*   **Latar Belakang Panel & Form Input (Canvas Soft 2):** `#1a1a1a` - Konten sekunder.
*   **Warna Teks Utama (Ink):** `#ffffff` - Putih bersih untuk keterbacaan tinggi.
*   **Warna Teks Sekunder (Body):** `#a0a0a0` - Abu-abu sedang.
*   **Warna Teks Redup (Mute):** `#666666` - Abu-abu gelap untuk catatan kaki.
*   **Dividers / Border Kartu (Hairline):** `#222222` - Garis halus 1px.
*   **Dividers Kuat / Hover (Hairline Strong):** `#444444` - Garis hover atau pembatas tebal.
*   **Tombol CTA Utama (Primary CTA):** Latar belakang `#ffffff`, teks `#000000`.

### ☀️ Mode Terang (Fresh Morning Mist)
*   **Latar Belakang Halaman (Canvas Soft):** `#fafafa` (98% White) - Putih sangat lembut, tidak menyilaukan mata peternak di lapangan.
*   **Latar Belakang Card & Modal (Canvas):** `#ffffff` (Pure White) - Kartu elevated.
*   **Latar Belakang Panel & Form Input (Canvas Soft 2):** `#f5f5f5` (95% Gray) - Area inset.
*   **Warna Teks Utama (Ink):** `#171717` (Near-Black Ink) - Teks utama halaman.
*   **Warna Teks Sekunder (Body):** `#4d4d4d` - Abu-abu gelap.
*   **Warna Teks Redup (Mute):** `#888888` - Abu-abu muted.
*   **Dividers / Border Kartu (Hairline):** `#ebebeb` - Garis pemisah 1px yang sangat tipis.
*   **Dividers Kuat / Hover (Hairline Strong):** `#a1a1a1` - Garis pembatas tebal.
*   **Tombol CTA Utama (Primary CTA):** Latar belakang `#171717`, teks `#ffffff`.

### 🔴 Status & Semantik
*   **Success / Link Blue:** `#0070f3` (Legacy success indicator & primary link blue).
*   **Error / Danger:** `#ee0000` (Red pemicu sifon dasar kolam / pH kritis).
    *   *Error Soft:* `#f7d4d6` (Latar belakang peringatan kritis).
    *   *Error Deep:* `#c50000` (Warna hover/aktif).
*   **Warning:** `#f5a623` (Orange waspada suhu upwelling).
    *   *Warning Soft:* `#ffefcf`, *Warning Deep:* `#ab570a`.

### 🌈 Mesh Gradient (Atmospheric Backdrop)
Satu-satunya dekorasi warna di halaman dashboard adalah mesh gradient multi-stop yang diletakkan di latar belakang area hero/header, melambangkan dinamisasi ekosistem air kolam lele:
- **Develop (Blue/Teal):** `#007cf0` → `#00dfd8` (Rhythm awal/monitoring)
- **Preview (Violet/Pink):** `#7928ca` → `#ff0080` (Rhythm analisis biometrik)
- **Ship (Coral/Amber):** `#ff4d4d` → `#f9cb28` (Rhythm panen optimal)

---

## 2. Tipografi

Sistem tipografi menggunakan dua font utama:
1.  **Geometric Sans (Inter):** Digunakan untuk display, body copy, tombol, dan link. Menggunakan huruf sentence-case dengan pengaturan penjarakan huruf (*letter-spacing*) negatif yang agresif pada ukuran besar untuk menegaskan karakter platform yang presisi.
2.  **Monospace (JetBrains Mono):** Digunakan hanya untuk terminal, status sensor mentah, nilai numerik sensor, kode, label technical, dan *eyebrows* kategori (selalu uppercase dalam format mono).

### Hirarki Tipografi
*   **Display XL (48px / Weight 600 / -2.4px):** Hero header ("Selamat datang di Lele Dumbo.").
*   **Display LG (32px / Weight 600 / -1.28px):** Judul bagian utama ("Sistem Monitor IoT Terpadu.").
*   **Display MD (24px / Weight 600 / -0.96px):** Judul tab/card utama.
*   **Display SM (20px / Weight 600 / -0.6px):** Sub-card / metrics value.
*   **Body MD (16px / Weight 400 / 0px):** Paragraf default.
*   **Body SM (14px / Weight 400 / -0.28px):** Label teks sekunder, input form, label tombol.
*   **Caption Mono (12px / Weight 400 / 0px):** Label status, kategori/eyebrow (uppercase, font mono).
*   **Code (13px / Weight 400 / 0px):** Nilai sensor mentah, log log IoT.

---

## 3. Tata Letak (Layout) & Spacing

*   **Grid:** Layout grid 12-kolom terpusat dengan lebar kontainer maksimum 1400px. Gutters horizontal sebesar 24px di desktop dan 16px di mobile.
*   **Spacing Base:** Skala berbasis kelipatan 4px (`xs` 8px, `sm` 12px, `md` 16px, `lg` 24px, `xl` 32px, `2xl` 40px, `3xl` 48px, `4xl` 64px, `5xl` 96px).
*   **Section Padding:** 64px s.d 96px untuk memisahkan setiap tab/section agar tidak terasa sesak.

---

## 4. Bentuk & Sudut (Shapes & Radii)

*   **Rounded None (0px):** Digunakan untuk divider halaman dan footer.
*   **Rounded SM (6px):** Base UI radius untuk tombol kontrol di dalam dashboard, kolom input form, menu dropdown, selektor kolam.
*   **Rounded MD (8px):** Radius untuk kartu informasi sensor dan monitoring.
*   **Rounded LG (12px):** Radius kartu utama (seperti FCR, chart, dan visualisasi analytics).
*   **Rounded Pill (100px):** Digunakan khusus untuk tombol CTA pemasaran atau tombol aksi utama di layar.

---

## 5. Elevasi & Bayangan (Shadows)

*   **Level 0 (Flat):** Bagian halaman yang gelap penuh tanpa pembatas.
*   **Level 1 (Inset Hairline):** 1px border tipis `rgba(0, 0, 0, 0.08)` (atau `rgba(255, 255, 255, 0.15)` di mode gelap). Tanpa drop shadow.
*   **Level 2 (Subtle Card):** Hairline border + stacked shadow halus: `0px 1px 1px #00000005` + `0px 2px 2px #0000000a`. Digunakan untuk kartu detail sensor kolam.
*   **Level 3 (Interactive Card):** Hairline border + shadow bertumpuk: `0px 2px 2px #0000000a`, `0px 8px 8px -8px #0000000a`. Digunakan pada status hover kartu.
