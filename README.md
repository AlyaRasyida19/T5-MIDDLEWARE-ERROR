# TUGAS 5 — ROUTER, MIDDLEWARE, DAN ERROR TERPUSAT

## 1. Identitas Pengembang

- **Nama:** Alya Rasyida Putri
- **NIM:** F1D02410002
- **Varian Tugas:** B — Kantin

## 2. Deskripsi Proyek

Proyek ini merupakan implementasi REST API menggunakan Node.js dan Express.js dengan menerapkan konsep router, middleware, validasi data, serta penanganan error secara terpusat.

API yang dibuat merupakan sistem pengelolaan menu kantin yang memungkinkan pengguna untuk melihat seluruh menu, mencari menu berdasarkan kategori atau ID, menambahkan menu baru, dan menghapus menu.

Pengembangan proyek ini bertujuan untuk menerapkan struktur aplikasi yang lebih terorganisasi dengan memisahkan routes, controllers, services, data, validators, dan middlewares.

## 3. Teknologi yang Digunakan

Teknologi dan library yang digunakan dalam proyek ini meliputi:

- **Node.js:** Menjalankan aplikasi JavaScript pada sisi server.
- **Express.js:** Membuat server dan mengatur routing API.
- **Joi:** Melakukan validasi data yang diterima melalui request.
- **Dotenv:** Mengelola konfigurasi aplikasi melalui environment variable.
- **REST Client:** Mengirim dan menguji HTTP request melalui Visual Studio Code.

## 4. Struktur Folder

Struktur folder proyek disusun sebagai berikut:

```text
T5-MIDDLEWARE-ERROR/
│
├── controllers/
│   └── menu.controller.js
│
├── data/
│   └── menu.js
│
├── middlewares/
│   ├── AppError.js
│   ├── cekApiKey.js
│   ├── errorHandler.js
│   └── logger.js
│
├── routes/
│   └── menu.routes.js
│
├── services/
│   └── menu.service.js
│
├── validators/
│   └── menu.validator.js
│
├── screenshots/
│
├── .env
├── .env.example
├── .gitignore
├── index.js
├── package.json
├── package-lock.json
└── requests.http
```

Setiap folder memiliki tanggung jawab masing-masing. Routes digunakan untuk mengatur endpoint, controllers menangani request dan response, services mengelola proses bisnis, sedangkan middlewares menangani proses tambahan seperti logging, autentikasi API Key, dan error handling.

## 5. Cara Menjalankan Proyek

Untuk menjalankan proyek, ikuti langkah-langkah berikut:

1. Clone repository dari GitHub.
2. Buka folder proyek melalui Visual Studio Code.
3. Jalankan perintah berikut pada terminal untuk menginstal dependency:

```bash
npm install
```

4. Buat file `.env` pada direktori utama proyek dengan mengacu pada `.env.example`.

5. Isi file `.env` dengan API Key yang akan digunakan:

```env
API_KEY=isi_api_key_kamu
```

Nilai API Key dapat disesuaikan dengan kebutuhan pengguna.

6. Jalankan server menggunakan perintah:

```bash
npm run dev
```

7. Jika berhasil, server akan berjalan pada:

```text
http://localhost:3000
```

## 6. Daftar Endpoint API

API menyediakan beberapa endpoint untuk mengelola data menu kantin.

### 6.1 GET /menu

Digunakan untuk mengambil seluruh data menu kantin.

**Response:** `200 OK`

### 6.2 GET /menu?kategori=minuman

Digunakan untuk mengambil data menu berdasarkan kategori tertentu. Pada contoh ini, API hanya menampilkan menu dengan kategori minuman.

**Response:** `200 OK`

### 6.3 GET /menu/:id

Digunakan untuk mengambil detail menu berdasarkan ID.

Jika data ditemukan, API mengembalikan informasi menu. Jika tidak ditemukan, API memberikan response `404 Not Found`.

### 6.4 POST /menu

Digunakan untuk menambahkan data menu baru.

Endpoint ini memerlukan API Key melalui header `x-api-key` dan melewati proses validasi menggunakan Joi.

Jika data berhasil ditambahkan, API memberikan response `201 Created`.

### 6.5 DELETE /menu/:id

Digunakan untuk menghapus data menu berdasarkan ID.

Endpoint ini memerlukan API Key melalui header `x-api-key`.

Jika penghapusan berhasil, API memberikan response `204 No Content`. Jika data tidak ditemukan, API memberikan response `404 Not Found`.

## 7. Validasi Data dan Aturan Bisnis

Validasi data dilakukan menggunakan library Joi untuk memastikan data yang diterima sesuai dengan ketentuan.

Ketentuan validasi data menu meliputi:

- **nama:** Wajib diisi, berupa string, dan memiliki panjang 3–50 karakter.
- **harga:** Wajib diisi, berupa bilangan bulat dengan nilai minimal 1.000 dan maksimal 100.000.
- **kategori:** Wajib diisi dan hanya menerima nilai `makanan`, `minuman`, atau `camilan`.
- **tersedia:** Berupa boolean dan memiliki nilai default `true`.

Validasi menggunakan pengaturan `abortEarly: false` sehingga seluruh kesalahan input dapat ditampilkan dalam satu response.

Selain validasi tersebut, terdapat aturan bisnis untuk mencegah penambahan menu dengan nama yang sama. Pemeriksaan dilakukan tanpa membedakan huruf besar dan kecil.

Jika ditemukan nama menu yang sudah terdaftar, API akan memberikan response `409 Conflict` dengan kode error `NAMA_DUPLIKAT`.

## 8. Middleware dan Penanganan Error

Proyek ini menerapkan beberapa middleware untuk mendukung proses pengelolaan request dan response.

### 8.1 Logger Middleware

Logger digunakan untuk mencatat setiap request yang masuk ke server. Informasi yang dicatat meliputi HTTP method, URL, status code, dan durasi pemrosesan request.

Contoh format log:

```text
GET /menu -> 200 (3 ms)
POST /menu -> 201 (5 ms)
DELETE /menu/99 -> 404 (2 ms)
```

### 8.2 Cek API Key Middleware

Middleware ini digunakan untuk memeriksa API Key yang dikirim melalui header `x-api-key`.

Jika API Key tidak disertakan atau nilainya tidak sesuai dengan konfigurasi pada file `.env`, API akan memberikan response `401 Unauthorized`.

Middleware ini diterapkan pada endpoint POST dan DELETE.

### 8.3 AppError

AppError merupakan class khusus yang digunakan untuk membentuk error aplikasi dengan informasi pesan, status HTTP, dan kode error.

Dengan demikian, error aplikasi dapat ditangani secara konsisten.

### 8.4 Error Handler Terpusat

Error handler digunakan untuk menangani kesalahan yang terjadi selama proses request. Penanganan error dilakukan pada satu tempat sehingga controller tidak perlu mengirimkan response error secara manual.

Format response error yang digunakan:

```json
{
  "error": {
    "pesan": "Pesan kesalahan",
    "kode": "KODE_ERROR"
  }
}
```

Beberapa jenis error yang ditangani dalam proyek ini meliputi:

- `401 Unauthorized`: API Key tidak valid atau tidak disertakan.
- `404 Not Found`: Data menu tidak ditemukan.
- `404 Route Not Found`: Endpoint yang diminta tidak tersedia.
- `409 Conflict`: Nama menu sudah terdaftar.
- `422 Unprocessable Entity`: Data yang dikirim tidak sesuai ketentuan validasi.
- `500 Internal Server Error`: Terjadi kesalahan pada sisi server.

Untuk error 500, response kepada pengguna menggunakan pesan umum agar detail teknis tidak ditampilkan. Informasi stack error hanya dicatat pada terminal server.

## 9. Dokumentasi Pengujian

Pengujian dilakukan menggunakan REST Client pada Visual Studio Code untuk memastikan setiap endpoint dan middleware berjalan sesuai ketentuan.

Dokumentasi pengujian meliputi:

1. [01-get-menu](screenshot/01-get-menu.jpeg)  — Pengujian mengambil seluruh data menu.
2. [02-filter-menu](screenshot/02-filter-menu.jpeg) — Pengujian filter menu berdasarkan kategori.
3. [03-get-detail](screenshot/03-get-detail.jpeg) — Pengujian mengambil detail menu berdasarkan ID.
4. [04-not-found](screenshot/04-not-found.jpeg) — Pengujian ketika ID menu tidak ditemukan.
5. [05-route-not-found](screenshot/05-route-not-found.jpeg) — Pengujian endpoint yang tidak tersedia.
6. [06-post-menu](screenshot/06-post-menu.jpeg) — Pengujian menambahkan menu baru.
7. [07-api-key-salah](screenshot/07-api-key-salah.jpeg) — Pengujian API Key yang tidak valid.
8. [08-validasi](screenshot/08-validasi.jpeg) — Pengujian data yang tidak sesuai ketentuan validasi.
9. [09-duplikat](screenshot/09-duplikat.jpeg) — Pengujian penambahan nama menu yang sudah terdaftar.
10. [10-delete-menu](screenshot/10-delete-menu.jpeg) — Pengujian menghapus data menu.
11. [11-delete-not-found](screenshot/11-delete-not-found.jpeg) — Pengujian penghapusan menu dengan ID yang tidak ditemukan.
12. [12-error-500](screenshot/12-error-500.jpeg) — Pengujian penanganan kesalahan internal server.
13. [13-logger](screenshot/13-logger.jpeg) — Dokumentasi hasil pencatatan request pada terminal.

Selain pengujian melalui REST Client, file `requests.http` juga disediakan untuk mempermudah pengujian seluruh endpoint.

## 10. Pernyataan Penggunaan AI

Dalam pengerjaan tugas ini, AI digunakan sebagai alat bantu pembelajaran untuk memahami konsep router, middleware, validasi menggunakan Joi, serta penanganan error secara terpusat.

AI juga dimanfaatkan untuk membantu memahami struktur kode, menemukan kesalahan, dan memberikan penjelasan terhadap bagian program yang belum dipahami.

Contoh prompt yang digunakan:

- Jelaskan cara kerja router pada Express.js dan bagaimana memisahkan routes dengan controllers.
- Bagaimana cara membuat middleware untuk memeriksa API Key pada header request?
- Jelaskan cara menerapkan validasi menggunakan Joi dengan menampilkan seluruh kesalahan input.
- Bagaimana cara membuat error handler terpusat pada Express.js?

Seluruh kode tetap dipelajari, diperiksa, dan diuji kembali agar sesuai dengan kebutuhan tugas.

## 11. Kesimpulan

Melalui pengerjaan tugas ini, berhasil dibuat REST API pengelolaan menu kantin menggunakan Express.js dengan menerapkan router, middleware, validasi Joi, serta error handling terpusat.

Pemisahan kode ke dalam beberapa folder membuat struktur aplikasi menjadi lebih terorganisasi dan mudah dikembangkan. Penggunaan middleware logger membantu memantau request yang masuk, sedangkan middleware API Key memberikan pemeriksaan autentikasi pada endpoint tertentu.

Selain itu, penggunaan Joi memastikan data yang diterima sesuai dengan ketentuan, dan error handler terpusat membuat format penanganan kesalahan menjadi lebih konsisten.

Dengan demikian, proyek ini memberikan pemahaman mengenai penerapan struktur REST API yang lebih terorganisasi, aman, dan mudah dipelihara.

