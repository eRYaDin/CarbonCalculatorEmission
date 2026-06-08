// ================================================
//  js/data/pustaka.js
//  Data daftar pustaka / referensi ilmiah
//  Dikelompokkan berdasarkan sektor
//
//  FIELD PER ENTRY:
//  - nama : nama sumber / organisasi
//  - desc : deskripsi singkat data yang diambil
//  - url  : link URL sumber (bisa null jika offline)
// ================================================

const PUSTAKA_DATA = [
  {
    sektor: '🚗 Transportasi',
    sumber: [
      {
        nama : 'EPA — GHG Emissions from a Typical Passenger Vehicle',
        desc : 'Faktor emisi kendaraan penumpang (mobil sedan, city car, SUV) berdasarkan jarak tempuh dan jenis bahan bakar.',
        url  : 'https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle',
      },
      {
        nama : 'IPCC Emission Factor Database (EFDB)',
        desc : 'Faktor emisi sepeda motor berbagai kapasitas mesin, termasuk motor 2-tak dan 4-tak.',
        url  : 'https://www.ipcc-nggip.iges.or.jp/EFDB/main.php',
      },
      {
        nama : 'AFDC — Alternative Fuels Data Center (U.S. DOE)',
        desc : 'Data emisi bus, angkutan umum, dan kendaraan berbahan bakar alternatif (listrik, CNG, hidrogen).',
        url  : 'https://afdc.energy.gov',
      },
      {
        nama : 'IEA — Transport Sector',
        desc : 'Data emisi truk dan kendaraan berat (heavy-duty vehicles) global serta tren dekarbonisasi transportasi.',
        url  : 'https://www.iea.org/topics/transport',
      },
    ],
  },
  {
    sektor: '⛴️ Maritim & Udara',
    sumber: [
      {
        nama : 'EMSA — European Maritime Safety Agency',
        desc : 'Faktor emisi kapal laut berdasarkan jenis kapal, bahan bakar, dan rute pelayaran.',
        url  : 'https://www.emsa.europa.eu',
      },
      {
        nama : 'IATA — International Air Transport Association',
        desc : 'Faktor emisi pesawat terbang per penumpang-kilometer, termasuk efek radiative forcing.',
        url  : 'https://www.iata.org',
      },
    ],
  },
  {
    sektor: '🏭 Industri',
    sumber: [
      {
        nama : 'IEA — Industry Sector',
        desc : 'Data emisi sektor industri global: semen, baja, aluminium, kimia, dan kertas.',
        url  : 'https://www.iea.org/topics/industry',
      },
      {
        nama : 'WRI — World Resources Institute',
        desc : 'Metodologi penghitungan GHG Protocol untuk sektor industri dan rantai pasok.',
        url  : 'https://www.wri.org',
      },
      {
        nama : 'Our World in Data — CO₂ and GHG Emissions',
        desc : 'Visualisasi dan data emisi CO₂ global per sektor, per negara, dan tren historis.',
        url  : 'https://ourworldindata.org/co2-and-greenhouse-gas-emissions',
      },
    ],
  },
  {
    sektor: '🏠 Energi & Rumah Tangga',
    sumber: [
      {
        nama : 'EIA — U.S. Energy Information Administration',
        desc : 'Data konsumsi energi rumah tangga, faktor emisi bahan bakar fosil, dan tren global.',
        url  : 'https://www.eia.gov',
      },
      {
        nama : 'Ember Energy',
        desc : 'Data intensitas emisi grid listrik per negara, termasuk tracking porsi energi terbarukan.',
        url  : 'https://ember-energy.org',
      },
    ],
  },
  {
    sektor: '📐 Metodologi Umum',
    sumber: [
      {
        nama : 'IPCC AR6 — Working Group I (2021)',
        desc : 'Laporan ilmiah iklim terbaru: skenario pemanasan global, nilai GWP100, dan carbon budget tersisa.',
        url  : 'https://www.ipcc.ch/report/ar6/wg1',
      },
      {
        nama : 'PLN Statistik 2022',
        desc : 'Intensitas emisi grid listrik Indonesia sebesar 717.7 gCO₂/kWh, digunakan untuk konversi kWh → emisi.',
        url  : null,
      },
      {
        nama : 'FAO — FAOSTAT Emissions Database',
        desc : 'Data emisi dari sektor pertanian, peternakan, dan kehutanan global.',
        url  : 'https://www.fao.org/faostat',
      },
      {
        nama : 'KLHK RI — Kementerian LHK Republik Indonesia',
        desc : 'Data emisi kehutanan, lahan gambut, dan inventarisasi gas rumah kaca nasional Indonesia.',
        url  : null,
      },
    ],
  },
];
