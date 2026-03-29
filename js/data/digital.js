// ================================================
//  js/data/digital.js
//  Faktor emisi untuk sektor digital & teknologi
//
//  CARA MENAMBAH AKTIVITAS DIGITAL BARU:
//  1. Tambah konstanta di DIGITAL_FACTORS
//  2. Tambah slider di index.html (sec-digital)
//  3. Tambah ke kalkulasi di js/sectors/digital.js
//
//  CATATAN:
//  Faktor emisi digital sangat bergantung pada:
//  - Bauran energi data center yang dipakai
//  - Efisiensi jaringan (PUE data center)
//  - Resolusi streaming / kualitas layanan
//  Angka di sini adalah estimasi rata-rata global
//
//  SUMBER DATA:
//  arXiv 2024 (Environmental Burden of US Data Centers)
//  The Shift Project · IEA Data Centers & Networks
//  Carbon Trust · Anthropic / OpenAI energy estimates
// ================================================

const DIGITAL_FACTORS = {

  // --------------------------------------------------
  // STREAMING VIDEO
  // Satuan: gram CO₂e per jam streaming
  // --------------------------------------------------
  streaming_sd_per_jam  : 20,   // SD 480p
  streaming_hd_per_jam  : 36,   // HD 1080p (default)
  streaming_4k_per_jam  : 100,  // 4K UHD
  // Sumber: The Shift Project · Carbon Trust 2023
  // Termasuk: server encode, CDN, jaringan, layar

  // --------------------------------------------------
  // GAMING ONLINE
  // Satuan: gram CO₂e per jam
  // --------------------------------------------------
  gaming_pc_per_jam     : 45,   // PC gaming (GPU aktif)
  gaming_cloud_per_jam  : 60,   // Cloud gaming (default)
  gaming_mobile_per_jam : 15,   // Mobile gaming
  // Cloud gaming lebih tinggi karena render di server

  // --------------------------------------------------
  // EMAIL
  // Satuan: gram CO₂e per email
  // --------------------------------------------------
  email_biasa_per_item   : 4,   // Email teks biasa (default)
  email_attachment_per_item: 50, // Email dengan lampiran besar
  email_spam_per_item    : 0.3, // Spam (pendek, langsung hapus)
  // Sumber: Mike Berners-Lee "How Bad Are Bananas?" 2020

  // --------------------------------------------------
  // AI / LLM QUERIES
  // Satuan: gram CO₂e per query/request
  // --------------------------------------------------
  ai_query_sederhana     : 3,   // Query pendek, model kecil
  ai_query_kompleks      : 10,  // Query panjang, model besar (default rata-rata ~5g)
  ai_image_gen           : 50,  // Generate 1 gambar AI
  ai_video_gen           : 500, // Generate video pendek AI
  // Sumber: estimasi berdasarkan kWh/query × intensitas grid

  // --------------------------------------------------
  // AKTIVITAS LAIN (untuk pengembangan berikutnya)
  // --------------------------------------------------
  sosmed_scroll_per_jam  : 8,   // Scrolling feed media sosial
  video_call_per_jam     : 55,  // Video call HD (Zoom/Meet)
  audio_call_per_jam     : 3.6, // Panggilan suara saja
  download_per_gb        : 3,   // Download / upload data
  website_per_pageview   : 1.76,// Rata-rata satu halaman web (CO2.fyi)
  kripto_bitcoin_per_tx  : 880000, // Satu transaksi Bitcoin (g CO₂e!)
  kripto_eth_per_tx      : 48,  // Satu transaksi Ethereum (post-merge)

  // --------------------------------------------------
  // PRODUKSI PERANGKAT (Life-Cycle)
  // Satuan: kg CO₂e per perangkat
  // Dibagi umur pakai untuk emisi tahunan
  // --------------------------------------------------
  smartphone_per_unit    : 70,  // kg CO₂e produksi HP (IEA)
  laptop_per_unit        : 350, // kg CO₂e produksi laptop
  smartwatch_per_unit    : 29,  // kg CO₂e smartwatch
  umur_hp_tahun          : 3,   // Umur pakai rata-rata
  umur_laptop_tahun      : 4,

};

// ================================================
//  DIGITAL_DEFAULTS — Nilai default slider
// ================================================
const DIGITAL_DEFAULTS = {
  stream_jam_per_hari : 2,
  game_jam_per_hari   : 1,
  email_per_hari      : 20,
  ai_query_per_hari   : 10,
};

// ================================================
//  DIGITAL_SKALA — Multiplier skala waktu
//  Key = value dari <select id="digital-time">
// ================================================
const DIGITAL_SKALA = {
  30  : { label: 'Per bulan (30 hari)',  annualMult: 12 },
  365 : { label: 'Per tahun (365 hari)', annualMult: 1  },
};
