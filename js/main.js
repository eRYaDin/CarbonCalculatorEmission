// ================================================
//  js/main.js  ← HARUS DIMUAT PALING TERAKHIR
//  Titik masuk utama aplikasi EcoTrack
//
//  TANGGUNG JAWAB FILE INI:
//  - Inisialisasi semua komponen saat halaman siap
//  - Event binding (tab, slider, toggle, klik)
//  - Fungsi calculate() — orkestrator kalkulasi
//  - Fungsi resetForm()
//  - Fungsi runAnimations() — jalankan semua canvas
//
//  FUNGSI GLOBAL (dipanggil dari HTML onclick):
//  - calculate()
//  - resetForm()
//
//  DEPENDENSI (harus sudah dimuat sebelum file ini):
//  js/data/*  →  js/sectors/*  →  js/animations/*
//  →  js/ui.js  →  js/main.js
// ================================================

// =================== STATE APLIKASI ===================

// Sektor yang sedang aktif
let _currentSector = 'transportasi';

// =================== INISIALISASI ===================

document.addEventListener('DOMContentLoaded', () => {
  _buildVehicleGrid();
  _buildIndustryGrid();
  _bindSectorTabs();
  _bindSliders();
  _bindFreqToggles();
  _updateFuelVisibility();
  renderAllSolutions();   // Dari ui.js — isi Panel 08
});

// =================== BUILD GRIDS ===================

// ------------------------------------------------
//  _buildVehicleGrid()
//  Membangun grid tombol kendaraan dari VEHICLES
//  Untuk tambah kendaraan: edit js/data/transportasi.js
// ------------------------------------------------
function _buildVehicleGrid() {
  const container = document.getElementById('vehicle-grid');

  // Kelompokkan kendaraan berdasarkan kategori
  const categories = {};
  Object.entries(VEHICLES).forEach(([key, v]) => {
    if (!categories[v.cat]) categories[v.cat] = [];
    categories[v.cat].push({ key, ...v });
  });

  // Bangun HTML per kategori
  let html = '';
  Object.entries(categories).forEach(([cat, items]) => {
    html += `<div class="veh-category">📂 ${cat}</div>`;
    html += `<div class="vehicle-grid" style="margin-bottom:8px">`;
    items.forEach(v => {
      const isActive = (v.key === 'motor_bebek');
      html += `
        <button class="veh-btn ${isActive ? 'active' : ''}"
                data-key="${v.key}"
                title="${v.desc}">
          <span class="v-icon">${v.icon}</span>
          ${v.label}
        </button>`;
    });
    html += `</div>`;
  });

  container.innerHTML = html;

  // Event listener — delegasi ke container
  container.addEventListener('click', e => {
    const btn = e.target.closest('.veh-btn');
    if (!btn) return;
    document.querySelectorAll('.veh-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    _updateFuelVisibility();
  });
}

// ------------------------------------------------
//  _buildIndustryGrid()
//  Membangun grid tombol industri dari INDUSTRIES
//  Untuk tambah industri: edit js/data/industri.js
// ------------------------------------------------
function _buildIndustryGrid() {
  const container = document.getElementById('industry-grid');

  const categories = {};
  Object.entries(INDUSTRIES).forEach(([key, v]) => {
    if (!categories[v.cat]) categories[v.cat] = [];
    categories[v.cat].push({ key, ...v });
  });

  let html = '';
  Object.entries(categories).forEach(([cat, items]) => {
    html += `<div class="veh-category" style="margin-top:4px">📂 ${cat}</div>`;
    html += `<div class="vehicle-grid" style="margin-bottom:8px">`;
    items.forEach(v => {
      const isActive = (v.key === 'semen');
      html += `
        <button class="veh-btn ${isActive ? 'active' : ''}"
                data-ikey="${v.key}"
                title="${v.desc}">
          <span class="v-icon">${v.icon}</span>
          ${v.label}
        </button>`;
    });
    html += `</div>`;
  });

  container.innerHTML = html;

  // Event listener
  container.addEventListener('click', e => {
    const btn = e.target.closest('[data-ikey]');
    if (!btn) return;
    document.querySelectorAll('[data-ikey]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    _updateIndustryMeta();
  });

  _updateIndustryMeta();
}

// Update label satuan slider industri saat ganti jenis
function _updateIndustryMeta() {
  const activeBtn = document.querySelector('[data-ikey].active');
  if (!activeBtn) return;

  const key = activeBtn.dataset.ikey;
  const ind = INDUSTRIES[key];
  if (!ind) return;

  const val = document.getElementById('industry-slider').value;
  document.getElementById('industry-val').innerHTML =
    `${val} <span id="industry-unit">${ind.unit}</span>`;
  document.getElementById('industry-hint').textContent = ind.hint;
}

// =================== EVENT BINDING ===================

// ------------------------------------------------
//  _bindSectorTabs()
//  Tangani klik tab sektor atas
// ------------------------------------------------
function _bindSectorTabs() {
  document.querySelectorAll('.stab').forEach(btn => {
    btn.addEventListener('click', () => {
      // Update tab aktif
      document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      _currentSector = btn.dataset.sec;

      // Tampilkan section sektor yang sesuai
      document.querySelectorAll('.sector-section').forEach(s => s.classList.add('hidden'));
      document.getElementById(`sec-${_currentSector}`)?.classList.remove('hidden');

      // Update label panel
      document.getElementById('panel-num-label').textContent =
        `PANEL 01 — ${_currentSector.toUpperCase()}`;

      // Reset result saat pindah sektor
      resetResultPanel();
      hideResultSections();
    });
  });
}

// ------------------------------------------------
//  _bindSliders()
//  Hubungkan semua slider ke label nilai
// ------------------------------------------------
function _bindSliders() {
  // Format: [id-slider, id-label, fungsi-format]
  const sliders = [
    ['dist-slider',     'dist-val',     v => `${v} km`],
    ['pass-slider',     'pass-val',     v => `${v} orang`],
    ['kwh-slider',      'kwh-val',      v => `${v} kWh`],
    ['lpg-slider',      'lpg-val',      v => `${v} kg`],
    ['ac-slider',       'ac-val',       v => `${v} unit`],
    ['waste-slider',    'waste-val',    v => `${v} kg`],
    ['stream-slider',   'stream-val',   v => `${v} jam`],
    ['game-slider',     'game-val',     v => `${v} jam`],
    ['email-slider',    'email-val',    v => `${v} email`],
    ['ai-slider',       'ai-val',       v => `${v} query`],
    ['industry-slider', 'industry-val', v => {
      // Label industri perlu tahu satuan aktif
      const activeBtn = document.querySelector('[data-ikey].active');
      const unit = activeBtn
        ? (INDUSTRIES[activeBtn.dataset.ikey]?.unit || '')
        : 'ton';
      return `${v} <span id="industry-unit">${unit}</span>`;
    }],
  ];

  sliders.forEach(([sliderId, labelId, fmt]) => {
    const slider = document.getElementById(sliderId);
    const label  = document.getElementById(labelId);
    if (!slider || !label) return;

    slider.addEventListener('input', () => {
      label.innerHTML = fmt(slider.value);
    });
  });
}

// ------------------------------------------------
//  _bindFreqToggles()
//  Tangani klik tombol frekuensi perjalanan
// ------------------------------------------------
function _bindFreqToggles() {
  document.getElementById('freq-group')
    ?.addEventListener('click', e => {
      const btn = e.target.closest('.toggle-opt');
      if (!btn) return;
      document.querySelectorAll('.toggle-opt').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
}

// ------------------------------------------------
//  _updateFuelVisibility()
//  Tampilkan/sembunyikan dropdown BBM dan slider
//  penumpang berdasarkan kendaraan yang dipilih
// ------------------------------------------------
function _updateFuelVisibility() {
  const activeBtn    = document.querySelector('.veh-btn.active');
  const vehicleKey   = activeBtn?.dataset.key || 'motor_bebek';

  const fuelRow = document.getElementById('fuel-row');
  const passRow = document.getElementById('pass-row');

  if (fuelRow) fuelRow.style.display =
    FUEL_USES.includes(vehicleKey) ? '' : 'none';

  if (passRow) passRow.style.display =
    NO_PASSENGER.includes(vehicleKey) ? 'none' : '';
}

// =================== CALCULATE ===================

// ------------------------------------------------
//  calculate()
//  Fungsi utama yang dipanggil tombol HITUNG
//  Orkestrasi: baca sektor → hitung → tampilkan
// ------------------------------------------------
function calculate() {
  let netKg, annualKg, valA, valB, labelA, labelB, sectorLabel;

  // --- 1. Hitung berdasarkan sektor aktif ---
  switch (_currentSector) {

    case 'transportasi': {
      const r  = calcTransportasi();
      netKg    = r.netKg;
      annualKg = r.annualKg;
      valA     = r.perKmG.toFixed(0);
      labelA   = 'g CO₂e/km';
      valB     = r.netKg.toFixed(2);
      labelB   = 'kg/orang';
      sectorLabel = `🚗 ${r.vd.label}`;
      renderFormulaTransportasi(r);
      break;
    }

    case 'industri': {
      const r  = calcIndustri();
      netKg    = r.netKg;
      annualKg = r.annualKg;
      valA     = r.ind.ef.toLocaleString('id-ID');
      labelA   = `kg CO₂e/${r.ind.unit}`;
      valB     = (r.netKg / 1000).toFixed(3);
      labelB   = 'ton CO₂e total';
      sectorLabel = `🏭 ${r.ind.label}`;
      renderFormulaIndustri(r);
      break;
    }

    case 'rumah': {
      const r  = calcRumah();
      netKg    = r.netKg;
      annualKg = r.annualKg;
      valA     = r.fromKwh.toFixed(1);
      labelA   = 'kg dari listrik';
      valB     = r.fromLpg.toFixed(1);
      labelB   = 'kg dari LPG';
      sectorLabel = '🏠 Rumah Tangga';
      renderFormulaRumah(r);
      break;
    }

    case 'digital': {
      const r  = calcDigital();
      netKg    = r.netKg;
      annualKg = r.annualKg;
      valA     = r.fromStream.toFixed(3);
      labelA   = 'kg dari streaming';
      valB     = r.fromOther.toFixed(3);
      labelB   = 'kg email + AI';
      sectorLabel = '📱 Digital';
      renderFormulaDigital(r);
      break;
    }

    default:
      console.warn(`Sektor tidak dikenal: ${_currentSector}`);
      return;
  }

  // --- 2. Update result panel (dari ui.js) ---
  const level = updateResultPanel(
    netKg, annualKg, valA, valB, labelA, labelB
  );

  // --- 3. Jalankan animasi canvas ---
  runAnimations(netKg, level.key);

  // --- 4. Render perbandingan, dampak, solusi ---
  renderComparison(netKg);
  renderImpact(level.key);
  renderSolutions(_currentSector);

  // --- 5. Tambah ke riwayat ---
  addHistory(sectorLabel, netKg);

  // --- 6. Tampilkan semua panel hasil ---
  showResultSections();

  // --- 7. Scroll ke hasil ---
  scrollToResult();
}

// =================== ANIMATIONS ===================

// ------------------------------------------------
//  runAnimations(netKg, lvlKey)
//  Menjalankan semua animasi canvas sekaligus
//
//  Untuk tambah animasi baru:
//  1. Tambah .anim-box + <canvas> di index.html
//  2. Buat js/animations/namabaru.js
//  3. Panggil fungsinya di sini
// ------------------------------------------------
function runAnimations(netKg, lvlKey) {
  // Normalisasi 0–1 untuk intensitas visual
  // 500 kg = intensitas penuh (1.0)
  const intensity = Math.min(netKg / 500, 1.0);

  animateSmoke(intensity, lvlKey);
  animateEarth(intensity, lvlKey);
  animateThermometer(intensity, lvlKey);
  animateTree(intensity, lvlKey);

  // Tambah animasi baru di sini ↓
  // animateOcean(intensity, lvlKey);
}

// =================== RESET ===================

// ------------------------------------------------
//  resetForm()
//  Kembalikan semua input ke nilai default
//  Dipanggil dari tombol Reset di HTML
// ------------------------------------------------
function resetForm() {
  // Reset semua slider ke default
  const sliderDefaults = [
    ['dist-slider',     '50',   'dist-val',     '50 km'],
    ['pass-slider',     '1',    'pass-val',     '1 orang'],
    ['kwh-slider',      '150',  'kwh-val',      '150 kWh'],
    ['lpg-slider',      '3',    'lpg-val',      '3 kg'],
    ['ac-slider',       '1',    'ac-val',       '1 unit'],
    ['waste-slider',    '0.7',  'waste-val',    '0.7 kg'],
    ['stream-slider',   '2',    'stream-val',   '2 jam'],
    ['game-slider',     '1',    'game-val',     '1 jam'],
    ['email-slider',    '20',   'email-val',    '20 email'],
    ['ai-slider',       '10',   'ai-val',       '10 query'],
    ['industry-slider', '10',   'industry-val', '10 ton'],
  ];

  sliderDefaults.forEach(([sliderId, val, labelId, labelText]) => {
    const slider = document.getElementById(sliderId);
    const label  = document.getElementById(labelId);
    if (slider) slider.value = val;
    if (label)  label.innerHTML = labelText;
  });

  // Reset select dropdown
  ['fuel-select', 'industry-time', 'rumah-time', 'digital-time']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.selectedIndex = 0;
    });

  // Reset toggle frekuensi ke "Sekali"
  document.querySelectorAll('.toggle-opt').forEach((btn, i) => {
    btn.classList.toggle('active', i === 0);
  });

  // Reset kendaraan ke motor_bebek
  document.querySelectorAll('.veh-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-key="motor_bebek"]')?.classList.add('active');

  // Reset industri ke semen
  document.querySelectorAll('[data-ikey]').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-ikey="semen"]')?.classList.add('active');
  _updateIndustryMeta();

  // Update visibilitas field
  _updateFuelVisibility();

  // Reset result panel dan sembunyikan section
  resetResultPanel();
  hideResultSections();

  // Hentikan semua animasi canvas
  if (typeof _smokeAnimId  !== 'undefined' && _smokeAnimId)  cancelAnimationFrame(_smokeAnimId);
  if (typeof _earthAnimId  !== 'undefined' && _earthAnimId)  cancelAnimationFrame(_earthAnimId);
  if (typeof _thermoAnimId !== 'undefined' && _thermoAnimId) cancelAnimationFrame(_thermoAnimId);
  if (typeof _treeAnimId   !== 'undefined' && _treeAnimId)   cancelAnimationFrame(_treeAnimId);
}
