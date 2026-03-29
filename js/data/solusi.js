// ================================================
//  js/data/solusi.js
//  Data kartu solusi / cara menanggulangi emisi
//
//  CARA MENAMBAH SOLUSI BARU:
//  - Tambah entry di array sektor yang relevan
//  - Atau tambah ke ALL_SOLUTIONS untuk tips global
//
//  FIELD PER ENTRY:
//  - num       : nomor urut (tampil di lingkaran biru)
//  - icon      : emoji
//  - title     : judul solusi
//  - desc      : penjelasan 2–3 kalimat
//  - reduction : estimasi pengurangan emisi (teks)
//
//  SOLUSI PER SEKTOR ditampilkan dinamis saat tab aktif
//  ALL_SOLUTIONS selalu tampil di Panel 08
// ================================================

// --------------------------------------------------
// SOLUSI SEKTOR: TRANSPORTASI
// --------------------------------------------------
const SOLUTIONS_TRANSPORT = [
  {
    num       : 1,
    icon      : '🚲',
    title     : 'Bersepeda atau Jalan Kaki',
    desc      : 'Untuk jarak <5 km, ini pilihan terbaik — zero emisi, olahraga gratis, dan tidak macet! Sepeda listrik bisa jadi kompromi untuk jarak 5–15 km.',
    reduction : '100% untuk jarak dekat',
  },
  {
    num       : 2,
    icon      : '🚆',
    title     : 'Naik Transportasi Umum',
    desc      : 'KRL dan MRT menghasilkan 7× lebih sedikit emisi per penumpang dibanding mobil pribadi. Gunakan untuk komuter harian jika tersedia di kotamu.',
    reduction : 'Hemat 70–85% emisi',
  },
  {
    num       : 3,
    icon      : '🤝',
    title     : 'Carpooling (Berbagi Tumpangan)',
    desc      : 'Isi 4 kursi mobilmu! Emisi per orang langsung turun 75%. Ajak rekan kantor, gunakan aplikasi nebeng, atau atur jadwal bareng tetangga.',
    reduction : 'Hemat 50–75% per orang',
  },
  {
    num       : 4,
    icon      : '⚡',
    title     : 'Beralih ke Kendaraan Listrik',
    desc      : 'Motor listrik menghasilkan 60% lebih sedikit emisi dari motor bensin di grid PLN saat ini, dan akan terus membaik seiring naiknya porsi EBT.',
    reduction : 'Hemat 40–65% emisi',
  },
  {
    num       : 5,
    icon      : '💻',
    title     : 'Work From Home (WFH)',
    desc      : 'WFH hanya 2 hari per minggu sudah bisa memangkas 40% emisi komuter tahunanmu secara instan tanpa biaya apapun.',
    reduction : 'Hemat 40% emisi komuter',
  },
  {
    num       : 6,
    icon      : '🛞',
    title     : 'Eco-driving Technique',
    desc      : 'Jaga kecepatan konstan 60–80 km/jam, hindari akselerasi mendadak, cek tekanan ban rutin, dan matikan mesin saat idle >30 detik.',
    reduction : 'Hemat 15–20% BBM',
  },
];

// --------------------------------------------------
// SOLUSI SEKTOR: INDUSTRI
// --------------------------------------------------
const SOLUTIONS_INDUSTRI = [
  {
    num       : 1,
    icon      : '♻️',
    title     : 'Gunakan Material Daur Ulang',
    desc      : 'Baja dari scrap hemat 68% energi vs bijih besi baru. Aluminium daur ulang hemat 95%! Prioritaskan penggunaan material sekunder dalam produksi.',
    reduction : 'Hemat 68–95% emisi material',
  },
  {
    num       : 2,
    icon      : '⚡',
    title     : 'Elektrifikasi Proses Industri',
    desc      : 'Ganti pemanas berbahan bakar fosil dengan pemanas listrik dari EBT. Gunakan heat pump industri yang 3–5× lebih efisien dari pemanas konvensional.',
    reduction : 'Hemat 40–80% emisi proses',
  },
  {
    num       : 3,
    icon      : '🌡️',
    title     : 'Audit & Efisiensi Energi Pabrik',
    desc      : 'Pasang Variable Frequency Drive (VFD) di motor listrik, optimalkan sistem uap, perbaiki insulasi, dan monitor konsumsi energi real-time.',
    reduction : 'Hemat 20–30% energi pabrik',
  },
  {
    num       : 4,
    icon      : '🌿',
    title     : 'Carbon Capture & Storage (CCS)',
    desc      : 'Teknologi penangkapan CO₂ langsung dari cerobong pabrik semen dan baja sudah mulai diimplementasikan. Potensial menangkap hingga 90% emisi proses.',
    reduction : 'Tangkap hingga 90% emisi',
  },
  {
    num       : 5,
    icon      : '🔄',
    title     : 'Desain Circular Economy',
    desc      : 'Rancang produk agar bisa diperbaiki, diperbarui, dan didaur ulang — bukan langsung dibuang. Perpanjang umur produk = kurangi emisi manufaktur.',
    reduction : 'Hemat 30–50% jangka panjang',
  },
];

// --------------------------------------------------
// SOLUSI SEKTOR: RUMAH TANGGA
// --------------------------------------------------
const SOLUTIONS_RUMAH = [
  {
    num       : 1,
    icon      : '🌞',
    title     : 'Pasang Panel Surya Atap',
    desc      : 'PLTS Atap 2 kWp menghasilkan 200–250 kWh/bulan di Indonesia dan bisa balik modal dalam 5–7 tahun. Daftarkan ke program PLN Net Metering.',
    reduction : 'Hemat 70–100% tagihan listrik',
  },
  {
    num       : 2,
    icon      : '💡',
    title     : 'Lampu LED & Peralatan Inverter',
    desc      : 'Lampu LED hemat 80% vs bohlam pijar. Kulkas inverter hemat 30–40%. AC inverter hemat 30–50% dibanding AC konvensional.',
    reduction : 'Hemat 20–50% listrik rumah',
  },
  {
    num       : 3,
    icon      : '❄️',
    title     : 'Optimasi Penggunaan AC',
    desc      : 'Set suhu AC minimal 24–25°C (tiap 1°C naik = hemat 6% listrik). Segel celah pintu/jendela, pasang curtain tebal, dan servis rutin AC.',
    reduction : 'Hemat 20–40% listrik AC',
  },
  {
    num       : 4,
    icon      : '♻️',
    title     : 'Pilah Sampah & Buat Kompos',
    desc      : 'Sampah organik yang dikempos tidak akan menghasilkan metana di TPA. Sampah anorganik yang dipilah bisa didaur ulang dan mengurangi kebutuhan material baru.',
    reduction : 'Kurangi 50% emisi limbah rumah',
  },
  {
    num       : 5,
    icon      : '🚿',
    title     : 'Solar Water Heater',
    desc      : 'Pemanas air berkontribusi 15–18% konsumsi listrik rumah tangga. Solar water heater menggunakan energi matahari gratis dan balik modal dalam 3–5 tahun.',
    reduction : 'Hemat 15–18% listrik rumah',
  },
];

// --------------------------------------------------
// SOLUSI SEKTOR: DIGITAL
// --------------------------------------------------
const SOLUTIONS_DIGITAL = [
  {
    num       : 1,
    icon      : '📵',
    title     : 'Kurangi Streaming Resolusi Tinggi',
    desc      : 'Streaming 4K menghasilkan 5× emisi dibanding SD. Gunakan resolusi HD (1080p) untuk keseimbangan kualitas-emisi. Matikan autoplay saat tidak ditonton.',
    reduction : 'Kurangi hingga 80% emisi streaming',
  },
  {
    num       : 2,
    icon      : '📧',
    title     : 'Bersihkan Inbox & Unsubscribe',
    desc      : 'Hapus email lama secara massal, unsubscribe dari newsletter yang tidak dibaca, gunakan Google Drive untuk berbagi file besar daripada lampiran email.',
    reduction : 'Kurangi beban server secara nyata',
  },
  {
    num       : 3,
    icon      : '☁️',
    title     : 'Pilih Layanan Berbasis EBT',
    desc      : 'Beberapa provider cloud (Google Cloud, Microsoft Azure) sudah berkomitmen 100% energi terbarukan. Pilih platform yang transparan soal emisi mereka.',
    reduction : 'Hingga 80% lebih bersih',
  },
  {
    num       : 4,
    icon      : '📱',
    title     : 'Perpanjang Umur Perangkat',
    desc      : 'Produksi 1 smartphone baru menghasilkan ~70 kg CO₂e. Pakai HP selama 4–5 tahun, perbaiki daripada ganti, pertimbangkan beli refurbished.',
    reduction : 'Hemat 70 kg CO₂e per perangkat',
  },
  {
    num       : 5,
    icon      : '🤖',
    title     : 'Gunakan AI Lebih Efisien',
    desc      : 'Buat prompt yang spesifik dan lengkap dalam satu kali tanya daripada 10 query bolak-balik. Satu percakapan panjang lebih efisien dari banyak sesi baru.',
    reduction : 'Kurangi komputasi sia-sia',
  },
];

// --------------------------------------------------
// ALL_SOLUTIONS — Tips global lintas sektor
// Selalu tampil di Panel 08 (Tips)
// --------------------------------------------------
const ALL_SOLUTIONS = [
  {
    num       : 1,
    icon      : '🚲',
    title     : 'Bersepeda atau Jalan Kaki',
    desc      : 'Zero emisi, zero biaya, plus sehat. Untuk jarak <5 km tidak ada alasan untuk tidak mencoba!',
    reduction : '100% untuk jarak dekat',
  },
  {
    num       : 2,
    icon      : '🚆',
    title     : 'Maksimalkan Transportasi Umum',
    desc      : 'KRL, MRT, bus — semua 5–10× lebih efisien per penumpang dari kendaraan pribadi. Jadikan kebiasaan harian.',
    reduction : 'Hemat 70–85% emisi transportasi',
  },
  {
    num       : 3,
    icon      : '🌞',
    title     : 'Pasang Panel Surya Atap',
    desc      : 'Investasi terbaik untuk mengurangi emisi rumah tangga sekaligus menghemat tagihan listrik jangka panjang.',
    reduction : 'Hemat 70–100% emisi listrik',
  },
  {
    num       : 4,
    icon      : '♻️',
    title     : 'Daur Ulang & Kurangi Konsumsi',
    desc      : 'Setiap produk yang tidak dibeli = emisi manufaktur yang tidak terjadi. Beli yang perlu, pilih yang tahan lama.',
    reduction : 'Hemat 30–95% emisi material',
  },
  {
    num       : 5,
    icon      : '🌳',
    title     : 'Tanam Pohon & Restorasi Lahan',
    desc      : '1 pohon menyerap ±22 kg CO₂/tahun. Ikut program tanam pohon atau donasi ke proyek restorasi gambut yang terverifikasi.',
    reduction : '22 kg CO₂e/pohon/tahun',
  },
  {
    num       : 6,
    icon      : '🥗',
    title     : 'Kurangi Konsumsi Daging Merah',
    desc      : 'Daging sapi menghasilkan 27 kg CO₂e/kg — 20× lebih tinggi dari tahu/tempe. Ganti 1–2 kali seminggu saja sudah berdampak besar.',
    reduction : 'Hemat 500+ kg CO₂e/tahun',
  },
  {
    num       : 7,
    icon      : '💡',
    title     : 'Efisiensi Energi di Semua Lini',
    desc      : 'LED, AC inverter, motor VFD, insulasi atap, dan kebiasaan matikan listrik saat tidak dipakai — semua bertambah signifikan dalam setahun.',
    reduction : 'Hemat 20–50% konsumsi energi',
  },
  {
    num       : 8,
    icon      : '📵',
    title     : 'Digital Detox Mingguan',
    desc      : 'Satu hari tanpa streaming = hemat ~200g CO₂. Bonus besar: lebih produktif, tidur lebih baik, dan terhubung dengan dunia nyata.',
    reduction : 'Kurangi jejak digital hingga 14%',
  },
];
