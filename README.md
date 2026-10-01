# BirthdayTemp — Digital Gift (maroon + buku flip)

Satu file saja: **index.html**. Buka di browser (HP paling enak).

## Alur
1. **Intro** — animasi lilin + "Loading" (5,8 detik), background maroon
2. **Main** — "Just For You" + kartu lagu + 2 menu:
   - **A Special Letter** → buka **BUKU** yang bisa dibalik halaman
   - **Little Thoughts** → form kirim pesan via WhatsApp

## Efek buku (page flip)
- Buku 3D, tiap halaman bisa dibalik ala buku beneran
- **Ukuran halaman dihitung otomatis (JS)** sesuai layar nyata → **selalu muat,
  tidak terpotong**, dengan ruang untuk judul atas & tombol/hint bawah
- **Mode otomatis:**
  - **Desktop / tablet-landscape** (lebar ≥721px & lebar > tinggi): **2 halaman**
    (kiri-kanan) sekaligus
  - **HP (semua orientasi) & tablet potret** (mis. iPad tegak): **1 halaman penuh**
    — dan di mode ini hanya **tepat satu sisi** yang dirender, jadi halaman
    pertama selalu muncul sebagai **cover "Dear You"** (tidak melompat ke hal 2)
- Buku dibuka dari keadaan **tertutup** (cover "Dear You" di kanan +
  halaman pendamping *endpaper* di kiri)
- Setelah semua halaman selesai → muncul **layar tutup buku**
  ("Halaman terakhir sudah sampai...") dengan tombol **↺ Baca lagi** & **✕ Tutup**
- Cara balik halaman: **swipe** kiri/kanan, **klik/kursor** di sisi kanan-kiri,
  tombol **‹ ›** di pinggir, atau **panah keyboard** (← →). Tombol **Esc** menutup buku.
- Ada progress bar di atas + hint "geser / klik untuk membalik halaman"
- Ukuran sudah diuji untuk: iPhone SE/12/13/Pro Max, iPad mini/potret/landscape,
  sampai laptop — semua pas tanpa terpotong

## Tampilan estetik (biar nggak kaku & monoton)
- Tiap halaman punya **warna berbeda** (semua tetap nuansa maroon/hangat):
  `theme-blush`, `theme-rose`, `theme-sand`, `theme-mauve`
- **Tekstur kertas** + **ornamen sudut** emas + *flourish* (✦) di bawah judul
- **Drop cap** (huruf besar awal paragraf ala buku klasik)
- **Cover mewah** (bingkai emas ganda) & halaman **penutup khusus** (`.the-end`)
- Partikel bintang berkilau + **animasi muncul** tiap halaman (fade + slide berurutan)

## Struktur buku (mudah diedit)
Buku = beberapa **leaf** (lembar). Tiap leaf punya 2 sisi:
```html
<div class="leaf">
  <div class="face">        <!-- sisi DEPAN (tampil di kanan) -->
     ...isi halaman...
  </div>
  <div class="face back">   <!-- sisi BELAKANG (tampil di kiri saat dibalik) -->
     ...isi halaman...
  </div>
</div>
```
Saat ini 3 leaf = 6 halaman:
| Leaf | Depan (kanan) | Belakang (kiri saat dibalik) |
|------|---------------|------------------------------|
| 0    | Cover "Dear You" | Hal. 2 — Pemilik Mata Indah |
| 1    | Hal. 3 — Sejak Kapan | Hal. 4 — Binar Matamu |
| 2    | Hal. 5 — Langit Malam | Hal. 6 — Penutup (`.the-end`) |

> Label di tiap halaman (`Halaman 2`, `Halaman 3`, ...) sudah **sesuai** dengan
> nomor di pojok bawah (`page-num`). Halaman penutup berlabel "Halaman Terakhir".

Mau nambah halaman? Tinggal tambah `<div class="leaf">` baru.

## Ganti FOTO
Tiap halaman sudah ada **template foto**. Cara pakai:
1. Taruh fotomu di folder ini, contoh nama `foto1.jpg`, `foto2.jpg`, dst.
2. Itu otomatis kepakai (kode sudah mengarah ke `foto1.jpg`...`foto4.jpg`).
   Kalau nama file beda, cari baris ini di index.html:
   ```html
   <img src="foto1.jpg" ...>
   ```
   ganti `foto1.jpg` jadi nama file fotomu.
3. Kalau file foto belum ada, otomatis tampil placeholder "📷 Taruh foto di sini".

Tips: foto persegi (1:1) paling rapi. Kalau bukan persegi, tetap di-crop otomatis.

## Ganti LAGU
1. Taruh file lagu di folder ini, namai **`panasea.mp3`**.
2. Ganti label judul lagu di:
   ```html
   <div class="song-info">
       <b>Panasea</b>       <!-- judul lagu -->
       <small>—</small>     <!-- nama artis -->
   </div>
   ```
3. Simpan. Tombol ▶ bakal muter lagunya (butuh 1x klik dulu).

## Ganti WARNA (tema maroon)
Di bagian paling atas `<style>` ada:
```css
:root {
    --maroon-deep: #2b0608;
    --maroon-mid:  #4a0a0f;
    --maroon-light:#6b1218;
    --cream:       #f6e7d8;
    ...
}
```
Ubah kode warnanya sesuka hati, semua ikut berubah.

## Ganti TEKS surat
Cari `<!-- halaman ... -->` di dalam tiap `.face`. Edit teks `<h2>` dan `<p>`-nya.

## Kirim WhatsApp
Cari `const phone = '6282114073679';` di `<script>`, ganti nomornya.
