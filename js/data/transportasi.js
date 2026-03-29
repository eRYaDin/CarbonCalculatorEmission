// ================================================
//  js/data/transportasi.js
//  Semua data mentah untuk sektor transportasi:
//  - VEHICLES    : daftar kendaraan + faktor emisi
//  - FUEL_MULT   : multiplier jenis bahan bakar
//  - FREQ_DATA   : multiplier frekuensi perjalanan
//
//  CARA MENAMBAH KENDARAAN BARU:
//  1. Tambah entry baru di objek VEHICLES di bawah
//  2. Isi semua field: label, icon, cat, ef, desc
//  3. Jika pakai BBM, pastikan key ada di FUEL_USES
//  4. Tidak perlu ubah HTML atau file JS lain
//
//  FIELD KENDARAAN:
//  - label : nama tampil di tombol
//  - icon  : emoji
//  - cat   : nama kategori (akan jadi header grup)
//  - ef    : faktor emisi dalam gram CO₂e per km
//            (per penumpang untuk angkutan umum)
//  - desc  : keterangan singkat (muncul di tooltip)
//
//  SUMBER DATA:
//  IPCC 2006 Vol.2 Ch.3 (Mobile Combustion)
//  Kementerian ESDM RI · IEA 2023 · PLN 2022
// ================================================

const VEHICLES = {

  // --------------------------------------------------
  // KATEGORI: DARAT — PRIBADI
  // ef dalam g CO₂e/km (per kendaraan)
  // --------------------------------------------------
  motor_bebek: {
    label : 'Motor Bebek',
    icon  : '🛵',
    cat   : 'Darat Pribadi',
    ef    : 90,
    desc  : 'Motor 110–125cc, paling umum di Indonesia (ESDM RI)',
  },
  motor_sport: {
    label : 'Motor Sport',
    icon  : '🏍️',
    cat   : 'Darat Pribadi',
    ef    : 108,
    desc  : 'Motor 150–250cc, performa lebih tinggi = lebih boros',
  },
  motor_besar: {
    label : 'Motor Besar',
    icon  : '🏍️',
    cat   : 'Darat Pribadi',
    ef    : 152,
    desc  : 'Motor >500cc (touring/naked), boros signifikan',
  },
  motor_listrik: {
    label : 'Motor Listrik',
    icon  : '⚡',
    cat   : 'Darat Pribadi',
    ef    : 35,
    desc  : 'Berbasis bauran PLN Indonesia ~60% batubara (PLN 2022)',
  },
  mobil_city: {
    label : 'City Car',
    icon  : '🚗',
    cat   : 'Darat Pribadi',
    ef    : 155,
    desc  : 'Mobil kecil 1000–1300cc, relatif irit',
  },
  mobil_sedan: {
    label : 'Sedan',
    icon  : '🚙',
    cat   : 'Darat Pribadi',
    ef    : 185,
    desc  : 'Sedan menengah 1500–2000cc, standar komuter',
  },
  mobil_suv: {
    label : 'SUV',
    icon  : '🚕',
    cat   : 'Darat Pribadi',
    ef    : 220,
    desc  : 'SUV 2000–2500cc, bobot berat = emisi tinggi',
  },
  mobil_suv_besar: {
    label : 'SUV Besar',
    icon  : '🚙',
    cat   : 'Darat Pribadi',
    ef    : 285,
    desc  : 'SUV premium >2500cc, emisi sangat tinggi',
  },
  mobil_mpv: {
    label : 'MPV',
    icon  : '🚐',
    cat   : 'Darat Pribadi',
    ef    : 200,
    desc  : 'MPV/minivan keluarga, kapasitas 6–8 orang',
  },
  pikap: {
    label : 'Pick-up',
    icon  : '🛻',
    cat   : 'Darat Pribadi',
    ef    : 240,
    desc  : 'Truk ringan, populer di pedesaan dan niaga kecil',
  },
  truk_sedang: {
    label : 'Truk Sedang',
    icon  : '🚛',
    cat   : 'Darat Pribadi',
    ef    : 620,
    desc  : 'Truk 8–15 ton, emisi per km sangat tinggi',
  },
  mobil_ev: {
    label : 'Mobil Listrik',
    icon  : '🔋',
    cat   : 'Darat Pribadi',
    ef    : 70,
    desc  : 'EV di Indonesia, grid masih dominan batubara (IEA 2023)',
  },
  mobil_hybrid: {
    label : 'Hybrid',
    icon  : '♻️',
    cat   : 'Darat Pribadi',
    ef    : 105,
    desc  : 'Kombinasi bensin + listrik, ~40% lebih hemat',
  },
  mobil_phev: {
    label : 'PHEV',
    icon  : '🔌',
    cat   : 'Darat Pribadi',
    ef    : 85,
    desc  : 'Plug-in Hybrid, bisa isi daya eksternal (IEA 2023)',
  },

  // --------------------------------------------------
  // KATEGORI: TRANSPORTASI UMUM
  // ef dalam g CO₂e/km PER PENUMPANG
  // (sudah dibagi rata-rata isi penumpang tipikal)
  // --------------------------------------------------
  bus_kota: {
    label : 'Bus Kota',
    icon  : '🚌',
    cat   : 'Transportasi Umum',
    ef    : 68,
    desc  : 'Per penumpang-km, asumsi rata-rata 40 penumpang',
  },
  busway: {
    label : 'Busway/BRT',
    icon  : '🚍',
    cat   : 'Transportasi Umum',
    ef    : 52,
    desc  : 'BRT jalur khusus, lebih efisien dari bus biasa',
  },
  bus_antar_kota: {
    label : 'Bus AKAP',
    icon  : '🚌',
    cat   : 'Transportasi Umum',
    ef    : 45,
    desc  : 'Bus antar kota, kapasitas besar = efisien per penumpang',
  },
  angkot: {
    label : 'Angkot',
    icon  : '🚐',
    cat   : 'Transportasi Umum',
    ef    : 95,
    desc  : 'Kapasitas 12–14 orang, sering berjalan setengah penuh',
  },
  kereta_komuter: {
    label : 'KRL Commuter',
    icon  : '🚆',
    cat   : 'Transportasi Umum',
    ef    : 38,
    desc  : 'KRL listrik, sangat efisien per penumpang-km',
  },
  kereta_jarak_jauh: {
    label : 'Kereta API',
    icon  : '🚄',
    cat   : 'Transportasi Umum',
    ef    : 41,
    desc  : 'Kereta jarak jauh diesel/listrik Indonesia',
  },
  mrt: {
    label : 'MRT/LRT',
    icon  : '🚇',
    cat   : 'Transportasi Umum',
    ef    : 28,
    desc  : 'Paling efisien di antara semua moda perkotaan',
  },
  ojol: {
    label : 'Ojek Online',
    icon  : '🛵',
    cat   : 'Transportasi Umum',
    ef    : 112,
    desc  : 'Motor ojol + emisi idle saat menunggu penumpang',
  },
  taksi: {
    label : 'Taksi',
    icon  : '🚖',
    cat   : 'Transportasi Umum',
    ef    : 195,
    desc  : 'Per penumpang-km, termasuk perjalanan kosong',
  },
  taksi_ev: {
    label : 'Taksi EV',
    icon  : '🟢',
    cat   : 'Transportasi Umum',
    ef    : 85,
    desc  : 'Taksi listrik, makin banyak di kota besar RI',
  },

  // --------------------------------------------------
  // KATEGORI: UDARA
  // ef dalam g CO₂e/km per penumpang
  // Sudah termasuk radiative forcing ×1.9
  // --------------------------------------------------
  pesawat_dom: {
    label : 'Pesawat Domestik',
    icon  : '✈️',
    cat   : 'Udara',
    ef    : 255,
    desc  : 'Misal Jakarta–Surabaya, sudah termasuk radiative forcing ×1.9',
  },
  pesawat_int: {
    label : 'Pesawat Internasional',
    icon  : '🛫',
    cat   : 'Udara',
    ef    : 295,
    desc  : 'Penerbangan jarak jauh, emisi makin tinggi di lapisan troposfer',
  },
  pesawat_kelas_bisnis: {
    label : 'Bisnis Class',
    icon  : '💺',
    cat   : 'Udara',
    ef    : 590,
    desc  : 'Kelas bisnis ×2 dari ekonomi karena ruang lebih luas',
  },
  helikopter: {
    label : 'Helikopter',
    icon  : '🚁',
    cat   : 'Udara',
    ef    : 480,
    desc  : 'Emisi tertinggi per penumpang-km, sangat tidak efisien',
  },

  // --------------------------------------------------
  // KATEGORI: AIR
  // ef dalam g CO₂e/km per penumpang (ferry)
  // atau per ton-km (kargo)
  // --------------------------------------------------
  kapal_ferry: {
    label : 'Kapal Ferry',
    icon  : '⛴️',
    cat   : 'Air',
    ef    : 120,
    desc  : 'Per penumpang-km, bergantung ukuran kapal & muatan',
  },
  speedboat: {
    label : 'Speedboat',
    icon  : '🚤',
    cat   : 'Air',
    ef    : 285,
    desc  : 'Mesin bensin kecepatan tinggi, sangat boros BBM',
  },
  kapal_kargo: {
    label : 'Kapal Kargo',
    icon  : '🚢',
    cat   : 'Air',
    ef    : 15,
    desc  : 'Per ton-km, kargo laut adalah moda kargo paling efisien',
  },

  // --------------------------------------------------
  // KATEGORI: HIJAU (nol emisi langsung)
  // ef = 0, tidak perlu BBM
  // --------------------------------------------------
  sepeda: {
    label : 'Sepeda',
    icon  : '🚲',
    cat   : 'Hijau 🌿',
    ef    : 0,
    desc  : 'Nol emisi langsung! Hanya tenaga manusia',
  },
  sepeda_listrik: {
    label : 'Sepeda Listrik',
    icon  : '🚴',
    cat   : 'Hijau 🌿',
    ef    : 8,
    desc  : 'Sangat rendah, tergantung grid listrik',
  },
  jalan_kaki: {
    label : 'Jalan Kaki',
    icon  : '🚶',
    cat   : 'Hijau 🌿',
    ef    : 0,
    desc  : 'Nol emisi, paling sehat untuk jarak <3 km',
  },
  skuter_manual: {
    label : 'Skuter Manual',
    icon  : '🛹',
    cat   : 'Hijau 🌿',
    ef    : 0,
    desc  : 'Nol emisi untuk jarak sangat dekat di area flat',
  },

};

// ================================================
//  FUEL_MULT — Multiplier berdasarkan jenis BBM
//
//  CARA MENAMBAH JENIS BBM BARU:
//  1. Tambah entry di sini
//  2. Tambah <option> di index.html (#fuel-select)
//
//  FIELD:
//  - mult          : pengali faktor emisi (1.0 = normal)
//  - label         : nama tampil di penjelasan formula
//  - ef_per_liter  : gram CO₂ per liter (untuk info)
// ================================================
const FUEL_MULT = {
  pertalite: {
    mult        : 1.00,
    label       : 'Pertalite RON 90',
    ef_per_liter: 2392,  // g CO₂/liter (IPCC 2006)
  },
  pertamax: {
    mult        : 0.97,
    label       : 'Pertamax RON 92',
    ef_per_liter: 2273,
  },
  pertamax_turbo: {
    mult        : 0.95,
    label       : 'Pertamax Turbo RON 98',
    ef_per_liter: 2250,
  },
  premium: {
    mult        : 1.03,
    label       : 'Premium RON 88',
    ef_per_liter: 2412,
  },
  solar: {
    mult        : 0.89,
    label       : 'Solar / B30',
    ef_per_liter: 2640,  // Diesel lebih tinggi per liter
  },
};

// ================================================
//  FUEL_USES — Kendaraan mana yang pakai BBM
//  Dipakai untuk menampilkan/menyembunyikan
//  dropdown BBM dan menerapkan FUEL_MULT
// ================================================
const FUEL_USES = [
  'motor_bebek', 'motor_sport', 'motor_besar',
  'mobil_city', 'mobil_sedan', 'mobil_suv', 'mobil_suv_besar',
  'mobil_mpv', 'pikap', 'truk_sedang',
  'bus_kota', 'busway', 'bus_antar_kota', 'angkot',
  'ojol', 'taksi',
];

// ================================================
//  SHARED_VEHICLES — Kendaraan umum yang faktor
//  emisinya sudah per-penumpang, tidak dibagi lagi
// ================================================
const SHARED_VEHICLES = [
  'bus_kota', 'busway', 'bus_antar_kota', 'angkot',
  'kereta_komuter', 'kereta_jarak_jauh', 'mrt',
  'kapal_ferry', 'kapal_kargo',
];

// ================================================
//  NO_PASSENGER — Kendaraan 1 orang saja,
//  slider penumpang disembunyikan
// ================================================
const NO_PASSENGER = [
  'motor_bebek', 'motor_sport', 'motor_besar',
  'motor_listrik', 'sepeda', 'sepeda_listrik',
  'jalan_kaki', 'skuter_manual', 'ojol',
];

// ================================================
//  FREQ_DATA — Multiplier frekuensi perjalanan
//
//  CARA MENAMBAH FREKUENSI BARU:
//  1. Tambah entry di sini
//  2. Tambah <button data-freq="key"> di index.html
//
//  FIELD:
//  - mult       : total pengali jarak
//                 (misal PP = 2× jarak sekali)
//  - label      : nama tampil di riwayat
//  - annualMult : berapa kali dalam setahun
//                 (untuk estimasi tahunan)
// ================================================
const FREQ_DATA = {
  sekali: {
    mult      : 1,
    label     : 'Sekali jalan',
    annualMult: 52,   // asumsi 1× seminggu jika disetahunkan
  },
  pp: {
    mult      : 2,
    label     : 'Pergi-Pulang (PP)',
    annualMult: 26,
  },
  harian: {
    mult      : 22,   // 22 hari kerja per bulan
    label     : 'Harian (22 hari/bulan)',
    annualMult: 12,
  },
  mingguan: {
    mult      : 52,
    label     : 'Mingguan (52×/tahun)',
    annualMult: 1,
  },
  bulanan: {
    mult      : 12,
    label     : 'Bulanan (12×/tahun)',
    annualMult: 1,
  },
};
