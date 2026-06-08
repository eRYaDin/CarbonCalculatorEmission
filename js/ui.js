// ================================================
//  js/ui.js
//  Semua fungsi yang merender data ke DOM:
//  - updateResultPanel()  → angka utama + badge
//  - renderComparison()   → bar perbandingan
//  - renderImpact()       → kartu dampak (+ expand)
//  - renderSolutions()    → kartu solusi per sektor (+ expand)
//  - renderAllSolutions() → tips global panel 08 (+ expand)
//  - addHistory()         → riwayat perhitungan
//  - showResultSections() → tampilkan panel tersembunyi
//  - hideResultSections() → sembunyikan panel
//  - animateNumber()      → counter angka naik halus
//
//  DEPENDENSI:
//  - js/data/dampak.js   (IMPACTS, getLevel)
//  - js/data/solusi.js   (SOLUTIONS_*, ALL_SOLUTIONS)
// ================================================

// ------------------------------------------------
//  updateResultPanel(netKg, annualKg, valA, valB,
//                   labelA, labelB)
//  Mengisi semua elemen di result panel
// ------------------------------------------------
function updateResultPanel(netKg, annualKg, valA, valB, labelA, labelB) {
  const level = getLevel(netKg);
  const trees = Math.max(1, Math.ceil(netKg / 22));

  // Tampilkan area aktif, sembunyikan idle
  document.getElementById('result-idle').style.display   = 'none';
  document.getElementById('result-active').style.display = 'block';

  // Animasi angka utama naik
  animateNumber('result-num', 0, netKg, 900, 2);
  document.getElementById('result-num').style.color = level.color;

  // Badge level
  const badge = document.getElementById('level-badge');
  badge.textContent = level.label;
  badge.className   = `level-explosion ${level.cls}`;
  badge.style.display = 'inline-block';

  // Stat boxes
  document.getElementById('stat-a').textContent     = valA;
  document.getElementById('stat-a-lbl').textContent = labelA;
  document.getElementById('stat-b').textContent     = valB;
  document.getElementById('stat-b-lbl').textContent = labelB;
  animateNumber('stat-annual', 0, Math.round(annualKg), 700, 0);

  // Offset pohon
  document.getElementById('trees-count').textContent = trees;

  return level;  // Kembalikan level untuk dipakai di tempat lain
}

// ------------------------------------------------
//  renderComparison(netKg)
//  Mengisi bar perbandingan emisi
// ------------------------------------------------
function renderComparison(netKg) {
  const items = [
    {
      label : '👤 Emisimu',
      val   : netKg,
      cls   : 'cmp-you',
      disp  : `${netKg.toFixed(2)} kg`,
    },
    {
      label : '🇮🇩 Rata² RI/kapita/tahun',
      val   : 2000,
      cls   : 'cmp-orange',
      disp  : '2.0 ton',
    },
    {
      label : '🌍 Rata² global/tahun',
      val   : 4600,
      cls   : 'cmp-red',
      disp  : '4.6 ton',
    },
    {
      label : '🌡️ Batas aman 1.5°C/orang',
      val   : 1100,
      cls   : 'cmp-blue',
      disp  : '1.1 ton',
    },
    {
      label : '✈️ JKT–Bali PP',
      val   : 180,
      cls   : 'cmp-purple',
      disp  : '180 kg',
    },
  ];

  const max = Math.max(...items.map(i => i.val), 0.01);

  const html = items.map(item => {
    const pct = ((item.val / max) * 100).toFixed(1);
    return `
      <div class="cmp-item">
        <div class="cmp-header">
          <span>${item.label}</span>
          <span>${item.disp}</span>
        </div>
        <div class="cmp-track">
          <div class="cmp-fill ${item.cls}"
               data-pct="${pct}"
               style="width:0%">
          </div>
        </div>
      </div>`;
  }).join('');

  document.getElementById('compare-bars').innerHTML = html;

  // Animasi bar melebar setelah render
  setTimeout(() => {
    document.querySelectorAll('.cmp-fill').forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
  }, 120);
}

// ------------------------------------------------
//  renderImpact(lvlKey)
//  Mengisi kartu dampak lingkungan dengan expand
// ------------------------------------------------
function renderImpact(lvlKey) {
  const impacts = IMPACTS[lvlKey] || IMPACTS.medium;

  document.getElementById('impact-grid').innerHTML = impacts
    .map((imp, i) => `
      <div class="impact-card ${imp.color}" id="impact-card-${i}">
        <span class="ic-icon">${imp.icon}</span>
        <strong>${imp.title}</strong>
        <p>${imp.desc}</p>
        ${imp.detail ? `
          <div class="expand-content" id="impact-expand-${i}">
            <div class="expand-inner">${imp.detail}</div>
          </div>
          <button class="btn-expand" onclick="toggleExpand('impact', ${i})" id="impact-btn-${i}">
            Baca Selengkapnya ▼
          </button>
        ` : ''}
      </div>`)
    .join('');
}

// ------------------------------------------------
//  renderSolutions(sectorKey)
//  Mengisi kartu solusi dinamis sesuai sektor aktif
// ------------------------------------------------
function renderSolutions(sectorKey) {
  const solutionMap = {
    transportasi : SOLUTIONS_TRANSPORT,
    industri     : SOLUTIONS_INDUSTRI,
    rumah        : SOLUTIONS_RUMAH,
    digital      : SOLUTIONS_DIGITAL,
  };

  const solutions = solutionMap[sectorKey] || SOLUTIONS_TRANSPORT;

  document.getElementById('solution-dynamic').innerHTML =
    solutions.map((s, i) => _solutionHTML(s, `dynamic-${i}`)).join('');
}

// ------------------------------------------------
//  renderAllSolutions()
//  Membangun panel tips global (Panel 08)
//  Dipanggil sekali saat DOMContentLoaded
// ------------------------------------------------
function renderAllSolutions() {
  document.getElementById('solution-list-full').innerHTML =
    ALL_SOLUTIONS.map((s, i) => _solutionHTML(s, `global-${i}`)).join('');
}

// ------------------------------------------------
//  toggleExpand(type, index)
//  Toggle expand/collapse kartu dampak atau solusi
//  Hanya 1 kartu terbuka per grup (accordion)
// ------------------------------------------------
function toggleExpand(type, index) {
  const expandEl = document.getElementById(`${type}-expand-${index}`);
  const btnEl    = document.getElementById(`${type}-btn-${index}`);
  if (!expandEl || !btnEl) return;

  const isOpen = expandEl.classList.contains('expand-open');

  // Tutup semua expand yang terbuka dalam grup yang sama
  document.querySelectorAll(`.expand-content.expand-open`).forEach(el => {
    if (el.id.startsWith(type)) {
      el.classList.remove('expand-open');
      // Update tombol yang sesuai
      const matchId = el.id.replace('expand', 'btn');
      const matchBtn = document.getElementById(matchId);
      if (matchBtn) {
        matchBtn.textContent = 'Baca Selengkapnya ▼';
        matchBtn.classList.remove('btn-expand-active');
      }
    }
  });

  // Toggle kartu yang diklik (jika sebelumnya belum terbuka)
  if (!isOpen) {
    expandEl.classList.add('expand-open');
    btnEl.textContent = 'Tutup ▲';
    btnEl.classList.add('btn-expand-active');
  }
}

// ------------------------------------------------
//  addHistory(sectorLabel, netKg)
//  Menambah entri ke riwayat perhitungan
// ------------------------------------------------
function addHistory(sectorLabel, netKg) {
  if (!window._calcHistory) window._calcHistory = [];

  const entry = {
    label : sectorLabel,
    kg    : netKg.toFixed(2),
    color : netKg < 20  ? '#3BFF8B' :
            netKg < 100 ? '#FFD000' : '#FF3B3B',
    time  : new Date().toLocaleTimeString('id-ID', {
      hour  : '2-digit',
      minute: '2-digit',
    }),
  };

  window._calcHistory.unshift(entry);
  if (window._calcHistory.length > 10) window._calcHistory.pop();

  _renderHistory();
}

// ------------------------------------------------
//  showResultSections()
//  Tampilkan semua panel yang tersembunyi setelah hitung
// ------------------------------------------------
function showResultSections() {
  document.getElementById('anim-panel').style.display = '';
  document.getElementById('section-compare').classList.remove('hidden');
  document.getElementById('section-dampak').classList.remove('hidden');
  document.getElementById('section-formula').classList.remove('hidden');
}

// ------------------------------------------------
//  hideResultSections()
//  Sembunyikan semua panel hasil (saat reset/ganti sektor)
// ------------------------------------------------
function hideResultSections() {
  document.getElementById('anim-panel').style.display = 'none';
  document.getElementById('section-compare').classList.add('hidden');
  document.getElementById('section-dampak').classList.add('hidden');
  document.getElementById('section-formula').classList.add('hidden');
}

// ------------------------------------------------
//  resetResultPanel()
//  Kembalikan result panel ke state idle
// ------------------------------------------------
function resetResultPanel() {
  document.getElementById('result-idle').style.display   = '';
  document.getElementById('result-active').style.display = 'none';
}

// ------------------------------------------------
//  animateNumber(id, from, to, duration, decimals)
//  Animasi counter angka naik/turun secara halus
// ------------------------------------------------
function animateNumber(id, from, to, duration, decimals) {
  const el    = document.getElementById(id);
  if (!el) return;

  const start = performance.now();

  function step(timestamp) {
    const elapsed  = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);

    // Easing: ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = (from + (to - from) * eased).toFixed(decimals);

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// ------------------------------------------------
//  scrollToResult()
//  Scroll halus ke result panel
// ------------------------------------------------
function scrollToResult() {
  setTimeout(() => {
    document.getElementById('result-panel')
      .scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

// ================================================
//  PRIVATE HELPERS
// ================================================

// Render ulang daftar riwayat ke DOM
function _renderHistory() {
  const list = document.getElementById('history-list');
  if (!window._calcHistory || window._calcHistory.length === 0) {
    list.innerHTML = '<div class="h-empty">BELUM ADA DATA, BRO! HITUNG DULU! 💥</div>';
    return;
  }

  list.innerHTML = window._calcHistory.map(h => `
    <div class="h-item">
      <div>
        <strong>${h.label}</strong>
        <br>
        <span style="font-size:0.7rem; color:rgba(26,16,8,0.45)">
          ${h.time}
        </span>
      </div>
      <div class="h-val" style="color:${h.color}">
        ${h.kg} kg
      </div>
    </div>`).join('');
}

// HTML template satu kartu solusi (dengan expand)
function _solutionHTML(s, uniqueId) {
  const expandId = `sol-expand-${uniqueId}`;
  const btnId    = `sol-btn-${uniqueId}`;

  return `
    <div class="sol-item">
      <div class="sol-num">${s.num}</div>
      <div class="sol-content">
        <strong>${s.icon} ${s.title}</strong>
        <p>${s.desc}</p>
        <div class="sol-reduction">⬇ ${s.reduction}</div>
        ${s.detail ? `
          <div class="expand-content" id="${expandId}">
            <div class="expand-inner">${s.detail}</div>
          </div>
          <button class="btn-expand" onclick="toggleExpandSol('${uniqueId}')" id="${btnId}">
            Baca Selengkapnya ▼
          </button>
        ` : ''}
      </div>
    </div>`;
}

// Toggle expand untuk kartu solusi (id berbasis string)
function toggleExpandSol(uniqueId) {
  const expandEl = document.getElementById(`sol-expand-${uniqueId}`);
  const btnEl    = document.getElementById(`sol-btn-${uniqueId}`);
  if (!expandEl || !btnEl) return;

  const isOpen = expandEl.classList.contains('expand-open');

  // Tutup semua expand solusi yang terbuka
  document.querySelectorAll('.expand-content.expand-open').forEach(el => {
    if (el.id.startsWith('sol-expand-')) {
      el.classList.remove('expand-open');
      const matchBtnId = el.id.replace('expand', 'btn');
      const matchBtn = document.getElementById(matchBtnId);
      if (matchBtn) {
        matchBtn.textContent = 'Baca Selengkapnya ▼';
        matchBtn.classList.remove('btn-expand-active');
      }
    }
  });

  if (!isOpen) {
    expandEl.classList.add('expand-open');
    btnEl.textContent = 'Tutup ▲';
    btnEl.classList.add('btn-expand-active');
  }
}
