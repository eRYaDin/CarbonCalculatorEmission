// ================================================
//  js/sectors/transportasi.js
//  Kalkulasi emisi + render formula untuk
//  sektor transportasi
//
//  FUNGSI YANG DIEKSPOR (dipanggil dari main.js):
//  - calcTransportasi()  → return objek hasil hitung
//  - renderFormulaTransportasi(result) → isi DOM formula
//
//  DEPENDENSI (harus sudah dimuat sebelum file ini):
//  - js/data/transportasi.js
//    (VEHICLES, FUEL_MULT, FUEL_USES,
//     SHARED_VEHICLES, NO_PASSENGER, FREQ_DATA)
// ================================================

// ------------------------------------------------
//  calcTransportasi()
//  Membaca semua input dari DOM, menghitung
//  total emisi, dan mengembalikan objek hasil.
//
//  RETURN OBJECT:
//  {
//    netKg      : total emisi bersih (kg CO₂e)
//    annualKg   : estimasi tahunan (kg CO₂e)
//    perKmG     : emisi per km per orang (gram)
//    distance   : jarak input (km)
//    freq       : objek FREQ_DATA yang dipilih
//    freqKey    : key frekuensi yang dipilih
//    ef         : faktor emisi efektif (g/km)
//    pax        : jumlah penumpang efektif
//    totalKm    : total jarak × frekuensi (km)
//    fuelKey    : key BBM yang dipilih
//    vd         : objek VEHICLES kendaraan aktif
//    vehicleKey : key kendaraan aktif
//  }
// ------------------------------------------------
function calcTransportasi() {
  // Baca input dari DOM
  const distance   = parseFloat(document.getElementById('dist-slider').value);
  const passengers = parseInt(document.getElementById('pass-slider').value) || 1;
  const fuelKey    = document.getElementById('fuel-select').value;
  const freqKey    = document.querySelector('#freq-group .toggle-opt.active')?.dataset.freq || 'sekali';
  const vehicleKey = _getActiveVehicleKey();

  const vd = VEHICLES[vehicleKey];
  const fd = FREQ_DATA[freqKey];

  // --- Hitung faktor emisi efektif ---
  let ef = vd.ef;

  // Terapkan multiplier BBM hanya untuk kendaraan berbahan bakar
  if (FUEL_USES.includes(vehicleKey)) {
    ef *= (FUEL_MULT[fuelKey]?.mult ?? 1.0);
  }

  // --- Total jarak setelah frekuensi ---
  const totalKm = distance * fd.mult;

  // --- Penumpang efektif ---
  // Kendaraan umum (bus, KRL, dll) sudah per-penumpang di data,
  // jadi tidak dibagi lagi. Kendaraan pribadi dibagi jumlah penumpang.
  const pax = SHARED_VEHICLES.includes(vehicleKey) ? 1 : passengers;

  // --- Total emisi ---
  const grossG = ef * totalKm;       // gram (sebelum dibagi penumpang)
  const netG   = grossG / pax;       // gram per orang
  const netKg  = netG / 1000;        // kg CO₂e

  // --- Estimasi tahunan ---
  // annualMult = berapa kali trip ini terjadi dalam setahun
  const annualKg = netKg * fd.annualMult;

  return {
    netKg,
    annualKg,
    perKmG    : ef / pax,    // gram/km/orang
    distance,
    freq      : fd,
    freqKey,
    ef,
    pax,
    totalKm,
    fuelKey,
    vd,
    vehicleKey,
  };
}

// ------------------------------------------------
//  renderFormulaTransportasi(result)
//  Mengisi elemen #formula-code dan #formula-detail
//  dengan penjelasan perhitungan yang mudah dipahami
//
//  PARAMETER:
//  result — objek yang dikembalikan calcTransportasi()
// ------------------------------------------------
function renderFormulaTransportasi(result) {
  const { vd, vehicleKey, fuelKey, ef, distance,
          freq, pax, totalKm, netKg } = result;

  const hasFuel = FUEL_USES.includes(vehicleKey);
  const fl      = FUEL_MULT[fuelKey];
  const basEf   = vd.ef;

  // Bagian formula kode (terminal style)
  document.getElementById('formula-code').innerHTML =
`<span class="f-comment">// ============================================</span>
<span class="f-comment">// Kendaraan  : ${vd.icon} ${vd.label}</span>
<span class="f-comment">// Faktor emisi dasar : ${basEf} g CO₂e/km</span>
${hasFuel
  ? `<span class="f-comment">// Bahan bakar : ${fl.label} (multiplier ×${fl.mult})</span>
<span class="f-comment">// Faktor emisi efektif : ${basEf} × ${fl.mult} = ${ef.toFixed(1)} g CO₂e/km</span>`
  : `<span class="f-comment">// Bahan bakar : tidak pakai BBM fosil</span>`
}
<span class="f-comment">// Penumpang  : ${pax} orang</span>
<span class="f-comment">// ============================================</span>

<span class="f-comment">// RUMUS DASAR (Well-to-Wheel / IPCC Tier 1):</span>
Emisi = Jarak × Frekuensi × Faktor Emisi ÷ Penumpang

      = <span class="f-val">${distance} km</span> <span class="f-op">×</span> <span class="f-val">${freq.mult}</span> <span class="f-op">×</span> <span class="f-val">${ef.toFixed(1)} g/km</span> <span class="f-op">÷</span> <span class="f-val">${pax} orang</span>

      = <span class="f-val">${(ef * totalKm).toFixed(0)} g CO₂e</span> <span class="f-op">÷</span> <span class="f-val">${pax}</span>

      = <span class="f-result">${(netKg * 1000).toFixed(0)} g  →  ${netKg.toFixed(3)} kg CO₂e</span>`;

  // Bagian penjelasan teks
  document.getElementById('formula-detail').innerHTML = `
    <h4>📐 Metode: Well-to-Wheel (WtW)</h4>
    <p>Perhitungan ini menggunakan pendekatan Well-to-Wheel yang mencakup:
    <br>• <strong>Tank-to-Wheel (TTW)</strong>: emisi langsung dari pembakaran BBM di knalpot
    <br>• <strong>Well-to-Tank (WtT)</strong>: emisi dari ekstraksi, penyulingan, dan distribusi BBM
    <br>Faktor emisi bersumber dari <strong>IPCC 2006 Vol.2 Ch.3 (Mobile Combustion)</strong>
    dan dikoreksi untuk kondisi kendaraan Indonesia oleh Kementerian ESDM RI.</p>

    <h4>🌡️ Apa itu CO₂ Equivalent (CO₂e)?</h4>
    <p>CO₂e menyatukan semua gas rumah kaca dalam satu satuan menggunakan
    Global Warming Potential (GWP) selama 100 tahun (GWP100, IPCC AR6):
    <br>• CO₂ : GWP = <strong>1</strong> (acuan)
    <br>• CH₄ : GWP = <strong>28</strong> (28× lebih kuat dari CO₂)
    <br>• N₂O : GWP = <strong>265</strong> (265× lebih kuat dari CO₂)</p>

    ${vehicleKey.startsWith('pesawat') || vehicleKey === 'helikopter' ? `
    <h4>✈️ Radiative Forcing (Penerbangan)</h4>
    <p>Emisi pesawat di ketinggian >10 km punya dampak iklim
    <strong>1.9× lebih besar</strong> dari emisi yang sama di permukaan tanah,
    karena pembentukan contrail dan efek ozon. Faktor ini sudah
    diperhitungkan dalam angka faktor emisi pesawat di kalkulator ini.
    Sumber: <em>Skoot.eco · IPCC Aviation Report 2024</em></p>` : ''}

    <h4>🔬 Sumber Data</h4>
    <p>IPCC 2006 Vol.2 Ch.3 (Mobile Combustion) ·
    Kementerian ESDM RI · PLN Statistik 2022 · IEA 2023</p>`;
}

// ------------------------------------------------
//  Helper internal: ambil key kendaraan aktif
// ------------------------------------------------
function _getActiveVehicleKey() {
  return document.querySelector('#vehicle-grid .veh-btn.active')?.dataset.key
    || 'motor_bebek';
}
