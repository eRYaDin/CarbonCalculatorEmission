// ================================================
//  js/data/dampak.js
//  Data kartu dampak lingkungan yang ditampilkan
//  setelah kalkulasi, berdasarkan level emisi
//
//  CARA MENAMBAH / MENGUBAH DAMPAK:
//  - Tambah/edit entry di array low, medium, atau high
//  - Setiap entry adalah 1 kartu dampak
//
//  FIELD PER ENTRY:
//  - icon  : emoji dampak
//  - title : judul kartu (singkat)
//  - desc  : penjelasan 1–2 kalimat
//  - color : warna strip atas kartu
//            pilihan: ic-red, ic-orange, ic-yellow,
//                     ic-blue, ic-purple
//
//  LEVEL DITENTUKAN OLEH TOTAL EMISI (kg CO₂e):
//  - low    : < 20 kg
//  - medium : 20 – 100 kg
//  - high   : > 100 kg
// ================================================

const IMPACTS = {

  // --------------------------------------------------
  // LEVEL: RENDAH (< 20 kg CO₂e)
  // Pesan: positif, tapi tetap ajak waspada
  // --------------------------------------------------
  low: [
    {
      icon  : '🌿',
      title : 'Dampak Minimal',
      desc  : 'Emisimu sangat rendah — setara yang diserap 1 pohon dalam 1–2 hari. Pertahankan gaya hidup ini!',
      color : 'ic-yellow',
    },
    {
      icon  : '💧',
      title : 'Minim Polusi Air',
      desc  : 'Gas buang rendah berarti lebih sedikit deposisi asam ke sumber air, tanah, dan ekosistem sungai.',
      color : 'ic-blue',
    },
    {
      icon  : '😊',
      title : 'Udara Lebih Bersih',
      desc  : 'Kadar partikel PM2.5, NOx, dan HC tetap rendah di sekitar area aktivitasmu. Bagus untuk kesehatan!',
      color : 'ic-yellow',
    },
    {
      icon  : '🌱',
      title : 'Jejak Karbon Kecil',
      desc  : 'Emisimu jauh di bawah rata-rata orang Indonesia (2 ton/tahun). Kamu bagian dari solusi!',
      color : 'ic-yellow',
    },
  ],

  // --------------------------------------------------
  // LEVEL: SEDANG (20 – 100 kg CO₂e)
  // Pesan: waspada, ada kontribusi nyata
  // --------------------------------------------------
  medium: [
    {
      icon  : '🌡️',
      title : 'Berkontribusi ke Pemanasan Global',
      desc  : 'Emisi CO₂ ini turut mendorong kenaikan suhu rata-rata bumi. Setiap gram CO₂ yang ditambah ke atmosfer bertahan hingga 100 tahun.',
      color : 'ic-orange',
    },
    {
      icon  : '😷',
      title : 'Polusi Udara Lokal',
      desc  : 'Gas buang menghasilkan PM2.5, NOx, dan senyawa HC — berbahaya bagi paru-paru, jantung, dan sistem imun, terutama bagi anak-anak dan lansia.',
      color : 'ic-red',
    },
    {
      icon  : '🌊',
      title : 'Cuaca Makin Ekstrem',
      desc  : 'Akumulasi CO₂ di atmosfer memperkuat pola cuaca ekstrem: banjir lebih dahsyat, kekeringan lebih panjang, dan badai lebih intens.',
      color : 'ic-blue',
    },
    {
      icon  : '🌲',
      title : 'Tekanan pada Ekosistem',
      desc  : 'Perubahan iklim memaksa spesies bermigrasi keluar habitat aslinya, meningkatkan risiko kepunahan dan mengganggu rantai makanan.',
      color : 'ic-yellow',
    },
  ],

  // --------------------------------------------------
  // LEVEL: TINGGI (> 100 kg CO₂e)
  // Pesan: serius, perlu aksi segera
  // --------------------------------------------------
  high: [
    {
      icon  : '🔥',
      title : 'Kontribusi Sangat Besar!',
      desc  : 'Emisi ini setara menyalakan kompor gas 8 jam per hari selama sebulan penuh. Perlu segera diimbangi dengan perubahan nyata.',
      color : 'ic-red',
    },
    {
      icon  : '🏥',
      title : 'Risiko Kesehatan Tinggi',
      desc  : 'Paparan NO₂ dan PM2.5 jangka panjang meningkatkan risiko asma, PPOK, stroke, dan penyakit jantung koroner secara signifikan.',
      color : 'ic-red',
    },
    {
      icon  : '🌍',
      title : 'Mendorong Krisis Iklim',
      desc  : 'Jika semua orang di bumi berpola seperti ini setiap hari, suhu global bisa naik lebih dari 3°C sebelum 2100 — melampaui ambang batas bencana.',
      color : 'ic-orange',
    },
    {
      icon  : '🐟',
      title : 'Asidifikasi Laut',
      desc  : 'CO₂ yang terlarut dalam air laut menurunkan pH, melemahkan cangkang moluska dan terumbu karang, mengancam 25% kehidupan laut.',
      color : 'ic-blue',
    },
    {
      icon  : '🌾',
      title : 'Ancaman Ketahanan Pangan',
      desc  : 'Suhu naik dan pola curah hujan berubah diprediksi mengurangi hasil panen global hingga 25% pada 2050, memperparah kerawanan pangan.',
      color : 'ic-yellow',
    },
    {
      icon  : '💸',
      title : 'Kerugian Ekonomi',
      desc  : 'Setiap ton CO₂ menimbulkan biaya sosial (Social Cost of Carbon) sekitar $51–$185 — kerugian kesehatan, bencana, dan produktivitas yang harus ditanggung bersama.',
      color : 'ic-purple',
    },
  ],

};

// ================================================
//  Fungsi penentu level berdasarkan total emisi
//  Dipanggil dari js/main.js → calculate()
// ================================================
function getLevel(netKg) {
  if (netKg < 2)        return { key: 'low',    label: '✅ SANGAT RENDAH!', cls: 'lvl-green',  color: '#22a849' };
  if (netKg < 20)       return { key: 'low',    label: '👍 RENDAH',         cls: 'lvl-green',  color: '#22a849' };
  if (netKg < 100)      return { key: 'medium', label: '⚠️ SEDANG',         cls: 'lvl-yellow', color: '#c07800' };
  if (netKg < 500)      return { key: 'high',   label: '🔶 TINGGI!',        cls: 'lvl-orange', color: '#cc5500' };
  return                       { key: 'high',   label: '🔴 BAHAYA!!',       cls: 'lvl-red',    color: '#cc2020' };
}
