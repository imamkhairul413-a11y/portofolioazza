# 🌌 Cosmic Personal Portfolio

Website portofolio personal bertema luar angkasa (*Outer Space Dark Theme*) dengan latar belakang hitam pekat, efek cahaya neon biru (*blue glow*), animasi bintang & meteor bergerak, navbar melayang (*floating navbar*), efek teks mengetik sendiri (*typewriter*), serta bagian *About Me* lengkap dengan foto profil, riwayat pendidikan, dan pengalaman kerja.

---

## ✨ Fitur Utama

1. **Tema Luar Angkasa Gelap & Efek Glow Biru:**
   - Background hitam kosmik (`#030712`) dengan kabut nebula bercahaya.
   - Canvas bintang 3D interaktif yang berkerlip dan bergerak mengikuti kursor mouse (efek paralaks).
   - Animasi meteor / bintang jatuh (*shooting stars*) yang melintas secara dinamis.

2. **Navbar Melayang di Tengah Atas (*Floating Navbar*):**
   - Melayang di posisi tengah atas dengan efek kaca *glassmorphism* (`backdrop-blur`).
   - Efek pendaran neon biru (*blue neon glow* & *shadow*).
   - *Scrollspy* otomatis yang menandai menu aktif sesuai posisi scroll.
   - Menu responsif untuk perangkat mobile dengan animasi transisi yang mulus.

3. **Hero Section (Halaman Utama):**
   - Badge status: `STATUS: SIAP MENJELAJAH PELUANG BARU`.
   - Nama besar dengan gradasi warna kosmik: **ALEXANDER PRATAMA**.
   - Efek teks mengetik sendiri bergantian (*Typewriter Effect*):
     - `Junior Web Developer`
     - `Frontend Specialist`
     - `React & Tailwind Enthusiast`
     - `Full-Stack Explorer`
     - `Creative UI/UX Builder`
   - Tombol aksi utama (*Jelajahi Karya*, *Tentang Saya*, *Hubungi Saya*).
   - Ilustrasi planet kosmik dengan orbit melingkar dan satelit yang mengitari.

4. **Section "Tentang Saya" (About Me):**
   - Bingkai foto profil futuristik dengan orbit neon menyala dan indikator status *Online*.
   - Bio ringkas, visi, dan filosofi pengembangan kode.
   - 3 pilar nilai utama (*Clean & Scalable*, *Responsif Penuh*, *High Performance*).
   - Tombol unduh CV (*Curriculum Vitae*).

5. **Section Riwayat Pendidikan & Pengalaman Kerja:**
   - Tab switcher interaktif antara **Riwayat Pendidikan** dan **Pengalaman Kerja**.
   - Garis waktu vertikal (*Glowing Timeline*) dengan node penanda bercahaya.
   - Rincian institusi, tahun, pencapaian, dan teknologi yang digunakan.

6. **Section Keahlian & Tech Stack:**
   - Kartu matriks keahlian: Frontend Architecture, Backend & Data, Alat & Workflow.
   - Progress bar persentase keahlian.
   - Badge teknologi (*React, Tailwind, JavaScript, Node.js, MySQL, Git, Figma, Vercel*).

7. **Showcase Proyek Pilihan:**
   - Kartu proyek dengan gambar interaktif, deskripsi, teknologi, tautan kode sumber (*GitHub*), dan demo langsung.

8. **Formulir Transmisi Pesan (Kontak):**
   - Desain formulir futuristik dengan validasi dan animasi pengiriman transmisi.

9. **Fitur Ekstra:**
   - Tombol audio efek suara kosmik (*Web Audio API Synthesizer*) tanpa memerlukan file audio eksternal.

---

## 📁 Struktur Berkas

```
c:\portofolio\
├── index.html       # Struktur halaman web lengkap & semantik
├── style.css        # Kustomisasi gaya, neon glow, scrollbar, dan animasi
├── script.js        # Logika kanvas bintang, typewriter, scrollspy, tab switcher, audio
└── README.md        # Dokumentasi dan panduan penggunaan
```

---

## 🚀 Cara Menjalankan

Website ini dibuat menggunakan HTML5, Tailwind CSS, Lucide Icons, dan Vanilla JavaScript murni tanpa perlu build tool yang rumit.

### Opsi 1: Buka Langsung di Browser
Cukup klik dua kali berkas `index.html` pada File Explorer di Windows, atau klik kanan lalu pilih **Open with > Google Chrome / Microsoft Edge**.

### Opsi 2: Menggunakan Live Server / Local Server
Jika menggunakan VS Code / Antigravity:
1. Klik kanan pada `index.html`
2. Pilih **Open with Live Server**

---

## 🛠️ Cara Kustomisasi Data Pribadi

- **Mengubah Nama:** Buka `index.html` dan cari tag `<h1>` pada bagian Hero (`#beranda`).
- **Mengubah Teks Typewriter:** Buka `script.js` lalu ubah array `roles` di fungsi `initTypewriter()`.
- **Mengubah Foto Profil:** Ganti URL gambar pada tag `<img>` di dalam `#tentang` dengan foto Anda sendiri atau letakkan file foto di folder proyek (misal: `assets/profile.jpg`).
- **Mengubah Riwayat Pendidikan & Pengalaman:** Sesuaikan konten pada elemen `#educationTimeline` dan `#experienceTimeline` di `index.html`.
