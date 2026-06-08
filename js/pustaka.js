// ================================================
//  js/pustaka.js
//  Render halaman Daftar Pustaka
//
//  DEPENDENSI:
//  - js/data/pustaka.js (PUSTAKA_DATA)
//
//  Dipanggil oleh:
//  - main.js → DOMContentLoaded → renderPustaka()
// ================================================

function renderPustaka() {
  const container = document.getElementById('pustaka-content');
  if (!container) return;

  const sectorColors = [
    'var(--red)',
    'var(--blue)',
    'var(--orange)',
    'var(--green)',
    'var(--purple)',
  ];

  let html = '';

  PUSTAKA_DATA.forEach((group, gi) => {
    const color = sectorColors[gi % sectorColors.length];

    html += `
      <div class="pustaka-group">
        <div class="pustaka-sector-label" style="background:${color}">
          ${group.sektor}
        </div>
        <div class="pustaka-list">`;

    group.sumber.forEach((s, si) => {
      const linkHTML = s.url
        ? `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="pustaka-link">🔗 ${s.url}</a>`
        : `<span class="pustaka-link pustaka-offline">📄 Sumber offline / dokumen cetak</span>`;

      html += `
          <div class="pustaka-item" style="animation-delay:${si * 0.08}s">
            <div class="pustaka-num">${si + 1}</div>
            <div class="pustaka-body">
              <strong class="pustaka-nama">${s.nama}</strong>
              <p class="pustaka-desc">${s.desc}</p>
              ${linkHTML}
            </div>
          </div>`;
    });

    html += `
        </div>
      </div>`;
  });

  container.innerHTML = html;
}
