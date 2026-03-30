// ================================================
//  js/ui.js
//  Semua fungsi yang merender data ke DOM:
//  - updateResultPanel()  → angka utama + badge
//  - renderComparison()   → bar perbandingan
//  - renderImpact()       → kartu dampak
//  - renderSolutions()    → kartu solusi per sektor
//  - renderAllSolutions() → tips global panel 08
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
//
//  PARAMETER:
//  - netKg    : total emisi (kg CO₂e)
//  - annualKg : estimasi tahunan (kg CO₂e)
//  - valA     : nilai stat kiri (string)
//  - valB     : nilai stat tengah (string)
//  - labelA   : label stat kiri
//  - labelB   : label stat tengah
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
//  Mengisi kartu dampak lingkungan
//
//  PARAMETER:
//  - lvlKey : 'low' | 'medium' | 'high'
// ------------------------------------------------
function renderImpact(lvlKey) {
  const impacts = IMPACTS[lvlKey] || IMPACTS.medium;

  document.getElementById('impact-grid').innerHTML = impacts
    .map(imp => `
      <div class="impact-card ${imp.color}">
        <span class="ic-icon">${imp.icon}</span>
        <strong>${imp.title}</strong>
        <p>${imp.desc}</p>
      </div>`)
    .join('');
}

// ------------------------------------------------
//  renderSolutions(sectorKey)
//  Mengisi kartu solusi dinamis sesuai sektor aktif
//
//  PARAMETER:
//  - sectorKey : 'transportasi'|'industri'|'rumah'|'digital'
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
    solutions.map(s => _solutionHTML(s)).join('');
}

// ------------------------------------------------
//  renderAllSolutions()
//  Membangun panel tips global (Panel 08)
//  Dipanggil sekali saat DOMContentLoaded
// ------------------------------------------------
function renderAllSolutions() {
  document.getElementById('solution-list-full').innerHTML =
    ALL_SOLUTIONS.map(s => _solutionHTML(s)).join('');
}

// ------------------------------------------------
//  addHistory(sectorLabel, netKg)
//  Menambah entri ke riwayat perhitungan
// ------------------------------------------------
function addHistory(sectorLabel, netKg) {
  // Baca riwayat dari modul-level array di main.js
  // (diakses via window._calcHistory)
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
//
//  PARAMETER:
//  - id       : id elemen DOM
//  - from     : nilai awal
//  - to       : nilai target
//  - duration : durasi ms
//  - decimals : jumlah desimal
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

// HTML template satu kartu solusi
function _solutionHTML(s) {
  return `
    <div class="sol-item">
      <div class="sol-num">${s.num}</div>
      <div class="sol-content">
        <strong>${s.icon} ${s.title}</strong>
        <p>${s.desc}</p>
        <div class="sol-reduction">⬇ ${s.reduction}</div>
      </div>
    </div>`;
}
