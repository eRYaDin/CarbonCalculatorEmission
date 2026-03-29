// ================================================
//  js/data/rumah.js
//  Faktor emisi dan konstanta untuk sektor
//  rumah tangga / bangunan
//
//  CARA MENAMBAH ITEM BARU (misal: pemanas air):
//  1. Tambah konstanta faktor emisi di RUMAH_FACTORS
//  2. Tambah slider di index.html (sec-rumah)
//  3. Tambah ke kalkulasi di js/sectors/rumah.js
//
//  SUMBER DATA:
//  PLN Statistik 2022 (intensitas grid)
//  IPCC 2006 Vol.2 Ch.1 (LPG, gas alam)
//  IPCC 2006 Vol.5 (limbah padat)
//  Climatiq/IEA Emission Factors Indonesia
// ================================================

const RUMAH_FACTORS = {

  // --------------------------------------------------
  // LISTRIK
  // Intensitas emisi grid PLN Indonesia 2022
  // Satuan: kg CO₂e per kWh
  // --------------------------------------------------
  listrik_per_kwh: 0.7177,        // kg CO₂e/kWh (PLN 2022)
  // Catatan: angka ini akan terus turun seiring
  // transisi ke energi terbarukan. Update berkala.

  // --------------------------------------------------
  // LPG (Liquefied Petroleum Gas)
  // Satuan: kg CO₂e per kg LPG
  // --------------------------------------------------
  lpg_per_kg: 2.98,               // kg CO₂e/kg LPG
  // Sumber: IPCC 2006 Vol.2 Table 1.4

  // --------------------------------------------------
  // AC (Air Conditioner)
  // Daya rata-rata AC split 1 PK = 900 W (~1 kW)
  // Asumsi pemakaian 8 jam per hari
  // --------------------------------------------------
  ac_daya_kw      : 0.9,          // kW per unit (1 PK)
  ac_jam_per_hari : 8,            // jam pemakaian/hari
  ac_hari_per_bulan: 30,          // hari/bulan

  // --------------------------------------------------
  // SAMPAH / LIMBAH PADAT
  // Emisi metana dari TPA per kg sampah
  // Satuan: kg CO₂e per kg sampah
  // --------------------------------------------------
  sampah_per_kg: 0.5,             // kg CO₂e/kg sampah ke TPA
  // Sumber: IPCC 2006 Vol.5, FOD (First Order Decay) method
  // Asumsi: sampah campuran dengan fraksi organik ~60%

  // --------------------------------------------------
  // GAS ALAM / CNG (jika nanti ditambahkan)
  // Satuan: kg CO₂e per m³ gas alam
  // --------------------------------------------------
  gas_alam_per_m3: 2.04,          // kg CO₂e/m³ gas alam
  // Sumber: IPCC 2006 Vol.2 Table 1.4

  // --------------------------------------------------
  // PEMANAS AIR LISTRIK (jika nanti ditambahkan)
  // Daya water heater rata-rata 500W, 30 menit/hari
  // --------------------------------------------------
  water_heater_kw       : 0.5,    // kW
  water_heater_jam_per_hari: 0.5, // jam/hari

  // --------------------------------------------------
  // REFRIGERAN AC — HFC (jika nanti ditambahkan)
  // GWP refrigeran R-32 = 675, R-410A = 2088
  // Kebocoran rata-rata ~5%/tahun dari total isian
  // --------------------------------------------------
  refrigeran_isian_kg   : 0.7,    // kg per unit AC 1 PK
  refrigeran_kebocoran  : 0.05,   // 5%/tahun
  refrigeran_gwp_r32    : 675,    // GWP R-32 (makin umum)
  refrigeran_gwp_r410a  : 2088,   // GWP R-410A (lama)

};

// ================================================
//  RUMAH_DEFAULTS — Nilai default slider
//  Berdasarkan rata-rata rumah tangga Indonesia
// ================================================
const RUMAH_DEFAULTS = {
  kwh_per_bulan   : 150,    // kWh/bulan (rata-rata RI)
  lpg_per_bulan   : 3,      // kg/bulan (1 tabung 3kg)
  jumlah_ac       : 1,      // unit
  sampah_per_hari : 0.7,    // kg/hari (rata-rata RI)
};

// ================================================
//  RUMAH_SKALA — Multiplier skala waktu
//  Key = value dari <select id="rumah-time">
// ================================================
const RUMAH_SKALA = {
  1  : { label: 'Per bulan',  annualMult: 12 },
  12 : { label: 'Per tahun',  annualMult: 1  },
};
