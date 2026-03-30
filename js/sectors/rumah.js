// ================================================
//  js/sectors/rumah.js
//  Kalkulasi emisi + render formula untuk
//  sektor rumah tangga & bangunan
//
//  FUNGSI YANG DIEKSPOR (dipanggil dari main.js):
//  - calcRumah()              → return objek hasil
//  - renderFormulaRumah(result) → isi DOM formula
//
//  DEPENDENSI (harus sudah dimuat sebelum file ini):
//  - js/data/rumah.js
//    (RUMAH_FACTORS, RUMAH_DEFAULTS, RUMAH_SKALA)
//
//  CARA MENAMBAH ITEM BARU (misal: pemanas air):
//  1. Tambah slider di index.html (sec-rumah)
//  2. Baca nilai slider di calcRumah() di bawah
//  3. Hitung emisinya menggunakan RUMAH_FACTORS
//  4. Tambahkan ke netKg dan tampilkan di formula
// ================================================

// ------------------------------------------------
//  calcRumah()
//  Membaca semua input rumah tangga dari DOM dan
//  menjumlahkan emisi dari semua sumber
//
//  RETURN OBJECT:
//  {
//    netKg      : total emisi gabungan (kg CO₂e)
//    annualKg   : estimasi tahunan (kg CO₂e)
//    fromKwh    : emisi dari listrik (kg)
//    fromLpg    : emisi dari LPG (kg)
//    fromAc     : emisi dari AC (kg)
//    fromWaste  : emisi dari sampah (kg)
//    kwh        : input kWh/bulan
//    lpg        : input kg LPG/bulan
//    ac         : input jumlah unit AC
//    waste      : input kg sampah/hari
//    timeMult   : multiplier skala waktu
//    annualMult : untuk estimasi tahunan
//  }
// ------------------------------------------------
function calcRumah() {
  // Baca input dari DOM
  const kwh      = parseFloat(document.getElementById('kwh-slider').value);
  const lpg      = parseFloat(document.getElementById('lpg-slider').value);
  const ac       = parseInt(document.getElementById('ac-slider').value)   || 0;
  const waste    = parseFloat(document.getElementById('waste-slider').value);
  const timeMult = parseInt(document.getElementById('rumah-time').value);

  const F = RUMAH_FACTORS;  // Shortcut ke faktor emisi

  // --- Emisi dari masing-masing sumber ---

  // 1. Listrik dari grid PLN
  //    Rumus: kWh/bulan × intensitas grid × skala waktu
  const fromKwh = kwh * F.listrik_per_kwh * timeMult;

  // 2. LPG untuk memasak
  //    Rumus: kg LPG/bulan × faktor emisi LPG × skala waktu
  const fromLpg = lpg * F.lpg_per_kg * timeMult;

  // 3. AC (Air Conditioner)
  //    Rumus: unit × daya (kW) × jam/hari × hari/bulan × intensitas grid × skala waktu
  const fromAc  = ac
    * F.ac_daya_kw
    * F.ac_jam_per_hari
    * F.ac_hari_per_bulan
    * F.listrik_per_kwh
    * timeMult;

  // 4. Sampah organik ke TPA
  //    Rumus: kg/hari × 30 hari × faktor emisi TPA × skala waktu
  const fromWaste = waste * 30 * F.sampah_per_kg * timeMult;

  // --- Total gabungan ---
  const netKg = fromKwh + fromLpg + fromAc + fromWaste;

  // --- Estimasi tahunan ---
  const skala      = RUMAH_SKALA[timeMult];
  const annualMult = skala ? skala.annualMult : 1;
  const annualKg   = netKg * annualMult;

  return {
    netKg,
    annualKg,
    fromKwh,
    fromLpg,
    fromAc,
    fromWaste,
    kwh,
    lpg,
    ac,
    waste,
    timeMult,
    annualMult,
  };
}

// ------------------------------------------------
//  renderFormulaRumah(result)
//  Mengisi elemen #formula-code dan #formula-detail
// ------------------------------------------------
function renderFormulaRumah(result) {
  const { kwh, lpg, ac, waste, timeMult,
          fromKwh, fromLpg, fromAc, fromWaste, netKg } = result;

  const F          = RUMAH_FACTORS;
  const skalaLabel = RUMAH_SKALA[timeMult]?.label || '';

  // Hitung kWh AC untuk ditampilkan di formula
  const kwhAc = ac * F.ac_daya_kw * F.ac_jam_per_hari * F.ac_hari_per_bulan * timeMult;

  document.getElementById('formula-code').innerHTML =
`<span class="f-comment">// ============================================</span>
<span class="f-comment">// Intensitas grid PLN Indonesia: ${F.listrik_per_kwh} kg CO₂e/kWh (2022)</span>
<span class="f-comment">// Faktor emisi LPG             : ${F.lpg_per_kg} kg CO₂e/kg LPG</span>
<span class="f-comment">// Daya AC rata-rata            : ${F.ac_daya_kw} kW × ${F.ac_jam_per_hari} jam × ${F.ac_hari_per_bulan} hari/bulan</span>
<span class="f-comment">// Faktor emisi sampah TPA      : ${F.sampah_per_kg} kg CO₂e/kg sampah</span>
<span class="f-comment">// Skala waktu                  : ${skalaLabel} (×${timeMult})</span>
<span class="f-comment">// ============================================</span>

<span class="f-comment">// BREAKDOWN EMISI:</span>
Listrik = <span class="f-val">${kwh} kWh</span>  <span class="f-op">×</span> <span class="f-val">${F.listrik_per_kwh} kg/kWh</span>  <span class="f-op">×</span> <span class="f-val">${timeMult}</span>  = <span class="f-val">${fromKwh.toFixed(2)} kg CO₂e</span>
LPG     = <span class="f-val">${lpg} kg</span>    <span class="f-op">×</span> <span class="f-val">${F.lpg_per_kg} kg/kg</span>    <span class="f-op">×</span> <span class="f-val">${timeMult}</span>  = <span class="f-val">${fromLpg.toFixed(2)} kg CO₂e</span>
AC      = <span class="f-val">${kwhAc.toFixed(1)} kWh</span> <span class="f-op">×</span> <span class="f-val">${F.listrik_per_kwh} kg/kWh</span>          = <span class="f-val">${fromAc.toFixed(2)} kg CO₂e</span>
Sampah  = <span class="f-val">${waste} kg/hr</span><span class="f-op">×</span> <span class="f-val">30 hr</span> <span class="f-op">×</span> <span class="f-val">${F.sampah_per_kg} kg/kg</span> <span class="f-op">×</span> <span class="f-val">${timeMult}</span> = <span class="f-val">${fromWaste.toFixed(2)} kg CO₂e</span>

<span class="f-comment">// TOTAL:</span>
Emisi   = ${fromKwh.toFixed(2)} + ${fromLpg.toFixed(2)} + ${fromAc.toFixed(2)} + ${fromWaste.toFixed(2)}
        = <span class="f-result">${netKg.toFixed(2)} kg CO₂e</span>`;

  // Tentukan kontributor terbesar untuk highlight
  const kontribusi = [
    { nama: 'Listrik', val: fromKwh },
    { nama: 'LPG',     val: fromLpg },
    { nama: 'AC',      val: fromAc  },
    { nama: 'Sampah',  val: fromWaste },
  ].sort((a, b) => b.val - a.val);

  const terbesar = kontribusi[0];
  const pctTerbesar = netKg > 0
    ? ((terbesar.val / netKg) * 100).toFixed(0)
    : 0;

  document.getElementById('formula-detail').innerHTML = `
    <h4>🏠 Kontributor Terbesar</h4>
    <p><strong>${terbesar.nama}</strong> menyumbang
    <strong>${pctTerbesar}%</strong> dari total emisi rumah tanggamu
    (${terbesar.val.toFixed(2)} kg CO₂e).
    Fokus pengurangan di sini untuk dampak terbesar!</p>

    <h4>💡 Intensitas Grid PLN Indonesia</h4>
    <p>Setiap 1 kWh listrik yang kamu gunakan menghasilkan
    <strong>${F.listrik_per_kwh} kg CO₂e</strong> (data PLN 2022).
    Angka ini akan terus turun seiring naiknya porsi energi terbarukan.
    Sebagai perbandingan: grid Jerman 0.38 kg/kWh, Prancis 0.06 kg/kWh (banyak nuklir).</p>

    <h4>🗑️ Metana dari TPA (FOD Method)</h4>
    <p>Sampah organik yang membusuk di TPA menghasilkan metana (CH₄) secara anaerobik.
    Dengan GWP CH₄ = 28, ini setara <strong>${F.sampah_per_kg} kg CO₂e per kg sampah</strong>.
    Solusi: pilah sampah organik untuk dikompos = 0 emisi metana!</p>

    <h4>🔬 Sumber Data</h4>
    <p>PLN Statistik 2022 (grid intensity) ·
    IPCC 2006 Vol.2 Ch.1 (faktor LPG) ·
    IPCC 2006 Vol.5 (emisi TPA, FOD method) ·
    Climatiq / IEA Emission Factors Indonesia</p>`;
}
