// ================================================
//  js/data/solusi.js
//  Data kartu solusi / cara menanggulangi emisi
//
//  FIELD PER ENTRY:
//  - num       : nomor urut
//  - icon      : emoji
//  - title     : judul solusi
//  - desc      : penjelasan 2–3 kalimat
//  - reduction : estimasi pengurangan emisi
//  - detail    : konten expand "Baca Selengkapnya"
//                berisi langkah praktis, estimasi
//                penghematan, contoh nyata, referensi
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
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Beli sepeda bekas berkualitas (~Rp 500rb–2jt)<br>2. Cek rute bersepeda aman via Google Maps<br>3. Mulai dari 1–2 hari/minggu, tingkatkan bertahap<br>4. Gabung komunitas pesepeda kota (Bike to Work, dll.)</p><h4>💰 Estimasi Penghematan</h4><p>Komuter 10 km/hari × 22 hari kerja = hemat <strong>Rp 300.000–500.000/bulan</strong> BBM dan <strong>~48 kg CO₂/bulan</strong>.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Jakarta punya jalur sepeda <strong>63 km</strong> (MRT corridor). Bandung, Yogya, dan Solo makin ramah pesepeda dengan <em>bike sharing</em> Gowes, Boseh, dll.</p><h4>📚 Referensi</h4><p>ECF (2011). <em>Cycle More Often To Cool Down The Planet.</em></p>',
  },
  {
    num       : 2,
    icon      : '🚆',
    title     : 'Naik Transportasi Umum',
    desc      : 'KRL dan MRT menghasilkan 7× lebih sedikit emisi per penumpang dibanding mobil pribadi. Gunakan untuk komuter harian jika tersedia di kotamu.',
    reduction : 'Hemat 70–85% emisi',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Download aplikasi (KRL Access, MRT Jakarta, Tije)<br>2. Beli kartu multi-trip untuk diskon 10–25%<br>3. Rencanakan rute gabungan KRL + feeder bus<br>4. Pakai e-wallet untuk tap-in/out lebih cepat</p><h4>💰 Estimasi Penghematan</h4><p>Komuter mobil Bogor–Jakarta: Rp 100rb/hari (BBM+tol). KRL: Rp 6.000. Hemat <strong>Rp 2 juta+/bulan</strong> dan <strong>~120 kg CO₂</strong>.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>KRL Jabodetabek melayani <strong>1 juta penumpang/hari</strong>. MRT Jakarta fase 2 akan menjangkau Kota Tua. TransJakarta <strong>1.2 juta penumpang/hari</strong>.</p><h4>📚 Referensi</h4><p>IEA (2023). <em>Transport Sector CO₂ Emissions.</em></p>',
  },
  {
    num       : 3,
    icon      : '🤝',
    title     : 'Carpooling (Berbagi Tumpangan)',
    desc      : 'Isi 4 kursi mobilmu! Emisi per orang langsung turun 75%. Ajak rekan kantor, gunakan aplikasi nebeng, atau atur jadwal bareng tetangga.',
    reduction : 'Hemat 50–75% per orang',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Ajak 2–3 rekan kantor satu arah<br>2. Gunakan aplikasi seperti Nebeng atau grup WhatsApp RT<br>3. Buat jadwal giliran mengemudi mingguan<br>4. Patungan biaya BBM dan tol secara adil</p><h4>💰 Estimasi Penghematan</h4><p>Mobil 4 orang vs 4 mobil sendiri: hemat <strong>75% BBM</strong>, <strong>75% biaya parkir</strong>, dan <strong>75% emisi</strong>. Setara ~Rp 1.5 juta/bulan per orang.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Di Jabodetabek, rata-rata <strong>1.2 orang per mobil</strong>. Jika naik jadi 3, volume kendaraan turun <strong>60%</strong> dan kemacetan berkurang drastis.</p><h4>📚 Referensi</h4><p>EPA (2023). <em>GHG Emissions from Passenger Vehicles.</em></p>',
  },
  {
    num       : 4,
    icon      : '⚡',
    title     : 'Beralih ke Kendaraan Listrik',
    desc      : 'Motor listrik menghasilkan 60% lebih sedikit emisi dari motor bensin di grid PLN saat ini, dan akan terus membaik seiring naiknya porsi EBT.',
    reduction : 'Hemat 40–65% emisi',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Riset motor/mobil listrik sesuai budget dan jarak harian<br>2. Cek ketersediaan SPKLU di rute komuter<br>3. Manfaatkan insentif pemerintah (diskon PPnBM, subsidi)<br>4. Pasang home charger (~Rp 3–5 juta)</p><h4>💰 Estimasi Penghematan</h4><p>Motor listrik: Rp 60–80/km vs bensin Rp 250–400/km. Hemat <strong>Rp 500.000–1 juta/bulan</strong>. Biaya perawatan <strong>70% lebih murah</strong> (tanpa oli, busi, filter).</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Penjualan motor listrik naik <strong>200%</strong> di 2023. Merek lokal: Alva, Selis, United. SPKLU PLN sudah <strong>500+ titik</strong> di Jawa.</p><h4>📚 Referensi</h4><p>AFDC (2023). <em>Electric Vehicle Emissions.</em></p>',
  },
  {
    num       : 5,
    icon      : '💻',
    title     : 'Work From Home (WFH)',
    desc      : 'WFH hanya 2 hari per minggu sudah bisa memangkas 40% emisi komuter tahunanmu secara instan tanpa biaya apapun.',
    reduction : 'Hemat 40% emisi komuter',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Diskusi kebijakan WFH dengan atasan<br>2. Siapkan workspace produktif di rumah<br>3. Jadwalkan WFH di hari dengan mobilitas rendah<br>4. Gunakan video call untuk meeting yang tidak perlu tatap muka</p><h4>💰 Estimasi Penghematan</h4><p>WFH 2 hari/minggu: hemat <strong>~100 hari komuter/tahun</strong> = <strong>Rp 5–10 juta BBM</strong> + <strong>~1 ton CO₂</strong>. Plus waktu 2 jam/hari yang bisa dimanfaatkan lebih produktif.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Survei BPS 2023: <strong>35% pekerja</strong> di sektor jasa bisa WFH parsial. Korporasi besar (Telkom, Bank Mandiri) sudah menerapkan kebijakan hybrid working.</p><h4>📚 Referensi</h4><p>Global Workplace Analytics (2023). <em>Latest Telecommuting/WFH Statistics.</em></p>',
  },
  {
    num       : 6,
    icon      : '🛞',
    title     : 'Eco-driving Technique',
    desc      : 'Jaga kecepatan konstan 60–80 km/jam, hindari akselerasi mendadak, cek tekanan ban rutin, dan matikan mesin saat idle >30 detik.',
    reduction : 'Hemat 15–20% BBM',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Akselerasi perlahan, jangan injak gas dalam-dalam<br>2. Jaga kecepatan 60–80 km/jam di jalan tol<br>3. Cek tekanan ban tiap 2 minggu (ban kempes +3% BBM)<br>4. Matikan AC saat cuaca sejuk, buka jendela di kota</p><h4>💰 Estimasi Penghematan</h4><p>Penerapan eco-driving konsisten: hemat <strong>Rp 200.000–400.000/bulan</strong> BBM untuk komuter harian 30 km. Ban tepat tekanan hemat tambahan <strong>3% BBM</strong>.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Program Smart Driving Pertamina sudah melatih <strong>10.000+ pengemudi</strong> teknik eco-driving. Rata-rata penghematan peserta: <strong>18% BBM</strong>.</p><h4>📚 Referensi</h4><p>IEA (2023). <em>Fuel Economy in Major Car Markets.</em></p>',
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
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Audit rantai pasok untuk identifikasi material yang bisa diganti recycled<br>2. Jalin kemitraan dengan pengepul scrap bersertifikat<br>3. Investasi di fasilitas sorting dan pre-processing<br>4. Sertifikasi produk recycled content (ISO 14021)</p><h4>💰 Estimasi Penghematan</h4><p>Aluminium daur ulang: hemat <strong>95% energi</strong> (~14 kWh/kg → 0.7 kWh/kg). Baja dari scrap: hemat <strong>68% energi dan 1.26 ton CO₂/ton baja</strong>.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>PT Krakatau Steel menggunakan <strong>30% scrap</strong> dalam produksi. Target nasional recycling rate: <strong>50% pada 2030</strong> (KLHK).</p><h4>📚 Referensi</h4><p>WRI (2023). <em>GHG Protocol for Industrial Processes.</em></p>',
  },
  {
    num       : 2,
    icon      : '⚡',
    title     : 'Elektrifikasi Proses Industri',
    desc      : 'Ganti pemanas berbahan bakar fosil dengan pemanas listrik dari EBT. Gunakan heat pump industri yang 3–5× lebih efisien dari pemanas konvensional.',
    reduction : 'Hemat 40–80% emisi proses',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Audit kebutuhan panas dan klasifikasi suhu (rendah/menengah/tinggi)<br>2. Heat pump untuk proses <150°C (pengeringan, pasteurisasi)<br>3. Electric arc furnace untuk peleburan logam<br>4. Pasang PLTS atap pabrik untuk sumber listrik sendiri</p><h4>💰 Estimasi Penghematan</h4><p>Heat pump industri: COP 3–5 berarti <strong>3–5× lebih efisien</strong> dari pemanas gas. ROI rata-rata <strong>3–5 tahun</strong>. PLTS atap pabrik: payback <strong>4–6 tahun</strong>.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Pabrik Unilever Cikarang sudah <strong>100% listrik EBT</strong>. Danone-AQUA memasang PLTS <strong>2 MWp</strong> di pabrik Klaten.</p><h4>📚 Referensi</h4><p>IEA (2023). <em>Industry Sector Energy Efficiency.</em></p>',
  },
  {
    num       : 3,
    icon      : '🌡️',
    title     : 'Audit & Efisiensi Energi Pabrik',
    desc      : 'Pasang Variable Frequency Drive (VFD) di motor listrik, optimalkan sistem uap, perbaiki insulasi, dan monitor konsumsi energi real-time.',
    reduction : 'Hemat 20–30% energi pabrik',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Lakukan audit energi oleh konsultan bersertifikat ESCO<br>2. Pasang VFD di semua motor listrik >5 kW<br>3. Perbaiki insulasi pipa uap (rugi 5–10% jika bocor)<br>4. Implementasi sistem monitoring energi IoT real-time</p><h4>💰 Estimasi Penghematan</h4><p>VFD di motor pompa: hemat <strong>25–50% listrik</strong>. Insulasi pipa uap: hemat <strong>Rp 50–200 juta/tahun</strong> per pabrik menengah. ROI rata-rata <strong>1–2 tahun</strong>.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Program ESCO Kementerian ESDM sudah mengaudit <strong>500+ pabrik</strong>. Rata-rata temuan penghematan: <strong>15–25%</strong> konsumsi energi.</p><h4>📚 Referensi</h4><p>Kementerian ESDM (2022). <em>Pedoman Audit Energi Industri.</em></p>',
  },
  {
    num       : 4,
    icon      : '🌿',
    title     : 'Carbon Capture & Storage (CCS)',
    desc      : 'Teknologi penangkapan CO₂ langsung dari cerobong pabrik semen dan baja sudah mulai diimplementasikan. Potensial menangkap hingga 90% emisi proses.',
    reduction : 'Tangkap hingga 90% emisi',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Studi kelayakan CCS untuk fasilitas dengan emisi >100.000 ton CO₂/tahun<br>2. Evaluasi geological storage di cekungan sedimen terdekat<br>3. Kolaborasi dengan Pertamina/SKK Migas untuk injeksi CO₂ ke sumur depleted<br>4. Ajukan insentif pemerintah (PP 98/2021 tentang pajak karbon)</p><h4>💰 Estimasi Penghematan</h4><p>Biaya CCS: <strong>$40–100/ton CO₂</strong>. Dengan harga karbon >$50, CCS mulai ekonomis. Indonesia berpotensi menyimpan <strong>23.4 GtCO₂</strong> di bawah tanah.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Proyek CCS Gundih (Pertamina-JCCS) di Cepu sudah injeksi <strong>30 ton CO₂/hari</strong>. Target nasional CCS: <strong>300 MtCO₂</strong> pada 2060.</p><h4>📚 Referensi</h4><p>IPCC AR6 (2021). <em>Chapter 12: Cross-Sectoral Perspectives.</em></p>',
  },
  {
    num       : 5,
    icon      : '🔄',
    title     : 'Desain Circular Economy',
    desc      : 'Rancang produk agar bisa diperbaiki, diperbarui, dan didaur ulang — bukan langsung dibuang. Perpanjang umur produk = kurangi emisi manufaktur.',
    reduction : 'Hemat 30–50% jangka panjang',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Desain produk modular agar komponen bisa diganti individual<br>2. Gunakan material yang mudah dipisahkan saat daur ulang<br>3. Sediakan layanan repair dan refurbishment<br>4. Terapkan sistem take-back untuk produk end-of-life</p><h4>💰 Estimasi Penghematan</h4><p>Ekonomi sirkular bisa menghemat <strong>$4.5 triliun/tahun</strong> secara global (Ellen MacArthur Foundation). Perpanjang umur produk 2× = hemat <strong>~50% emisi manufaktur</strong>.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Pabrik Aqua menerapkan <strong>bottle-to-bottle recycling</strong>. Bukalapak dan Tokopedia punya fitur jual-beli barang bekas. Startup DaUR mengelola sampah <strong>500 ton/bulan</strong> di Jabodetabek.</p><h4>📚 Referensi</h4><p>Ellen MacArthur Foundation (2023). <em>The Circular Economy in Detail.</em></p>',
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
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Cek kesesuaian atap (arah selatan/barat, minim bayangan)<br>2. Pilih installer bersertifikat ESDM<br>3. Kapasitas 2–3 kWp untuk rumah tangga standar<br>4. Daftar PLN Net Metering untuk jual kelebihan listrik</p><h4>💰 Estimasi Penghematan</h4><p>PLTS 2 kWp: investasi <strong>Rp 20–30 juta</strong>. Hemat <strong>Rp 300.000–500.000/bulan</strong>. Payback <strong>5–7 tahun</strong>, umur panel <strong>25+ tahun</strong>. Total saving: <strong>Rp 80–100 juta</strong>.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Program <strong>PLTS Atap 1 Juta</strong> pemerintah. Di Bali sudah terpasang <strong>5.000+ unit</strong> rooftop solar. Kredit PLTS tersedia di bank BRI dan BCA.</p><h4>📚 Referensi</h4><p>ESDM RI (2022). <em>Permen ESDM No. 26/2021 tentang PLTS Atap.</em></p>',
  },
  {
    num       : 2,
    icon      : '💡',
    title     : 'Lampu LED & Peralatan Inverter',
    desc      : 'Lampu LED hemat 80% vs bohlam pijar. Kulkas inverter hemat 30–40%. AC inverter hemat 30–50% dibanding AC konvensional.',
    reduction : 'Hemat 20–50% listrik rumah',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Ganti semua lampu ke LED (mulai dari ruang yang paling sering menyala)<br>2. Saat beli peralatan baru, pilih label bintang 4–5 ESDM<br>3. AC inverter: pilih yang ber-EER tinggi (>10 BTU/W)<br>4. Kulkas inverter: hemat 30–40% listrik</p><h4>💰 Estimasi Penghematan</h4><p>10 lampu LED (12W vs pijar 60W): hemat <strong>Rp 60.000/bulan</strong>. AC inverter 1 PK: hemat <strong>Rp 100.000–200.000/bulan</strong> vs non-inverter.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Label efisiensi energi ESDM (bintang 1–4) wajib untuk AC, kulkas, dan lampu sejak 2020. Harga LED turun <strong>80%</strong> dalam 10 tahun terakhir.</p><h4>📚 Referensi</h4><p>PLN (2022). <em>Statistik PLN 2022 — Konsumsi Listrik per Sektor.</em></p>',
  },
  {
    num       : 3,
    icon      : '❄️',
    title     : 'Optimasi Penggunaan AC',
    desc      : 'Set suhu AC minimal 24–25°C (tiap 1°C naik = hemat 6% listrik). Segel celah pintu/jendela, pasang curtain tebal, dan servis rutin AC.',
    reduction : 'Hemat 20–40% listrik AC',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Set suhu <strong>24–25°C</strong> (tiap +1°C = hemat 6%)<br>2. Pasang door seal dan window seal di ruang ber-AC<br>3. Gunakan tirai blackout/tebal untuk blok panas matahari<br>4. Servis AC tiap 3–4 bulan (cuci filter, cek freon)</p><h4>💰 Estimasi Penghematan</h4><p>Naikkan suhu dari 20°C → 25°C: hemat <strong>30% listrik AC</strong> = <strong>Rp 150.000–300.000/bulan</strong>. Servis rutin menaikkan efisiensi <strong>5–15%</strong>.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Gedung perkantoran green building (Menara BCA) menghemat <strong>40% energi</strong> AC dengan desain ventilasi cerdas dan kaca low-E.</p><h4>📚 Referensi</h4><p>Ember Energy (2023). <em>Grid Emission Intensity Data.</em></p>',
  },
  {
    num       : 4,
    icon      : '♻️',
    title     : 'Pilah Sampah & Buat Kompos',
    desc      : 'Sampah organik yang dikempos tidak akan menghasilkan metana di TPA. Sampah anorganik yang dipilah bisa didaur ulang dan mengurangi kebutuhan material baru.',
    reduction : 'Kurangi 50% emisi limbah rumah',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Sediakan 3 tong: organik, anorganik daur ulang, residu<br>2. Komposting sampah dapur dengan ember komposter/takakura<br>3. Setor sampah daur ulang ke bank sampah terdekat<br>4. Kurangi pemakaian plastik sekali pakai</p><h4>💰 Estimasi Penghematan</h4><p>Kompos dari sampah organik: hemat <strong>Rp 50.000/bulan</strong> biaya pupuk. Bank sampah: penghasilan tambahan <strong>Rp 30.000–100.000/bulan</strong>. Setiap kg organik yang dikompos = <strong>0.6 kg CO₂e</strong> metana yang dicegah.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Bank Sampah Malang sudah <strong>350+ unit</strong> dengan <strong>40.000 nasabah</strong>. Program TPS3R KLHK mengolah <strong>60% sampah</strong> di sumber.</p><h4>📚 Referensi</h4><p>KLHK RI (2022). <em>Statistik Persampahan Nasional.</em></p>',
  },
  {
    num       : 5,
    icon      : '🚿',
    title     : 'Solar Water Heater',
    desc      : 'Pemanas air berkontribusi 15–18% konsumsi listrik rumah tangga. Solar water heater menggunakan energi matahari gratis dan balik modal dalam 3–5 tahun.',
    reduction : 'Hemat 15–18% listrik rumah',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Pilih tipe evacuated tube (lebih efisien di Indonesia)<br>2. Kapasitas 150–200 liter untuk keluarga 4 orang<br>3. Pasang di atap dengan orientasi timur-barat<br>4. Hubungkan ke sistem plumbing air panas eksisting</p><h4>💰 Estimasi Penghematan</h4><p>Solar water heater 150L: investasi <strong>Rp 5–8 juta</strong>. Hemat <strong>Rp 100.000–200.000/bulan</strong> listrik. Payback <strong>3–5 tahun</strong>, umur <strong>15+ tahun</strong>.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Hotel-hotel di Bali sudah masif menggunakan solar water heater. Di perumahan BTN, instalasi kolektif menurunkan biaya per unit <strong>30%</strong>.</p><h4>📚 Referensi</h4><p>EIA (2023). <em>Residential Energy Consumption Survey.</em></p>',
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
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Set default streaming ke <strong>1080p</strong> (bukan 4K/Auto)<br>2. Matikan autoplay di YouTube, Netflix, TikTok<br>3. Download konten via WiFi untuk ditonton offline<br>4. Dengarkan podcast/musik tanpa video jika hanya butuh audio</p><h4>💰 Estimasi Penghematan</h4><p>Streaming 4K: <strong>7 GB/jam</strong> vs 1080p: <strong>3 GB/jam</strong> vs SD: <strong>0.7 GB/jam</strong>. Transfer data lebih sedikit = server bekerja lebih ringan = emisi lebih rendah.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Rata-rata orang Indonesia streaming <strong>3.5 jam/hari</strong> (We Are Social, 2023). Jika 200 juta pengguna turunkan 1 level resolusi, hemat <strong>~500 GWh/tahun</strong> energi server.</p><h4>📚 Referensi</h4><p>IEA (2023). <em>Data Centres and Data Transmission Networks.</em></p>',
  },
  {
    num       : 2,
    icon      : '📧',
    title     : 'Bersihkan Inbox & Unsubscribe',
    desc      : 'Hapus email lama secara massal, unsubscribe dari newsletter yang tidak dibaca, gunakan Google Drive untuk berbagi file besar daripada lampiran email.',
    reduction : 'Kurangi beban server secara nyata',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Unsubscribe dari newsletter yang tidak dibaca (gunakan Unroll.me)<br>2. Hapus email lama secara massal (filter by size/date)<br>3. Kirim link Google Drive/Dropbox, bukan attachment<br>4. Kosongkan folder Spam dan Trash secara rutin</p><h4>💰 Estimasi Penghematan</h4><p>1 email biasa = <strong>4g CO₂</strong>. 1 email + attachment = <strong>50g CO₂</strong>. Jika mengurangi 10 email/hari = hemat <strong>~15 kg CO₂/tahun</strong>. Menghapus 1.000 email lama = hemat <strong>~10 kWh</strong> penyimpanan server.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Rata-rata pekerja kantoran Indonesia mengirim <strong>40+ email/hari</strong>. Perusahaan seperti Gojek sudah beralih ke Slack/Teams untuk komunikasi internal, mengurangi email <strong>60%</strong>.</p><h4>📚 Referensi</h4><p>Berners-Lee, M. (2020). <em>How Bad Are Bananas? The Carbon Footprint of Everything.</em></p>',
  },
  {
    num       : 3,
    icon      : '☁️',
    title     : 'Pilih Layanan Berbasis EBT',
    desc      : 'Beberapa provider cloud (Google Cloud, Microsoft Azure) sudah berkomitmen 100% energi terbarukan. Pilih platform yang transparan soal emisi mereka.',
    reduction : 'Hingga 80% lebih bersih',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Cek sustainability report provider cloud Anda<br>2. Google Cloud: <strong>carbon-free energy 90%+</strong><br>3. Microsoft Azure: <strong>100% renewable by 2025</strong><br>4. Pilih data center region terdekat untuk latensi rendah + efisiensi</p><h4>💰 Estimasi Penghematan</h4><p>Cloud berbasis EBT vs coal-heavy grid: <strong>70–90% lebih rendah emisi</strong> per operasi. Harga biasanya <strong>setara atau lebih murah</strong> karena efisiensi skala besar.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Google data center Jakarta (GCP asia-southeast2) beroperasi sejak 2020. AWS Jakarta Region diluncurkan 2022. Keduanya berkomitmen <strong>net-zero 2030</strong>.</p><h4>📚 Referensi</h4><p>Ember Energy (2023). <em>Global Electricity Review — Grid Carbon Intensity.</em></p>',
  },
  {
    num       : 4,
    icon      : '📱',
    title     : 'Perpanjang Umur Perangkat',
    desc      : 'Produksi 1 smartphone baru menghasilkan ~70 kg CO₂e. Pakai HP selama 4–5 tahun, perbaiki daripada ganti, pertimbangkan beli refurbished.',
    reduction : 'Hemat 70 kg CO₂e per perangkat',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Pakai HP minimal <strong>4–5 tahun</strong> (rata-rata orang ganti tiap 2 tahun)<br>2. Ganti baterai (Rp 200–500rb) daripada beli HP baru (Rp 3–10jt)<br>3. Pasang case dan tempered glass untuk proteksi<br>4. Pertimbangkan beli refurbished dengan garansi</p><h4>💰 Estimasi Penghematan</h4><p>Perpanjang dari 2 → 4 tahun: hemat <strong>1 unit HP = ~70 kg CO₂e</strong> + <strong>Rp 3–5 juta</strong>. Laptop: perpanjang dari 3 → 6 tahun = hemat <strong>~300 kg CO₂e</strong>.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Pasar HP refurbished Indonesia tumbuh <strong>25%/tahun</strong>. Platform seperti Reebonz dan OLX menyediakan HP second berkualitas. Service center resmi Apple dan Samsung menawarkan ganti baterai.</p><h4>📚 Referensi</h4><p>Greenpeace (2022). <em>Guide to Greener Electronics.</em></p>',
  },
  {
    num       : 5,
    icon      : '🤖',
    title     : 'Gunakan AI Lebih Efisien',
    desc      : 'Buat prompt yang spesifik dan lengkap dalam satu kali tanya daripada 10 query bolak-balik. Satu percakapan panjang lebih efisien dari banyak sesi baru.',
    reduction : 'Kurangi komputasi sia-sia',
    detail    : '<h4>📋 Langkah Praktis</h4><p>1. Tulis prompt yang detail dan kontekstual dalam 1 pesan<br>2. Gunakan 1 sesi chat panjang daripada banyak sesi baru<br>3. Pilih model yang sesuai kebutuhan (model kecil untuk tugas sederhana)<br>4. Simpan hasil AI untuk referensi, jangan tanya ulang hal yang sama</p><h4>💰 Estimasi Penghematan</h4><p>1 query ChatGPT: <strong>~0.005 kWh</strong> = <strong>~3–5g CO₂</strong>. 10 query bolak-balik vs 1 query lengkap: hemat <strong>80% komputasi</strong>. Jika 100 juta pengguna berhemat 5 query/hari = <strong>~250 MWh/hari</strong>.</p><h4>🇮🇩 Contoh di Indonesia</h4><p>Indonesia memiliki <strong>20+ juta pengguna AI</strong> aktif (2023). Startup lokal seperti Bahasa.ai dan Kata.ai mengoptimalkan model untuk Bahasa Indonesia agar lebih efisien.</p><h4>📚 Referensi</h4><p>IEA (2023). <em>Electricity Consumption of AI and Data Centres.</em></p>',
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
    detail    : '<h4>📋 Langkah Praktis</h4><p>Mulai dari 1 hari/minggu, lalu tingkatkan. Gabung komunitas Bike to Work Indonesia untuk motivasi dan tips rute aman.</p><h4>💰 Penghematan</h4><p>Hemat hingga <strong>Rp 500.000/bulan</strong> dan <strong>48 kg CO₂</strong>.</p>',
  },
  {
    num       : 2,
    icon      : '🚆',
    title     : 'Maksimalkan Transportasi Umum',
    desc      : 'KRL, MRT, bus — semua 5–10× lebih efisien per penumpang dari kendaraan pribadi. Jadikan kebiasaan harian.',
    reduction : 'Hemat 70–85% emisi transportasi',
    detail    : '<h4>📋 Langkah Praktis</h4><p>Beli multi-trip card untuk diskon. Rencanakan rute gabungan KRL + feeder bus. Manfaatkan jam non-peak untuk kenyamanan.</p><h4>💰 Penghematan</h4><p>Hemat <strong>Rp 2 juta+/bulan</strong> vs mobil pribadi Bogor–Jakarta.</p>',
  },
  {
    num       : 3,
    icon      : '🌞',
    title     : 'Pasang Panel Surya Atap',
    desc      : 'Investasi terbaik untuk mengurangi emisi rumah tangga sekaligus menghemat tagihan listrik jangka panjang.',
    reduction : 'Hemat 70–100% emisi listrik',
    detail    : '<h4>📋 Langkah Praktis</h4><p>Pasang PLTS 2–3 kWp. Daftar PLN Net Metering. Payback 5–7 tahun, umur 25+ tahun.</p><h4>💰 Penghematan</h4><p>Total saving sepanjang umur panel: <strong>Rp 80–100 juta</strong>.</p>',
  },
  {
    num       : 4,
    icon      : '♻️',
    title     : 'Daur Ulang & Kurangi Konsumsi',
    desc      : 'Setiap produk yang tidak dibeli = emisi manufaktur yang tidak terjadi. Beli yang perlu, pilih yang tahan lama.',
    reduction : 'Hemat 30–95% emisi material',
    detail    : '<h4>📋 Langkah Praktis</h4><p>Pilah sampah, setor ke bank sampah, komposting organik. Beli second-hand untuk pakaian dan elektronik.</p><h4>💰 Penghematan</h4><p>Hemat <strong>Rp 50.000–100.000/bulan</strong> dari bank sampah + kompos.</p>',
  },
  {
    num       : 5,
    icon      : '🌳',
    title     : 'Tanam Pohon & Restorasi Lahan',
    desc      : '1 pohon menyerap ±22 kg CO₂/tahun. Ikut program tanam pohon atau donasi ke proyek restorasi gambut yang terverifikasi.',
    reduction : '22 kg CO₂e/pohon/tahun',
    detail    : '<h4>📋 Langkah Praktis</h4><p>Ikut program tanam pohon (Trees4Trees, LindungiHutan). Donasi restorasi gambut terverifikasi. Tanam pohon buah di pekarangan sendiri.</p><h4>💰 Penghematan</h4><p>1 pohon = <strong>22 kg CO₂/tahun</strong>. Tanam 5 pohon = offset 110 kg CO₂/tahun.</p>',
  },
  {
    num       : 6,
    icon      : '🥗',
    title     : 'Kurangi Konsumsi Daging Merah',
    desc      : 'Daging sapi menghasilkan 27 kg CO₂e/kg — 20× lebih tinggi dari tahu/tempe. Ganti 1–2 kali seminggu saja sudah berdampak besar.',
    reduction : 'Hemat 500+ kg CO₂e/tahun',
    detail    : '<h4>📋 Langkah Praktis</h4><p>Ganti 2 porsi daging sapi/minggu dengan tahu/tempe. Indonesia punya tradisi makanan nabati yang kaya: gado-gado, pecel, karedok.</p><h4>💰 Penghematan</h4><p>Daging sapi Rp 130.000/kg vs tempe Rp 12.000/kg. Hemat <strong>Rp 400.000+/bulan</strong>.</p>',
  },
  {
    num       : 7,
    icon      : '💡',
    title     : 'Efisiensi Energi di Semua Lini',
    desc      : 'LED, AC inverter, motor VFD, insulasi atap, dan kebiasaan matikan listrik saat tidak dipakai — semua bertambah signifikan dalam setahun.',
    reduction : 'Hemat 20–50% konsumsi energi',
    detail    : '<h4>📋 Langkah Praktis</h4><p>Ganti semua lampu ke LED. AC set 24°C. Cabut charger saat penuh. Matikan peralatan standby (hemat 5–10% listrik).</p><h4>💰 Penghematan</h4><p>Hemat <strong>Rp 200.000–500.000/bulan</strong> tagihan listrik.</p>',
  },
  {
    num       : 8,
    icon      : '📵',
    title     : 'Digital Detox Mingguan',
    desc      : 'Satu hari tanpa streaming = hemat ~200g CO₂. Bonus besar: lebih produktif, tidur lebih baik, dan terhubung dengan dunia nyata.',
    reduction : 'Kurangi jejak digital hingga 14%',
    detail    : '<h4>📋 Langkah Praktis</h4><p>Pilih 1 hari/minggu tanpa streaming dan social media berlebihan. Baca buku, olahraga, atau habiskan waktu di alam.</p><h4>💰 Penghematan</h4><p>Hemat <strong>~200g CO₂/hari</strong> + kuota internet. Bonus: tidur lebih baik!</p>',
  },
];
