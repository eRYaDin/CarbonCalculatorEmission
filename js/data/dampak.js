// ================================================
//  js/data/dampak.js
//  Data kartu dampak lingkungan yang ditampilkan
//  setelah kalkulasi, berdasarkan level emisi
//
//  FIELD PER ENTRY:
//  - icon    : emoji dampak
//  - title   : judul kartu (singkat)
//  - desc    : penjelasan 1–2 kalimat
//  - color   : warna strip atas kartu
//  - detail  : konten expand "Baca Selengkapnya"
//              berisi penjelasan ilmiah, data angka,
//              hubungan ke emisi user, dan proyeksi
// ================================================

const IMPACTS = {

  // --------------------------------------------------
  // LEVEL: RENDAH (< 20 kg CO₂e)
  // --------------------------------------------------
  low: [
    {
      icon  : '🌿',
      title : 'Dampak Minimal',
      desc  : 'Emisimu sangat rendah — setara yang diserap 1 pohon dalam 1–2 hari. Pertahankan gaya hidup ini!',
      color : 'ic-yellow',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p>Satu pohon tropis dewasa menyerap rata-rata <strong>22 kg CO₂/tahun</strong> (sekitar 60 gram/hari). Emisi di bawah 20 kg tergolong sangat rendah dan mudah dikompensasi oleh vegetasi alami.</p><h4>📊 Data & Angka</h4><p>Rata-rata emisi harian orang Indonesia sekitar <strong>5.5 kg CO₂e</strong> (2 ton/tahun ÷ 365 hari). Emisimu di bawah angka ini — kamu bagian dari solusi!</p><h4>🌍 Proyeksi Global</h4><p>Jika semua 8 miliar manusia memiliki pola emisi serendah ini, total emisi global bisa turun <strong>60–70%</strong> dan target Paris Agreement 1.5°C bisa tercapai.</p>',
    },
    {
      icon  : '💧',
      title : 'Minim Polusi Air',
      desc  : 'Gas buang rendah berarti lebih sedikit deposisi asam ke sumber air, tanah, dan ekosistem sungai.',
      color : 'ic-blue',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p>Pembakaran bahan bakar fosil menghasilkan <strong>SO₂ dan NOx</strong> yang bereaksi dengan uap air di atmosfer membentuk hujan asam (pH < 5.6). Emisi rendah = kontribusi minimal terhadap deposisi asam.</p><h4>📊 Data & Angka</h4><p>Indonesia memiliki <strong>6% cadangan air tawar dunia</strong>. Setiap pengurangan polusi udara membantu menjaga kualitas 5.590 sungai dan 840 danau di seluruh Indonesia.</p><h4>🌍 Proyeksi Global</h4><p>Jika emisi transportasi turun 50%, kasus kontaminasi air hujan oleh asam sulfat bisa berkurang <strong>35–40%</strong> di perkotaan Asia Tenggara.</p>',
    },
    {
      icon  : '😊',
      title : 'Udara Lebih Bersih',
      desc  : 'Kadar partikel PM2.5, NOx, dan HC tetap rendah di sekitar area aktivitasmu. Bagus untuk kesehatan!',
      color : 'ic-yellow',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p>PM2.5 (partikel berdiameter < 2.5 mikron) bisa menembus paru-paru hingga ke aliran darah. WHO merekomendasikan batas aman <strong>5 µg/m³ (tahunan)</strong>, namun Jakarta rata-rata <strong>33 µg/m³</strong>.</p><h4>📊 Data & Angka</h4><p>Polusi udara menyebabkan <strong>6.7 juta kematian prematur per tahun</strong> secara global (WHO, 2023). Di Indonesia, angkanya mencapai <strong>90.000+ kematian/tahun</strong>.</p><h4>🌍 Proyeksi Global</h4><p>Penurunan emisi kendaraan sebesar 30% di kota besar Indonesia bisa menyelamatkan <strong>15.000–20.000 nyawa per tahun</strong>.</p>',
    },
    {
      icon  : '🌱',
      title : 'Jejak Karbon Kecil',
      desc  : 'Emisimu jauh di bawah rata-rata orang Indonesia (2 ton/tahun). Kamu bagian dari solusi!',
      color : 'ic-yellow',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p>Carbon budget untuk membatasi pemanasan 1.5°C tersisa sekitar <strong>400 GtCO₂</strong> (IPCC AR6). Dengan populasi 8 miliar, jatah per orang sekitar <strong>50 ton seumur hidup</strong> — atau ~1.1 ton/tahun selama 45 tahun produktif.</p><h4>📊 Data & Angka</h4><p>Emisi per kapita Indonesia: <strong>2 ton CO₂e/tahun</strong>. Bandingkan: AS = 15 ton, Qatar = 37 ton, India = 1.9 ton. Aktivitasmu masih jauh di bawah rata-rata nasional.</p><h4>🌍 Proyeksi Global</h4><p>Indonesia menargetkan penurunan emisi <strong>31.89% (tanpa bantuan)</strong> dan <strong>43.2% (dengan bantuan internasional)</strong> pada 2030 melalui NDC yang diperbarui.</p>',
    },
  ],

  // --------------------------------------------------
  // LEVEL: SEDANG (20 – 100 kg CO₂e)
  // --------------------------------------------------
  medium: [
    {
      icon  : '🌡️',
      title : 'Berkontribusi ke Pemanasan Global',
      desc  : 'Emisi CO₂ ini turut mendorong kenaikan suhu rata-rata bumi. Setiap gram CO₂ yang ditambah ke atmosfer bertahan hingga 100 tahun.',
      color : 'ic-orange',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p>CO₂ menyerap dan memancarkan kembali radiasi inframerah, menciptakan efek rumah kaca. Konsentrasi CO₂ atmosfer kini <strong>421 ppm</strong> — tertinggi dalam <strong>800.000 tahun</strong> terakhir (IPCC AR6).</p><h4>📊 Data & Angka</h4><p>Suhu rata-rata bumi sudah naik <strong>+1.1°C</strong> dari era pra-industri. Setiap <strong>500 GtCO₂</strong> tambahan memicu kenaikan ~0.27°C. Emisimu berkontribusi pada tren ini.</p><h4>🌍 Proyeksi Global</h4><p>Jika 280 juta penduduk Indonesia masing-masing menghasilkan emisi seperti ini setiap hari, total emisi nasional naik <strong>2–3 kali lipat</strong> dari level saat ini, melampaui komitmen Paris Agreement.</p>',
    },
    {
      icon  : '😷',
      title : 'Polusi Udara Lokal',
      desc  : 'Gas buang menghasilkan PM2.5, NOx, dan senyawa HC — berbahaya bagi paru-paru, jantung, dan sistem imun, terutama bagi anak-anak dan lansia.',
      color : 'ic-red',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p>Pembakaran tidak sempurna BBM menghasilkan <strong>PM2.5, CO, NOx, VOC, dan benzena</strong>. PM2.5 memicu inflamasi paru-paru, menembus ke darah, dan meningkatkan risiko kanker paru <strong>20–30%</strong>.</p><h4>📊 Data & Angka</h4><p>Jakarta menduduki peringkat <strong>ke-3 kota paling berpolusi</strong> di Asia Tenggara (IQAir 2023). Paparan PM2.5 jangka panjang mengurangi harapan hidup rata-rata <strong>1.2 tahun</strong> di Indonesia.</p><h4>🌍 Proyeksi Global</h4><p>7 juta kematian prematur/tahun akibat polusi udara (WHO). Pengurangan emisi transportasi 30% bisa menurunkan kadar PM2.5 hingga <strong>15–25%</strong> di perkotaan.</p>',
    },
    {
      icon  : '🌊',
      title : 'Cuaca Makin Ekstrem',
      desc  : 'Akumulasi CO₂ di atmosfer memperkuat pola cuaca ekstrem: banjir lebih dahsyat, kekeringan lebih panjang, dan badai lebih intens.',
      color : 'ic-blue',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p>Pemanasan global meningkatkan evaporasi dan kandungan uap air atmosfer (<strong>+7% per 1°C</strong> — hukum Clausius-Clapeyron), memicu curah hujan ekstrem dan siklus kekeringan-banjir yang lebih intens.</p><h4>📊 Data & Angka</h4><p>Frekuensi bencana iklim di Indonesia meningkat <strong>3× lipat</strong> dalam 20 tahun terakhir (BNPB). Tahun 2023 terjadi <strong>5.400+ bencana hidrometeorologi</strong> di seluruh Indonesia.</p><h4>🌍 Proyeksi Global</h4><p>Pada pemanasan +2°C, intensitas hujan ekstrem di Asia Tenggara diprediksi naik <strong>14–20%</strong>, dan frekuensi kekeringan parah meningkat <strong>2× lipat</strong>.</p>',
    },
    {
      icon  : '🌲',
      title : 'Tekanan pada Ekosistem',
      desc  : 'Perubahan iklim memaksa spesies bermigrasi keluar habitat aslinya, meningkatkan risiko kepunahan dan mengganggu rantai makanan.',
      color : 'ic-yellow',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p>Perubahan suhu dan pola curah hujan menggeser zona iklim <strong>~17 km/dekade ke arah kutub</strong> dan <strong>~11 meter ke atas</strong> per dekade di pegunungan. Banyak spesies tidak bisa beradaptasi secepat ini.</p><h4>📊 Data & Angka</h4><p>Indonesia adalah negara <strong>megabiodiversitas #2 dunia</strong> dengan 17.000+ spesies endemik. Perubahan iklim mengancam <strong>25% spesies</strong> dengan kepunahan di abad ini (IPBES, 2019).</p><h4>🌍 Proyeksi Global</h4><p>Pada skenario +3°C, diproyeksikan <strong>30–50% spesies darat</strong> kehilangan lebih dari setengah habitat mereka, menyebabkan kepunahan massal keenam.</p>',
    },
  ],

  // --------------------------------------------------
  // LEVEL: TINGGI (> 100 kg CO₂e)
  // --------------------------------------------------
  high: [
    {
      icon  : '🔥',
      title : 'Kontribusi Sangat Besar!',
      desc  : 'Emisi ini setara menyalakan kompor gas 8 jam per hari selama sebulan penuh. Perlu segera diimbangi dengan perubahan nyata.',
      color : 'ic-red',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p>100+ kg CO₂e dalam satu aktivitas setara dengan emisi <strong>5% populasi bumi</strong> dalam sehari. Ini melebihi batas karbon harian yang diperlukan untuk skenario 1.5°C (sekitar <strong>3 kg CO₂e/hari/orang</strong>).</p><h4>📊 Data & Angka</h4><p>Untuk menyerap 100 kg CO₂, dibutuhkan <strong>5 pohon dewasa</strong> bekerja selama <strong>1 tahun penuh</strong>. Atau setara mengemudi <strong>400 km</strong> dengan mobil bensin.</p><h4>🌍 Proyeksi Global</h4><p>Jika 280 juta orang Indonesia berpola seperti ini setiap hari, total emisi nasional bisa mencapai <strong>10+ miliar ton CO₂/tahun</strong> — melebihi emisi gabungan AS dan EU.</p>',
    },
    {
      icon  : '🏥',
      title : 'Risiko Kesehatan Tinggi',
      desc  : 'Paparan NO₂ dan PM2.5 jangka panjang meningkatkan risiko asma, PPOK, stroke, dan penyakit jantung koroner secara signifikan.',
      color : 'ic-red',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p>NO₂ merusak jaringan paru-paru dan meningkatkan kerentanan infeksi saluran pernapasan. Paparan PM2.5 > 35 µg/m³ meningkatkan risiko <strong>stroke +15%</strong>, <strong>serangan jantung +20%</strong>, dan <strong>PPOK +25%</strong>.</p><h4>📊 Data & Angka</h4><p>Biaya kesehatan akibat polusi udara di Indonesia mencapai <strong>Rp 200+ triliun/tahun</strong> (World Bank). Anak-anak yang tumbuh di area berpolusi tinggi kehilangan <strong>5–10% kapasitas paru-paru</strong>.</p><h4>🌍 Proyeksi Global</h4><p>WHO memperkirakan <strong>99% populasi dunia</strong> menghirup udara yang melebihi batas pedoman kualitas udara. Pengurangan emisi secara drastis bisa mencegah <strong>2.4 juta kematian/tahun</strong>.</p>',
    },
    {
      icon  : '🌍',
      title : 'Mendorong Krisis Iklim',
      desc  : 'Jika semua orang di bumi berpola seperti ini setiap hari, suhu global bisa naik lebih dari 3°C sebelum 2100 — melampaui ambang batas bencana.',
      color : 'ic-orange',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p>Pada skenario +3°C, terjadi <strong>tipping points</strong> yang tidak bisa dikembalikan: pencairan es Greenland (kenaikan air laut +7m), runtuhnya hutan Amazon, dan pelepasan metana dari permafrost Arktik.</p><h4>📊 Data & Angka</h4><p>Carbon budget untuk 1.5°C hanya tersisa <strong>~400 GtCO₂</strong> (sekitar 10 tahun di laju emisi saat ini). Untuk 2°C, tersisa ~1.150 GtCO₂. Emisi global saat ini: <strong>~40 GtCO₂/tahun</strong>.</p><h4>🌍 Proyeksi Global</h4><p>Pada +3°C: permukaan laut naik <strong>0.5–1 meter</strong> pada 2100, mengancam <strong>680 juta</strong> penduduk pesisir — termasuk Jakarta, Semarang, dan Surabaya yang rawan rob.</p>',
    },
    {
      icon  : '🐟',
      title : 'Asidifikasi Laut',
      desc  : 'CO₂ yang terlarut dalam air laut menurunkan pH, melemahkan cangkang moluska dan terumbu karang, mengancam 25% kehidupan laut.',
      color : 'ic-blue',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p>Laut menyerap <strong>~30% CO₂</strong> yang diemisikan manusia. CO₂ bereaksi dengan air laut membentuk asam karbonat (H₂CO₃), menurunkan pH laut dari <strong>8.2 → 8.1</strong> sejak era industri — ini perubahan <strong>26%</strong> keasaman.</p><h4>📊 Data & Angka</h4><p>Indonesia memiliki <strong>51.000 km²</strong> terumbu karang (17.5% dunia). Terumbu karang menyokong kehidupan <strong>25% spesies laut</strong> dan mata pencaharian <strong>6 juta nelayan</strong> Indonesia.</p><h4>🌍 Proyeksi Global</h4><p>Pada skenario +2°C, <strong>99% terumbu karang</strong> terancam bleaching parah. Jika terus berlanjut, kerugian ekonomi sektor perikanan global bisa mencapai <strong>$10 miliar/tahun</strong>.</p>',
    },
    {
      icon  : '🌾',
      title : 'Ancaman Ketahanan Pangan',
      desc  : 'Suhu naik dan pola curah hujan berubah diprediksi mengurangi hasil panen global hingga 25% pada 2050, memperparah kerawanan pangan.',
      color : 'ic-yellow',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p>Tanaman pangan (padi, jagung, gandum) memiliki <strong>suhu optimum pertumbuhan</strong>. Setiap kenaikan 1°C di atas optimum menurunkan hasil padi <strong>10%</strong> dan gandum <strong>6%</strong> (Zhao et al., 2017).</p><h4>📊 Data & Angka</h4><p>Indonesia mengonsumsi <strong>30 juta ton beras/tahun</strong>. Perubahan iklim diprediksi menurunkan produktivitas padi Indonesia <strong>10–15%</strong> pada 2050, mengancam ketahanan pangan <strong>70 juta</strong> penduduk rentan.</p><h4>🌍 Proyeksi Global</h4><p>Pada 2050 dengan +2°C, <strong>180 juta orang</strong> tambahan akan mengalami kelaparan. Harga pangan global bisa naik <strong>20–50%</strong>, memperparah kemiskinan di negara berkembang.</p>',
    },
    {
      icon  : '💸',
      title : 'Kerugian Ekonomi',
      desc  : 'Setiap ton CO₂ menimbulkan biaya sosial (Social Cost of Carbon) sekitar $51–$185 — kerugian kesehatan, bencana, dan produktivitas yang harus ditanggung bersama.',
      color : 'ic-purple',
      detail: '<h4>🔬 Penjelasan Ilmiah</h4><p><strong>Social Cost of Carbon (SCC)</strong> mengukur total kerugian ekonomi dari 1 ton CO₂: kerusakan properti akibat bencana, biaya kesehatan, penurunan produktivitas pertanian, dan hilangnya ekosistem. Estimasi terbaru: <strong>$185/ton CO₂</strong> (EPA, 2022).</p><h4>📊 Data & Angka</h4><p>Indonesia kehilangan <strong>Rp 544 triliun/tahun</strong> akibat dampak perubahan iklim (Bappenas, 2021). Bencana iklim menyebabkan kerugian rata-rata <strong>$3.6 miliar/tahun</strong> di Asia Tenggara.</p><h4>🌍 Proyeksi Global</h4><p>Tanpa aksi mitigasi, perubahan iklim bisa memangkas <strong>10–23% PDB global</strong> pada 2100 (Swiss Re). Investasi di mitigasi iklim ($2.4 triliun/tahun) justru menghasilkan <strong>$7 triliun/tahun</strong> manfaat bersih.</p>',
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
