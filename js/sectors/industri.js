// ================================================
//  js/sectors/industri.js
//  Kalkulasi emisi + render formula untuk
//  sektor industri & manufaktur
//
//  FUNGSI YANG DIEKSPOR (dipanggil dari main.js):
//  - calcIndustri()              → return objek hasil
//  - renderFormulaIndustri(result) → isi DOM formula
//
//  DEPENDENSI (harus sudah dimuat sebelum file ini):
//  - js/data/industri.js  (INDUSTRIES)
// ================================================

// ------------------------------------------------
//  calcIndustri()
//  Membaca input industri dari DOM dan menghitung
//  total emisi berdasarkan volume × faktor emisi
//
//  RETURN OBJECT:
//  {
//    netKg       : total emisi (kg CO₂e)
//    annualKg    : estimasi tahunan (kg CO₂e)
//    volume      : volume total (sudah × skala waktu)
//    volumeInput : volume input mentah dari slider
//    timeMult    : multiplier skala waktu
//    industryKey : key industri yang dipilih
//    ind         : objek INDUSTRIES yang dipilih
//  }
// ------------------------------------------------
function calcIndustri() {
  // Baca input dari DOM
  const volumeInput = parseFloat(document.getElementById('industry-slider').value);
  const timeMult    = parseInt(document.getElementById('industry-time').value);
  const industryKey = _getActiveIndustryKey();

  const ind = INDUSTRIES[industryKey];

  // --- Total volume setelah skala waktu ---
  // Contoh: 10 ton/hari × 22 hari = 220 ton/bulan
  const volume = volumeInput * timeMult;

  // --- Total emisi ---
  // ef dalam kg CO₂e per unit, volume dalam unit
  // Hasilnya sudah dalam kg CO₂e
  const netKg = ind.ef * volume;

  // --- Estimasi tahunan ---
  // Normalisasi ke per-tahun berdasarkan skala waktu
  let annualKg;
  if (timeMult === 264) {
    // Input sudah per tahun
    annualKg = netKg;
  } else if (timeMult === 22) {
    // Input per bulan → × 12
    annualKg = netKg * 12;
  } else {
    // Input per hari → × 264 hari kerja
    annualKg = netKg * 264;
  }

  return {
    netKg,
    annualKg,
    volume,
    volumeInput,
    timeMult,
    industryKey,
    ind,
  };
}

// ------------------------------------------------
//  renderFormulaIndustri(result)
//  Mengisi elemen #formula-code dan #formula-detail
// ------------------------------------------------
function renderFormulaIndustri(result) {
  const { ind, industryKey, volumeInput, timeMult,
          volume, netKg } = result;

  // Label skala waktu yang mudah dibaca
  const skalaLabel = {
    1  : 'per hari',
    22 : 'per bulan (22 hari kerja)',
    264: 'per tahun (264 hari kerja)',
  }[timeMult] || '';

  document.getElementById('formula-code').innerHTML =
`<span class="f-comment">// ============================================</span>
<span class="f-comment">// Industri   : ${ind.icon} ${ind.label}</span>
<span class="f-comment">// Satuan     : ${ind.unit}</span>
<span class="f-comment">// Faktor emisi: ${ind.ef.toLocaleString('id-ID')} kg CO₂e / ${ind.unit}</span>
<span class="f-comment">// Skala waktu: ${skalaLabel} (×${timeMult})</span>
<span class="f-comment">// ============================================</span>

<span class="f-comment">// RUMUS:</span>
Emisi = Volume per Periode × Skala Waktu × Faktor Emisi

      = <span class="f-val">${volumeInput} ${ind.unit}</span> <span class="f-op">×</span> <span class="f-val">${timeMult}</span> <span class="f-op">×</span> <span class="f-val">${ind.ef.toLocaleString('id-ID')} kg CO₂e/${ind.unit}</span>

      = <span class="f-val">${volume.toLocaleString('id-ID')} ${ind.unit}</span> <span class="f-op">×</span> <span class="f-val">${ind.ef.toLocaleString('id-ID')}</span>

      = <span class="f-result">${netKg.toLocaleString('id-ID', {maximumFractionDigits:1})} kg CO₂e</span>
      = <span class="f-result">${(netKg / 1000).toFixed(3)} ton CO₂e</span>`;

  // Bangun blok penjelasan yang relevan per jenis industri
  const penjelasanKhusus = _getPenjelasanIndustri(industryKey, ind);

  document.getElementById('formula-detail').innerHTML = `
    <h4>🏭 Metodologi: IPCC Industrial Processes</h4>
    <p>${ind.desc}</p>

    ${penjelasanKhusus}

    <h4>📊 Scope Emisi (GHG Protocol)</h4>
    <p>Faktor emisi industri mencakup:
    <br>• <strong>Scope 1</strong>: emisi langsung dari proses produksi (pembakaran bahan bakar, reaksi kimia)
    <br>• <strong>Scope 2</strong>: emisi tidak langsung dari konsumsi listrik (grid PLN)
    <br>Scope 3 (rantai pasok, transportasi produk) belum termasuk.</p>

    <h4>🔬 Sumber Data</h4>
    <p>IPCC 2006 Guidelines Vol.3 IPPU ·
    IEA Industrial Emissions 2023 ·
    World Steel Association · RMI Aluminum Guidance 2023 ·
    FAO FAOSTAT · KLHK RI</p>`;
}

// ------------------------------------------------
//  Helper: penjelasan tambahan per jenis industri
// ------------------------------------------------
function _getPenjelasanIndustri(key, ind) {
  // Kelompok dengan penjelasan khusus
  const groups = {
    // Material berbasis mineral
    semen: `
      <h4>🏗️ Mengapa Semen Sangat Tinggi?</h4>
      <p>Sekitar <strong>60% emisi semen</strong> berasal dari kalsinasi batu kapur
      (CaCO₃ → CaO + CO₂) — reaksi kimia yang tidak bisa dihindari,
      bukan dari pembakaran energi. Sisanya dari kiln batubara.
      Alternatif: semen geopolimer dan blended cement (campuran fly ash/slag)
      bisa memangkas emisi 30–80%.</p>`,

    baja: `
      <h4>⚙️ Rute Produksi Baja</h4>
      <p>Ada dua rute utama: <strong>Blast Furnace–Basic Oxygen Furnace (BF-BOF)</strong>
      menggunakan bijih besi baru (~1.85 tCO₂/ton) dan
      <strong>Electric Arc Furnace (EAF)</strong> dari scrap (~0.6 tCO₂/ton).
      Indonesia dominan di BF-BOF. Transisi ke EAF + listrik EBT adalah
      kunci dekarbonisasi baja.</p>`,

    aluminium: `
      <h4>🔩 Mengapa Aluminium Sangat Tinggi?</h4>
      <p>Proses elektrolisis Hall-Héroult membutuhkan <strong>13–14 kWh listrik
      per kg aluminium</strong> — sangat boros. Ditambah emisi PFC (perfluorokarbon)
      dari proses anoda yang GWP-nya 6.500–9.200× lebih kuat dari CO₂.
      Solusi: aluminium daur ulang hemat 95% energi!</p>`,

    // Energi
    pltu_batubara: `
      <h4>🏭 Intensitas Emisi Grid PLN</h4>
      <p>PLTU batubara di Indonesia rata-rata menghasilkan
      <strong>1.020 kg CO₂e/MWh</strong> — salah satu yang tertinggi di Asia
      karena dominasi batubara subbituminus kalori rendah.
      Sebagai perbandingan: PLTS surya hanya <strong>48 kg CO₂e/MWh</strong>
      (life-cycle). Target PLN: intensitas turun ke 636 kg/MWh pada 2025.</p>`,

    // Pertanian
    sawit: `
      <h4>🌴 Faktor Gambut dalam Emisi Sawit</h4>
      <p>Emisi sawit di lahan mineral sekitar 800–1.200 kgCO₂e/ton CPO.
      Namun di lahan gambut bisa mencapai <strong>3.200 kgCO₂e/ton CPO</strong>
      karena oksidasi gambut yang terus-menerus setelah drainase.
      Perkebunan sawit bersertifikat RSPO dan ISPO di lahan mineral
      jauh lebih rendah emisinya.</p>`,

    // Lahan
    deforestasi: `
      <h4>🌳 Emisi Deforestasi Hutan Tropis</h4>
      <p>Satu hektar hutan hujan tropis menyimpan 150–300 ton karbon
      di atas dan bawah tanah. Saat dibuka, sebagian besar dilepaskan sebagai CO₂.
      <strong>Indonesia kehilangan ±1 juta ha hutan/tahun</strong>
      (2015–2020) — setara 400 juta ton CO₂e per tahun hanya dari deforestasi.
      Sumber: FAO Global Forest Resources Assessment 2020.</p>`,
  };

  return groups[key] || `
    <h4>ℹ️ Tentang Faktor Emisi Ini</h4>
    <p>${ind.desc}</p>`;
}

// ------------------------------------------------
//  Helper internal: ambil key industri aktif
// ------------------------------------------------
function _getActiveIndustryKey() {
  return document.querySelector('#industry-grid [data-ikey].active')?.dataset.ikey
    || 'semen';
}
