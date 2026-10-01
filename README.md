# BirthdayTemp — Digital Gift (Next.js · maroon + buku flip)

Proyek ini sudah dikonversi dari **satu file `index.html`** menjadi **Next.js (App Router)**.
Semua tampilan, animasi, dan perilaku dipertahankan sama persis — hanya strukturnya
yang dipecah supaya rapi dan mudah di-maintain.

## Menjalankan
```bash
npm install
npm run dev      # buka http://localhost:3000
```
Produksi:
```bash
npm run build
npm start
```

## Struktur proyek
```
app/
  layout.js        # <html>, font Google (Playfair, Cormorant, Quicksand), metadata/viewport
  page.js          # halaman utama -> render <BirthdayGift/>
  globals.css      # SEMUA CSS (dipindah apa adanya dari index.html asli)
components/
  BirthdayGift.js  # seluruh logika interaktif (client component)
public/
  panasea.mp3      # file lagu (taruh di sini)
  foto1.jpg..foto4.jpg  # taruh foto kamu di sini
next.config.mjs
jsconfig.json      # alias "@/..." -> root proyek
package.json
```

> **Catatan:** `panasea.mp3` di repo asli ukurannya **0 byte** (cuma penanda).
> Timpa dengan file lagu aslimu di `public/panasea.mp3`.

## Alur
1. **Intro** — animasi lilin + "Loading" (5,8 detik), background maroon
2. **Main** — "Just For You" + **player lagu** + 2 menu:
   - **A Special Letter** → buka **BUKU** yang bisa dibalik halaman
   - **Little Thoughts** → form kirim pesan via WhatsApp

## Player lagu (di landing page)
Mini music player yang menyatu dengan lagunya:
- **Sampul** kotak dengan ikon ♪ (berputar pelan saat diputar)
- **Judul + artis** (`Panasea` — `Ardhito Pramono`)
- **Waktu** `m:ss` berjalan + total durasi
- **Progress bar** yang ikut mengisi sesuai posisi lagu — **bisa diklik** untuk
  lompat ke bagian mana pun (seek)
- **Equalizer 4 bar** yang beranimasi saat lagu berbunyi
- Tombol **▶ / ⏸** dengan efek hover

Semua otomatis sinkron lewat event audio (`timeupdate`, `loadedmetadata`, dll).
Untuk ganti nama artis/judul, cari `<div className="song-info">` di
`components/BirthdayGift.js`.

## Efek buku (page flip)
- Buku 3D, tiap halaman bisa dibalik ala buku beneran
- **Ukuran halaman dihitung otomatis (JS)** sesuai layar nyata → **selalu muat,
  tidak terpotong**, dengan ruang untuk judul atas & tombol/hint bawah
- **Mode otomatis:**
  - **HP & tablet (semua orientasi, lebar < 1100px)**: **1 halaman penuh**
    — tiap **sisi** halaman dirender datar satu-per-satu (*bukan* 3D), jadi
    urutannya **Cover → Hal.2 → Hal.3 → Hal.4 → Hal.5 → Hal.6 → layar tutup**
    (semua 6 halaman kebaca, tanpa sliver halaman lain di tepi).
  - **Laptop / desktop** (lebar ≥1100px & mendatar): **2 halaman** (kiri-kanan)
    dengan efek balik buku 3D
- Buku dibuka dari keadaan **tertutup** (cover "Dear You" di kanan +
  halaman pendamping *endpaper* di kiri)
- Setelah semua halaman selesai → muncul **layar tutup buku**
  ("Halaman terakhir sudah sampai...") dengan tombol **↺ Baca lagi** & **✕ Tutup**
- Cara balik halaman: **swipe** kiri/kanan, **klik/kursor** di sisi kanan-kiri,
  tombol **‹ ›** di pinggir, atau **panah keyboard** (← →). Tombol **Esc** menutup buku.
- **Transisi halus tiap pindah halaman:** di HP/tablet halaman **meluncur masuk**
  dari kanan (maju) atau kiri (mundur) + kontennya memudar & naik perlahan; di
  desktop efek balik buku 3D tetap mulus. Overlay buku juga *fade-in* saat dibuka.
  (Otomatis nonaktif kalau pengguna menyalakan "prefers-reduced-motion".)
- Ada progress bar di atas + hint "geser / klik untuk membalik halaman"

## Tampilan estetik
- Tiap halaman punya **warna berbeda**: `theme-blush`, `theme-rose`, `theme-sand`, `theme-mauve`
- **Tekstur kertas** + **ornamen sudut** emas + *flourish* (✦) di bawah judul
- **Drop cap** (huruf besar awal paragraf ala buku klasik)
- **Cover mewah** (bingkai emas ganda) & halaman **penutup khusus** (`.the-end`)
- Partikel bintang berkilau + **animasi muncul** tiap halaman (fade + slide berurutan)

## Struktur buku (mudah diedit)
Buku didefinisikan sebagai array `LEAVES` di `components/BirthdayGift.js`.
Tiap leaf = 2 sisi: **depan** (tampil di kanan) & **belakang** (`.back`, tampil di
kiri saat dibalik):
```js
const LEAVES = [
  [ { className: "face cover-face", render: () => (...) },   // Depan: cover
    { className: "face back theme-blush", render: ... } ],    // Belakang: Hal. 2
  // ...leaf berikutnya...
];
```
Saat ini 3 leaf = 6 halaman:
| Leaf | Depan (kanan) | Belakang (kiri saat dibalik) |
|------|---------------|------------------------------|
| 0    | Cover "Dear You" | Hal. 2 — Pemilik Mata Indah |
| 1    | Hal. 3 — Sejak Kapan | Hal. 4 — Binar Matamu |
| 2    | Hal. 5 — Langit Malam | Hal. 6 — Penutup (`.the-end`) |

Mau nambah halaman? Tinggal tambah elemen baru di array `LEAVES`.

## Ganti FOTO
1. Taruh fotomu di folder **`public/`**, contoh `public/foto1.jpg`, `foto2.jpg`, dst.
2. Kode sudah mengarah ke `/foto1.jpg` ... `/foto4.jpg` (di `components/BirthdayGift.js`).
   Kalau nama file beda, cari baris `src="/foto1.jpg"` lalu ganti.
3. Kalau file foto belum ada, otomatis tampil placeholder "📷 Taruh foto di sini".

Tips: foto persegi (1:1) paling rapi. Kalau bukan persegi, tetap di-crop otomatis.

## Ganti LAGU
1. Taruh file lagu di **`public/panasea.mp3`**.
2. Ganti label judul lagu di `components/BirthdayGift.js`:
   ```js
   <div className="song-info">
     <b>Panasea</b>   {/* judul lagu */}
     <small>—</small> {/* nama artis */}
   </div>
   ```

## Ganti WARNA (tema maroon)
Di bagian atas `app/globals.css` ada blok `:root { ... }`. Ubah kode warnanya
sesuka hati, semua ikut berubah.

## Ganti TEKS surat
Cari `className: "face ..."` di dalam array `LEAVES` (`components/BirthdayGift.js`).
Edit teks `<h2>` dan `<p>`-nya.

## Kirim WhatsApp
Di `components/BirthdayGift.js`, ubah konstanta:
```js
const WA_PHONE = "6282114073679";  // ganti nomornya
```

## Catatan versi Next.js (perbaikan dari HTML asli)
- **Bug mode HP diperbaiki.** Di `index.html` asli, saat layar sempit semua
  lembar ditumpuk di satu kolom dan lembar yang sudah dibalik tetap berotasi
  180° sehingga menyembul sebagai *sliver* halaman lain di tepi kiri — halaman
  tampak "terpotong" dan halaman 2/4/6 tidak pernah tampil penuh.
  Sekarang mode 1-halaman me-render **tiap sisi sebagai satu halaman datar**
  (`.single-page` di `components/BirthdayGift.js` + `app/globals.css`), jadi:
  **Cover → Hal.2 → Hal.3 → Hal.4 → Hal.5 → Hal.6 → layar tutup**, tanpa sliver.
- Mode desktop (2 halaman 3D) tidak berubah.

