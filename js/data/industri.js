// ================================================
//  js/data/industri.js
//  bagian ini tuh buat data faktor emisi untuk sektor industri
//
//  Totorial biar saya inget gimana cara menambah objek baru:
//  1. Tambah entry baru di objek INDUSTRIES
//  2. Isi semua field (lihat keterangan di bawah)
//  3. Tidak perlu ubah HTML atau file JS lain
//
//  hal hal inti:
//  - label : nama tampil di tombol
//  - icon  : emoji
//  - cat   : nama kategori (header grup)
//  - ef    : faktor emisi dalam kg CO₂e per UNIT
//  - unit  : satuan produksi (ton, MWh, ekor, ha, dll)
//  - hint  : keterangan satuan (muncul di slider)
//  - desc  : penjelasan metodologi sumber data
//
//  SUMBER DATA:
//  IPCC 2006 Vol.3 IPPU · IEA Industrial Emissions
//  World Steel Association · RMI 2023 · FAO FAOSTAT
//  KLHK · PLN Statistik 2022
// ================================================

const INDUSTRIES = {

  // --------------------------------------------------
  // KATEGORI: MATERIAL
  // ef dalam kg CO₂e per ton produk
  // --------------------------------------------------
  semen: {
    label : 'Semen',
    icon  : '🏗️',
    cat   : 'Material',
    ef    : 860,      // kg CO₂e/ton semen
    unit  : 'ton',
    hint  : 'per ton semen yang diproduksi',
    desc  : 'Proses kalsinasi klinker + pembakaran batubara. Sumber: IPCC 2006 Vol.3 Ch.2',
  },
  baja: {
    label : 'Baja',
    icon  : '⚙️',
    cat   : 'Material',
    ef    : 1850,     // kg CO₂e/ton baja
    unit  : 'ton',
    hint  : 'per ton baja kasar (crude steel)',
    desc  : 'Rata-rata blast furnace route global. Sumber: World Steel Association · IEA',
  },
  baja_daur_ulang: {
    label : 'Baja Daur Ulang',
    icon  : '♻️',
    cat   : 'Material',
    ef    : 600,      // kg CO₂e/ton — jauh lebih rendah
    unit  : 'ton',
    hint  : 'per ton baja via Electric Arc Furnace',
    desc  : 'EAF dari scrap steel ~68% lebih rendah dari blast furnace. Sumber: World Steel Assoc.',
  },
  aluminium: {
    label : 'Aluminium',
    icon  : '🔩',
    cat   : 'Material',
    ef    : 11900,    // kg CO₂e/ton — sangat tinggi
    unit  : 'ton',
    hint  : 'per ton aluminium primer',
    desc  : 'Proses elektrolisis (Hall-Héroult) sangat boros listrik. Sumber: RMI 2023',
  },
  aluminium_daur_ulang: {
    label : 'Aluminium Daur Ulang',
    icon  : '♻️',
    cat   : 'Material',
    ef    : 700,      // 95% lebih rendah dari primer
    unit  : 'ton',
    hint  : 'per ton aluminium sekunder',
    desc  : 'Hemat 95% energi vs aluminium primer. Sumber: RMI Aluminum Guidance 2023',
  },
  plastik: {
    label : 'Plastik',
    icon  : '🧴',
    cat   : 'Material',
    ef    : 2850,
    unit  : 'ton',
    hint  : 'per ton plastik (PE/PP rata-rata)',
    desc  : 'Polietilen/polipropilena, proses petrokimia. Sumber: IPCC 2006 Vol.3',
  },
  kertas: {
    label : 'Kertas',
    icon  : '📄',
    cat   : 'Material',
    ef    : 1090,
    unit  : 'ton',
    hint  : 'per ton kertas kraft',
    desc  : 'Produksi kertas termasuk proses pulping. Sumber: IPCC 2006 · IEA',
  },
  kaca: {
    label : 'Kaca',
    icon  : '🪟',
    cat   : 'Material',
    ef    : 850,
    unit  : 'ton',
    hint  : 'per ton kaca flat/kontainer',
    desc  : 'Peleburan silika + bahan aditif. Sumber: IPCC 2006 IPPU',
  },
  bata_beton: {
    label : 'Bata/Beton',
    icon  : '🧱',
    cat   : 'Material',
    ef    : 220,
    unit  : 'ton',
    hint  : 'per ton produk bata/beton jadi',
    desc  : 'Campuran semen, pasir, agregat. Emisi dari binder semen.',
  },

  // --------------------------------------------------
  // KATEGORI: ENERGI
  // ef beragam: per ton BBM, per MWh listrik
  // --------------------------------------------------
  bbm_kilang: {
    label : 'Kilang BBM',
    icon  : '🛢️',
    cat   : 'Energi',
    ef    : 430,      // kg CO₂e/ton minyak mentah diolah
    unit  : 'ton',
    hint  : 'per ton minyak mentah yang diolah',
    desc  : 'Emisi proses penyulingan minyak mentah. Sumber: IPCC 2006 Vol.2 Energy',
  },
  batubara_tambang: {
    label : 'Tambang Batubara',
    icon  : '⛏️',
    cat   : 'Energi',
    ef    : 28,       // kg CO₂e/ton batubara (emisi fugitif)
    unit  : 'ton',
    hint  : 'per ton batubara yang ditambang',
    desc  : 'Emisi fugitif metana + peralatan tambang. Sumber: IPCC 2006 Vol.2',
  },
  pltu_batubara: {
    label : 'PLTU Batubara',
    icon  : '🏭',
    cat   : 'Energi',
    ef    : 1020,     // kg CO₂e/MWh listrik
    unit  : 'MWh',
    hint  : 'per MWh listrik yang dibangkitkan',
    desc  : 'Pembangkit listrik batubara Indonesia rata-rata. Sumber: PLN Statistik 2022',
  },
  pltg_gas: {
    label : 'PLTG/PLTGU Gas',
    icon  : '💨',
    cat   : 'Energi',
    ef    : 490,      // kg CO₂e/MWh
    unit  : 'MWh',
    hint  : 'per MWh listrik dari gas alam',
    desc  : 'Gas alam combined cycle, lebih bersih dari batubara. Sumber: IPCC 2006',
  },
  plts_surya: {
    label : 'PLTS Surya',
    icon  : '☀️',
    cat   : 'Energi',
    ef    : 48,       // kg CO₂e/MWh (life-cycle)
    unit  : 'MWh',
    hint  : 'per MWh listrik (life-cycle analysis)',
    desc  : 'Termasuk emisi manufaktur panel surya. Sumber: IPCC SRREN 2021',
  },

  // --------------------------------------------------
  // KATEGORI: PERTANIAN & PETERNAKAN
  // ef beragam per satuan produksi
  // --------------------------------------------------
  sawit: {
    label : 'Kelapa Sawit',
    icon  : '🌴',
    cat   : 'Pertanian',
    ef    : 3200,     // kg CO₂e/ton CPO
    unit  : 'ton',
    hint  : 'per ton Crude Palm Oil (CPO)',
    desc  : 'Termasuk emisi pembukaan lahan gambut. Sumber: KLHK · FAO · IEA',
  },
  padi: {
    label : 'Sawah Padi',
    icon  : '🌾',
    cat   : 'Pertanian',
    ef    : 1390,     // kg CO₂e/ton padi gabah kering
    unit  : 'ton',
    hint  : 'per ton padi gabah kering (GKG)',
    desc  : 'Metana sawah tergenang + N₂O dari pupuk. Sumber: IPCC 2006 Vol.4 Ch.10',
  },
  sapi_perah: {
    label : 'Sapi Perah',
    icon  : '🐄',
    cat   : 'Peternakan',
    ef    : 27,       // kg CO₂e/ekor/tahun (enteric fermentation)
    unit  : 'ekor',
    hint  : 'per ekor sapi per tahun',
    desc  : 'Fermentasi enterik (CH₄) + manure management. Sumber: IPCC 2006 Vol.4 Ch.10',
  },
  sapi_potong: {
    label : 'Sapi Potong',
    icon  : '🥩',
    cat   : 'Peternakan',
    ef    : 22,
    unit  : 'ekor',
    hint  : 'per ekor sapi potong per tahun',
    desc  : 'Fermentasi enterik rata-rata sapi potong tropis. Sumber: IPCC · FAO FAOSTAT',
  },
  ayam: {
    label : 'Ayam Broiler',
    icon  : '🐔',
    cat   : 'Peternakan',
    ef    : 6,        // kg CO₂e/kg daging ayam
    unit  : 'ton',
    hint  : 'per ton daging ayam hidup',
    desc  : 'Jauh lebih rendah dari sapi. Sumber: FAO FAOSTAT · Our World in Data',
  },
  babi: {
    label : 'Babi',
    icon  : '🐖',
    cat   : 'Peternakan',
    ef    : 12,
    unit  : 'ekor',
    hint  : 'per ekor babi per tahun',
    desc  : 'Fermentasi + manure. Sumber: IPCC 2006 Vol.4',
  },

  // --------------------------------------------------
  // KATEGORI: LAHAN & LIMBAH
  // --------------------------------------------------
  deforestasi: {
    label : 'Deforestasi',
    icon  : '🌳',
    cat   : 'Lahan',
    ef    : 400000,   // kg CO₂e/hektar
    unit  : 'ha',
    hint  : 'per hektar hutan tropis yang dibuka',
    desc  : 'Emisi biomassa di atas + bawah tanah hutan tropis. Sumber: FAO Climate & Forests',
  },
  gambut_drainase: {
    label : 'Drainase Gambut',
    icon  : '🌿',
    cat   : 'Lahan',
    ef    : 19000,    // kg CO₂e/ha/tahun
    unit  : 'ha',
    hint  : 'per hektar gambut yang didrainase per tahun',
    desc  : 'Oksidasi gambut setelah drainase, terus-menerus. Sumber: IPCC 2014 Wetlands',
  },
  tpa_sampah: {
    label : 'TPA Sampah',
    icon  : '🗑️',
    cat   : 'Limbah',
    ef    : 500,      // kg CO₂e/ton sampah
    unit  : 'ton',
    hint  : 'per ton sampah yang masuk TPA',
    desc  : 'Metana dari dekomposisi anaerobik organik (FOD method). Sumber: IPCC 2006 Vol.5',
  },
  pengolahan_limbah: {
    label : 'IPAL Limbah Cair',
    icon  : '💧',
    cat   : 'Limbah',
    ef    : 3,        // kg CO₂e/m³ limbah cair
    unit  : 'm³',
    hint  : 'per m³ air limbah yang diolah',
    desc  : 'Emisi CH₄ dan N₂O dari proses biologis. Sumber: IPCC 2006 Vol.5 Ch.6',
  },

};
