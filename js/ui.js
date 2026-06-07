// ================================================
//  js/ui.js
//  Render hasil perhitungan ke DOM
//  Mengelola tampilan panel hasil, dampak, solusi,
//  perbandingan, dan riwayat
//
//  DEPENDENSI: js/data/dampak.js, js/data/solusi.js
//  DIGUNAKAN OLEH: js/main.js
// ================================================

// =================== LEVEL EMISI ===================

// Threshold level emisi (kg CO₂e)
const LEVELS = [
  { key: 'green',  label: '💚 RENDAH — ECO WARRIOR!',  cls: 'lvl-green',  max: 5,   color: '#22a849' },
  { key: 'yellow', label: '💛 SEDANG — MASIH OK!',      cls: 'lvl-yellow', max: 50,  color: '#f0c020' },
  { key: 'orange', label: '🧡 TINGGI — WASPADA!',       cls: 'lvl-orange', max: 200, color: '#ff8c00' },
  { key: 'red',    label: '❤️ SANGAT TINGGI — BAHAYA!', cls: 'lvl-red',    max: Infinity, color: '#e02020' },
];

function getLevel(kg) {
  return LEVELS.find(l => kg <= l.max) || LEVELS[LEVELS.length - 1];
}

// =================== UPDATE RESULT PANEL ===================

function updateResultPanel(netKg, annualKg, valA, valB, labelA, labelB) {
  // Tampilkan result active, sembunyikan idle
  document.getElementById('result-idle').style.display = 'none';
  document.getElementById('result-active').style.display = '';

  const level = getLevel(netKg);

  // Angka besar
  const numEl = document.getElementById('result-num');
  numEl.textContent = netKg < 0.001
    ? netKg.toFixed(5)
    : netKg < 1
    ? netKg.toFixed(3)
    : netKg.toFixed(2);
  numEl.style.color = level.color;

  // Badge level
  const badge = document.getElementById('level-badge');
  badge.textContent = level.label;
  badge.className = 'level-explosion ' + level.cls;
  badge.style.display = 'inline-block';
  // Re-trigger animation
  badge.style.animation = 'none';
  badge.offsetHeight; // reflow
  badge.style.animation = '';

  // Stat boxes
  document.getElementById('stat-a').textContent = valA;
  document.getElementById('stat-a-lbl').textContent = labelA;
  document.getElementById('stat-b').textContent = valB;
  document.getElementById('stat-b-lbl').textContent = labelB;
  document.getElementById('stat-annual').textContent = Math.round(annualKg).toLocaleString('id-ID');

  // Pohon offset (1 pohon ≈ 22 kg CO₂/tahun)
  const trees = Math.max(1, Math.ceil(annualKg / 22));
  document.getElementById('trees-count').textContent = trees.toLocaleString('id-ID');

  return level;
}

// =================== RESET RESULT PANEL ===================

function resetResultPanel() {
  document.getElementById('result-idle').style.display = '';
  document.getElementById('result-active').style.display = 'none';
  document.getElementById('result-num').textContent = '0.00';
  document.getElementById('result-num').style.color = '#22a849';
  document.getElementById('level-badge').style.display = 'none';
}

// =================== SHOW/HIDE RESULT SECTIONS ===================

function showResultSections() {
  ['anim-panel', 'section-compare', 'section-dampak', 'section-formula'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = '';
      el.classList.remove('hidden');
    }
  });
}

function hideResultSections() {
  ['anim-panel', 'section-compare', 'section-dampak', 'section-formula'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = 'none';
      el.classList.add('hidden');
    }
  });
}

// =================== RENDER COMPARISON ===================

function renderComparison(netKg) {
  const comparisons = [
    { label: '🚗 Emisimu',             kg: netKg,  cls: 'cmp-you' },
    { label: '🇮🇩 Rata² Harian RI',     kg: 7.12,   cls: 'cmp-orange' },
    { label: '🌏 Rata² Harian Global', kg: 12.33,  cls: 'cmp-red' },
    { label: '🇪🇺 Rata² Harian EU',     kg: 17.26,  cls: 'cmp-blue' },
    { label: '🇺🇸 Rata² Harian US',     kg: 40.55,  cls: 'cmp-purple' },
  ];

  const max = Math.max(...comparisons.map(c => c.kg), 0.01);
  let html = '';

  comparisons.forEach(c => {
    const pct = Math.min((c.kg / max) * 100, 100).toFixed(1);
    html += `
      <div class="cmp-item">
        <div class="cmp-header">
          <span>${c.label}</span>
          <span>${c.kg.toFixed(2)} kg/hari</span>
        </div>
        <div class="cmp-track">
          <div class="cmp-fill ${c.cls}" style="width:0%" data-w="${pct}%"></div>
        </div>
      </div>`;
  });

  document.getElementById('compare-bars').innerHTML = html;

  // Animate bars
  setTimeout(() => {
    document.querySelectorAll('.cmp-fill').forEach(bar => {
      bar.style.width = bar.dataset.w;
    });
  }, 100);
}

// =================== RENDER IMPACT ===================

function renderImpact(levelKey) {
  const impacts = DAMPAK[levelKey] || DAMPAK.green;
  let html = '';

  impacts.forEach(item => {
    html += `
      <div class="impact-card ${item.color}">
        <span class="ic-icon">${item.icon}</span>
        <strong>${item.title}</strong>
        <p>${item.desc}</p>
      </div>`;
  });

  document.getElementById('impact-grid').innerHTML = html;
}

// =================== RENDER SOLUTIONS ===================

function renderSolutions(sector) {
  const sols = SOLUTIONS[sector] || [];
  let html = '';

  sols.forEach((sol, i) => {
    html += `
      <div class="sol-item">
        <div class="sol-num">${i + 1}</div>
        <div class="sol-content">
          <strong>${sol.title}</strong>
          <p>${sol.desc}</p>
          <span class="sol-reduction">${sol.reduction}</span>
        </div>
      </div>`;
  });

  document.getElementById('solution-dynamic').innerHTML = html;
}

function renderAllSolutions() {
  let html = '';

  ALL_SOLUTIONS.forEach((sol, i) => {
    html += `
      <div class="sol-item">
        <div class="sol-num">${i + 1}</div>
        <div class="sol-content">
          <strong>${sol.title}</strong>
          <p>${sol.desc}</p>
          <span class="sol-reduction">${sol.reduction}</span>
        </div>
      </div>`;
  });

  document.getElementById('solution-list-full').innerHTML = html;
}

// =================== HISTORY ===================

function addHistory(sectorLabel, netKg) {
  const list = document.getElementById('history-list');

  // Hapus empty state jika ada
  const empty = list.querySelector('.h-empty');
  if (empty) empty.remove();

  const now = new Date();
  const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  const item = document.createElement('div');
  item.className = 'h-item';
  item.innerHTML = `
    <span>${sectorLabel} — ${time}</span>
    <span class="h-val" style="color:${getLevel(netKg).color}">
      ${netKg < 0.001 ? netKg.toFixed(5) : netKg < 1 ? netKg.toFixed(3) : netKg.toFixed(2)} kg CO₂e
    </span>`;

  list.prepend(item);

  // Limit history to 20 items
  while (list.children.length > 20) {
    list.removeChild(list.lastChild);
  }
}
