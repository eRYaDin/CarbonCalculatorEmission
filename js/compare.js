// ================================================
//  js/compare.js
//  Mode Perbandingan — bandingkan hingga 3
//  skenario dari sektor manapun sekaligus
//
//  FUNGSI GLOBAL:
//  - addToCompare()     → dipanggil tombol "+ Tambah"
//  - clearSlot(index)   → hapus satu slot
//  - resetAllSlots()    → reset semua slot
//
//  DEPENDENSI:
//  Semua js/data/* dan js/sectors/* harus dimuat dulu
// ================================================

// =================== STATE ===================
// Array 3 slot, isi null jika kosong
const _compareSlots = [null, null, null];

// Warna tiap slot
const SLOT_COLORS = ['#FF3B3B', '#3B8BFF', '#C03BFF'];
const SLOT_NAMES  = ['A', 'B', 'C'];

// =================== ADD TO COMPARE ===================

// ------------------------------------------------
//  addToCompare()
//  Dipanggil dari tombol "+ Tambah ke Perbandingan"
//  Membaca sektor aktif, menghitung emisi,
//  lalu memasukkan ke slot yang kosong
// ------------------------------------------------
function addToCompare() {
  // Cek apakah sedang di tab perbandingan
  // Kalau iya, jangan lakukan apa-apa
  if (typeof _currentSector !== 'undefined' &&
      _currentSector === 'perbandingan') {
    _showToast('⚠️ Pindah ke tab lain dulu untuk isi skenario!');
    return;
  }

  // Cari slot kosong pertama
  const slotIndex = _compareSlots.findIndex(s => s === null);
  if (slotIndex === -1) {
    _showToast('💥 Semua slot penuh! Hapus salah satu dulu.');
    return;
  }

  // Hitung emisi sesuai sektor aktif
  const result = _calcCurrentSector();
  if (!result) return;

  // Simpan ke slot
  _compareSlots[slotIndex] = result;

  // Update UI slot
  _renderSlot(slotIndex, result);

  // Update hasil perbandingan jika ada ≥2 slot terisi
  _updateCompareResult();

  // Feedback ke user
  _showToast(`✅ Ditambah ke Skenario ${SLOT_NAMES[slotIndex]}!`);
}

// =================== CALC HELPER ===================

// ------------------------------------------------
//  _calcCurrentSector()
//  Menghitung emisi sesuai sektor yang sedang aktif
//  Mengembalikan objek standar untuk perbandingan
// ------------------------------------------------
function _calcCurrentSector() {
  const sector = typeof _currentSector !== 'undefined'
    ? _currentSector
    : 'transportasi';

  try {
    switch (sector) {
      case 'transportasi': {
        const r = calcTransportasi();
        return {
          sector   : 'transportasi',
          icon     : r.vd.icon,
          label    : r.vd.label,
          sectorLabel: '🚗 Transportasi',
          netKg    : r.netKg,
          annualKg : r.annualKg,
          details  : [
            { label: 'Kendaraan',    val: `${r.vd.icon} ${r.vd.label}` },
            { label: 'Jarak',        val: `${r.distance} km` },
            { label: 'Frekuensi',    val: r.freq.label },
            { label: 'Penumpang',    val: `${r.pax} orang` },
            { label: 'Emisi/km',     val: `${r.perKmG.toFixed(0)} g CO₂e` },
            { label: 'Est. Tahunan', val: `${Math.round(r.annualKg)} kg` },
          ],
        };
      }

      case 'industri': {
        const r = calcIndustri();
        return {
          sector   : 'industri',
          icon     : r.ind.icon,
          label    : r.ind.label,
          sectorLabel: '🏭 Industri',
          netKg    : r.netKg,
          annualKg : r.annualKg,
          details  : [
            { label: 'Jenis',        val: `${r.ind.icon} ${r.ind.label}` },
            { label: 'Volume',       val: `${r.volume} ${r.ind.unit}` },
            { label: 'Faktor Emisi', val: `${r.ind.ef.toLocaleString('id-ID')} kg/${r.ind.unit}` },
            { label: 'Est. Tahunan', val: `${Math.round(r.annualKg).toLocaleString('id-ID')} kg` },
          ],
        };
      }

      case 'rumah': {
        const r = calcRumah();
        return {
          sector   : 'rumah',
          icon     : '🏠',
          label    : 'Rumah Tangga',
          sectorLabel: '🏠 Rumah Tangga',
          netKg    : r.netKg,
          annualKg : r.annualKg,
          details  : [
            { label: 'Listrik',      val: `${r.kwh} kWh → ${r.fromKwh.toFixed(1)} kg` },
            { label: 'LPG',          val: `${r.lpg} kg → ${r.fromLpg.toFixed(1)} kg` },
            { label: 'AC',           val: `${r.ac} unit → ${r.fromAc.toFixed(1)} kg` },
            { label: 'Sampah',       val: `${r.waste} kg/hr → ${r.fromWaste.toFixed(1)} kg` },
            { label: 'Est. Tahunan', val: `${Math.round(r.annualKg)} kg` },
          ],
        };
      }

      case 'digital': {
        const r = calcDigital();
        return {
          sector   : 'digital',
          icon     : '📱',
          label    : 'Aktivitas Digital',
          sectorLabel: '📱 Digital',
          netKg    : r.netKg,
          annualKg : r.annualKg,
          details  : [
            { label: 'Streaming',    val: `${r.streamH} jam/hr → ${r.fromStream.toFixed(3)} kg` },
            { label: 'Gaming',       val: `${r.gameH} jam/hr → ${r.fromGame.toFixed(3)} kg` },
            { label: 'Email+AI',     val: `${r.fromOther.toFixed(3)} kg` },
            { label: 'Est. Tahunan', val: `${Math.round(r.annualKg)} kg` },
          ],
        };
      }

      default:
        _showToast('⚠️ Pilih sektor dulu!');
        return null;
    }
  } catch (err) {
    console.error('Compare calc error:', err);
    _showToast('⚠️ Error saat hitung. Coba isi semua data dulu.');
    return null;
  }
}

// =================== RENDER SLOT ===================

function _renderSlot(index, data) {
  const color = SLOT_COLORS[index];
  const level = typeof getLevel === 'function' ? getLevel(data.netKg) : { label: '', color };

  // Update title
  document.getElementById(`cmp-title-${index}`).textContent =
    `${data.icon} ${data.label}`;

  // Build body HTML
  const detailRows = data.details.map(d => `
    <div class="cmp-data-row">
      <span>${d.label}</span>
      <span class="val">${d.val}</span>
    </div>`).join('');

  // Level badge
  const lvl = typeof getLevel === 'function' ? getLevel(data.netKg) : null;
  const badgeColor = lvl
    ? (lvl.cls === 'lvl-green' ? 'var(--green)' : lvl.cls === 'lvl-yellow' ? 'var(--yellow)' : lvl.cls === 'lvl-orange' ? 'var(--orange)' : 'var(--red)')
    : color;

  document.getElementById(`cmp-body-${index}`).innerHTML = `
    <div>
      <div class="cmp-data-kg" style="color:${color}">
        ${data.netKg < 0.001
          ? data.netKg.toFixed(5)
          : data.netKg < 1
          ? data.netKg.toFixed(3)
          : data.netKg.toFixed(2)}
      </div>
      <div class="cmp-data-unit">kg CO₂e · ${data.sectorLabel}</div>
      ${lvl ? `<div class="cmp-badge" style="background:${badgeColor}">${lvl.label}</div>` : ''}
      <div class="cmp-data-rows" style="margin-top:12px">${detailRows}</div>
    </div>`;

  // Mark slot as filled
  document.getElementById(`cmp-slot-${index}`).classList.add('has-data');
}

// =================== COMPARE RESULT ===================

function _updateCompareResult() {
  const filled = _compareSlots.filter(s => s !== null);
  if (filled.length < 2) {
    document.getElementById('compare-result').classList.add('hidden');
    return;
  }

  document.getElementById('compare-result').classList.remove('hidden');

  _renderCompareChart();
  _renderWinner();
  _renderCompareTable();
}

// ------------------------------------------------
//  Bar chart horizontal
// ------------------------------------------------
function _renderCompareChart() {
  const max = Math.max(..._compareSlots
    .filter(s => s !== null)
    .map(s => s.netKg), 0.001);

  let html = '';
  _compareSlots.forEach((slot, i) => {
    if (!slot) return;
    const pct = ((slot.netKg / max) * 100).toFixed(1);
    const color = SLOT_COLORS[i];
    const displayKg = slot.netKg < 0.001
      ? slot.netKg.toFixed(5) + ' kg'
      : slot.netKg < 1
      ? slot.netKg.toFixed(3) + ' kg'
      : slot.netKg.toFixed(2) + ' kg';

    html += `
      <div class="compare-chart-item">
        <div class="compare-chart-label">
          <span>${SLOT_NAMES[i]}. ${slot.icon} ${slot.label} <span style="color:rgba(26,16,8,0.5); font-weight:400">(${slot.sectorLabel})</span></span>
          <span style="color:${color}; font-family:'Bangers',cursive; font-size:1rem">${displayKg} CO₂e</span>
        </div>
        <div class="compare-chart-bar-wrap">
          <div class="compare-chart-bar"
               style="background-color:${color}; width:0%"
               data-pct="${pct}">
            ${pct}%
          </div>
        </div>
      </div>`;
  });

  document.getElementById('compare-chart').innerHTML = html;

  // Animasi bar
  setTimeout(() => {
    document.querySelectorAll('.compare-chart-bar').forEach(bar => {
      bar.style.width = bar.dataset.pct + '%';
    });
  }, 100);
}

// ------------------------------------------------
//  Winner box — skenario paling rendah emisinya
// ------------------------------------------------
function _renderWinner() {
  const filled = _compareSlots
    .map((s, i) => s ? { ...s, index: i } : null)
    .filter(s => s !== null);

  if (filled.length < 2) return;

  // Sort by netKg ascending — terendah = paling hijau
  const sorted = [...filled].sort((a, b) => a.netKg - b.netKg);
  const winner = sorted[0];
  const worst  = sorted[sorted.length - 1];

  const diff = worst.netKg - winner.netKg;
  const pctDiff = worst.netKg > 0
    ? ((diff / worst.netKg) * 100).toFixed(0)
    : 0;

  // Cek apakah semua sama
  const allSame = sorted.every(s => Math.abs(s.netKg - winner.netKg) < 0.0001);

  let winnerHTML;
  if (allSame) {
    winnerHTML = `
      <div class="compare-winner-box">
        <div class="win-icon">🤝</div>
        <div>
          <span class="win-title">HASIL SAMA!</span>
          <span class="win-desc">
            Semua skenario menghasilkan emisi yang setara.
          </span>
        </div>
      </div>`;
  } else {
    winnerHTML = `
      <div class="compare-winner-box">
        <div class="win-icon">🏆</div>
        <div>
          <span class="win-title">
            PALING RENDAH: Skenario ${SLOT_NAMES[winner.index]} —
            ${winner.icon} ${winner.label}
          </span>
          <span class="win-desc">
            Menghasilkan <strong>${winner.netKg.toFixed(3)} kg CO₂e</strong>,
            lebih rendah <strong>${diff.toFixed(2)} kg (${pctDiff}%)</strong>
            dibanding skenario tertinggi
            (${SLOT_NAMES[worst.index]}. ${worst.label} = ${worst.netKg.toFixed(2)} kg).
            <br>
            ${_getCompareTip(winner, worst)}
          </span>
        </div>
      </div>`;
  }

  document.getElementById('compare-winner').innerHTML = winnerHTML;

  // Highlight slot pemenang
  document.querySelectorAll('.cmp-slot').forEach(el => el.classList.remove('is-winner'));
  if (!allSame) {
    document.getElementById(`cmp-slot-${winner.index}`)?.classList.add('is-winner');
  }
}

// ------------------------------------------------
//  Tabel detail semua skenario
// ------------------------------------------------
function _renderCompareTable() {
  const filled = _compareSlots
    .map((s, i) => s ? { ...s, index: i } : null)
    .filter(s => s !== null);

  const rows = filled.map(s => {
    const color = SLOT_COLORS[s.index];
    const lvl   = typeof getLevel === 'function' ? getLevel(s.netKg) : null;
    const trees = Math.max(1, Math.ceil(s.netKg / 22));
    const isWinner = s.netKg === Math.min(...filled.map(f => f.netKg));
    return `
      <tr class="${isWinner ? 'winner-row' : ''}">
        <td>
          <strong style="color:${color}; font-family:'Bangers',cursive; font-size:0.95rem">
            ${SLOT_NAMES[s.index]}
          </strong>
        </td>
        <td>${s.icon} ${s.label}</td>
        <td>${s.sectorLabel}</td>
        <td style="font-family:'Bangers',cursive; font-size:1rem; color:${color}">
          ${s.netKg < 0.001 ? s.netKg.toFixed(5) : s.netKg.toFixed(2)} kg
        </td>
        <td>${Math.round(s.annualKg).toLocaleString('id-ID')} kg</td>
        <td>${trees} 🌳</td>
        <td>${lvl ? `<span style="font-family:'Bangers',cursive">${lvl.label}</span>` : '–'}</td>
        <td>${isWinner ? '🏆 Terbaik' : '–'}</td>
      </tr>`;
  }).join('');

  document.getElementById('compare-table').innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th>No</th>
          <th>Skenario</th>
          <th>Sektor</th>
          <th>Emisi</th>
          <th>Est. Tahunan</th>
          <th>Pohon Offset</th>
          <th>Level</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

// =================== CLEAR / RESET ===================

function clearSlot(index) {
  _compareSlots[index] = null;

  // Reset slot ke empty state
  const names = ['Skenario A', 'Skenario B', 'Skenario C'];
  document.getElementById(`cmp-title-${index}`).textContent = names[index];
  document.getElementById(`cmp-body-${index}`).innerHTML = `
    <div class="cmp-empty-state">
      <div class="cmp-empty-icon">📋</div>
      <p>Pilih sektor & isi data,<br>lalu klik <strong>"+ Tambah ke Perbandingan"</strong></p>
    </div>`;

  document.getElementById(`cmp-slot-${index}`)
    .classList.remove('has-data', 'is-winner');

  _updateCompareResult();
  _showToast(`🗑️ Skenario ${SLOT_NAMES[index]} dihapus`);
}

function resetAllSlots() {
  [0, 1, 2].forEach(i => {
    _compareSlots[i] = null;
  });
  [0, 1, 2].forEach(i => clearSlot(i));
  _showToast('↺ Semua skenario direset');
}

// =================== HELPERS ===================

// Tip kontekstual berdasarkan perbandingan
function _getCompareTip(winner, worst) {
  const tips = {
    transportasi: {
      transportasi: '🚲 Pilih moda yang lebih efisien atau tambah penumpang untuk kurangi emisi per orang.',
      rumah        : '🏠 Emisi transportasi seringkali lebih tinggi dari konsumsi rumah tangga harian.',
      industri     : '🏭 Emisi industri jauh lebih besar — perlu kebijakan dan teknologi bersih skala besar.',
      digital      : '📱 Emisi digital jauh lebih kecil dari transportasi. Fokus ke moda kendaraan!',
    },
    rumah: {
      transportasi : '🚗 Coba kurangi frekuensi perjalanan atau ganti ke moda lebih efisien.',
      rumah        : '💡 Pasang panel surya dan ganti ke peralatan inverter untuk kurangi emisi rumah.',
      industri     : '🏭 Skala industri jauh melampaui rumah tangga — perlu intervensi kebijakan.',
      digital      : '📱 Emisi digital sangat kecil. Fokus efisiensi energi di rumah.',
    },
  };

  const key1 = winner.sector;
  const key2 = worst.sector;
  return (tips[key1] && tips[key1][key2]) || '💡 Setiap pengurangan emisi berarti untuk planet kita!';
}

// Toast notifikasi muncul dari bawah
function _showToast(msg) {
  // Hapus toast lama jika ada
  const old = document.getElementById('cmp-toast-el');
  if (old) old.remove();

  const toast = document.createElement('div');
  toast.id        = 'cmp-toast-el';
  toast.className = 'cmp-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  // Animasi muncul
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  // Auto hilang setelah 2.5 detik
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}
