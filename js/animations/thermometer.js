// ================================================
//  js/animations/thermometer.js
//  Animasi termometer suhu bumi naik/turun
//  di canvas #canvas-thermo
//
//  FUNGSI YANG DIEKSPOR:
//  - animateThermometer(intensity, lvlKey)
//
//  PARAMETER:
//  - intensity : 0.0 – 1.0
//  - lvlKey    : 'low' | 'medium' | 'high'
// ================================================

let _thermoAnimId = null;

function animateThermometer(intensity, lvlKey) {
  if (_thermoAnimId) cancelAnimationFrame(_thermoAnimId);

  const canvas = document.getElementById('canvas-thermo');
  const ctx    = canvas.getContext('2d');
  const W      = canvas.width;
  const H      = canvas.height;

  // --- Konfigurasi skala suhu ---
  // Rentang visualisasi: 0°C – 4°C kenaikan suhu global
  const MAX_RISE   = 4.0;
  const targetRise = intensity * MAX_RISE;  // °C kenaikan target
  let   currentRise = 0;                   // Animasi dari bawah

  // Warna merkuri berdasarkan level
  const mercuryColor =
    lvlKey === 'low'    ? '#3BFF8B' :
    lvlKey === 'medium' ? '#FFD000' :
    lvlKey === 'high' && intensity > 0.7 ? '#FF1111' : '#FF3B3B';

  // Dimensi tabung termometer
  const TUBE = {
    x      : 80,           // Center X
    top    : 18,           // Y atas tabung
    bottom : 118,          // Y bawah tabung (sebelum bulb)
    width  : 16,           // Lebar tabung
    bulbR  : 16,           // Radius bulb bawah
    bulbY  : 130,          // Center Y bulb
  };

  // Batas skala pada tabung
  const SCALE_STEPS = 5;  // 0, 1, 2, 3, 4 °C

  function drawThermo() {
    ctx.clearRect(0, 0, W, H);

    // --- Latar ---
    ctx.fillStyle = '#f0f8f0';
    ctx.fillRect(0, 0, W, H);

    // --- Garis skala (background) ---
    _drawScaleLines(ctx, TUBE, SCALE_STEPS, MAX_RISE);

    // --- Tabung (luar) ---
    ctx.fillStyle   = '#ddeedd';
    ctx.strokeStyle = '#1A1008';
    ctx.lineWidth   = 2.5;
    _roundRect(
      ctx,
      TUBE.x - TUBE.width / 2,
      TUBE.top,
      TUBE.width,
      TUBE.bottom - TUBE.top,
      6, true, true
    );

    // --- Bulb (bawah) ---
    ctx.beginPath();
    ctx.arc(TUBE.x, TUBE.bulbY, TUBE.bulbR, 0, Math.PI * 2);
    ctx.fillStyle = mercuryColor;
    ctx.fill();
    ctx.strokeStyle = '#1A1008';
    ctx.lineWidth   = 2.5;
    ctx.stroke();

    // --- Merkuri naik (animasi easing) ---
    currentRise += (targetRise - currentRise) * 0.035;

    const fillFraction = currentRise / MAX_RISE;
    const tubeHeight   = TUBE.bottom - TUBE.top;
    const fillHeight   = tubeHeight * fillFraction;
    const fillY        = TUBE.bottom - fillHeight;

    if (fillHeight > 0) {
      ctx.fillStyle = mercuryColor;
      _roundRect(
        ctx,
        TUBE.x - TUBE.width / 2 + 3,
        fillY,
        TUBE.width - 6,
        fillHeight,
        3, true, false
      );
    }

    // --- Label nilai saat ini ---
    const displayRise = currentRise.toFixed(2);
    ctx.font      = 'bold 13px Bangers, cursive';
    ctx.fillStyle = intensity > 0.5 ? '#cc2020' : '#1A1008';
    ctx.textAlign = 'center';
    ctx.fillText(`+${displayRise}°C`, TUBE.x, H - 5);
    ctx.textAlign = 'left';

    // --- Tanda bahaya jika melewati 1.5°C ---
    if (currentRise >= 1.5) {
      _drawDangerMark(ctx, TUBE, currentRise, MAX_RISE);
    }

    _thermoAnimId = requestAnimationFrame(drawThermo);
  }

  drawThermo();

  document.getElementById('thermo-desc').textContent =
    targetRise < 0.5 ? 'Suhu aman 🌡️ di bawah 0.5°C' :
    targetRise < 1.5 ? `+${targetRise.toFixed(1)}°C — waspada ⚠️` :
    targetRise < 2.0 ? `+${targetRise.toFixed(1)}°C — melewati batas 1.5°C! 🔶` :
                       `+${targetRise.toFixed(1)}°C — KRITIS! 🔥`;
}

// ------------------------------------------------
//  Helper: garis skala di samping tabung
// ------------------------------------------------
function _drawScaleLines(ctx, tube, steps, maxRise) {
  const tubeHeight = tube.bottom - tube.top;

  for (let i = 0; i <= steps; i++) {
    const frac = i / steps;
    const y    = tube.bottom - tubeHeight * frac;
    const temp = (maxRise * frac).toFixed(0);

    // Garis kecil
    ctx.beginPath();
    ctx.moveTo(tube.x + tube.width / 2,     y);
    ctx.lineTo(tube.x + tube.width / 2 + 8, y);
    ctx.strokeStyle = '#1A1008';
    ctx.lineWidth   = 1.5;
    ctx.stroke();

    // Label suhu
    ctx.font      = 'bold 9px Bangers, cursive';
    ctx.fillStyle = i >= 2 ? '#cc2020' : '#1A1008';
    ctx.fillText(`+${temp}°`, tube.x + tube.width / 2 + 10, y + 4);

    // Garis 1.5°C (batas Paris Agreement)
    if (i === 0) {
      // Tambah garis 1.5 di antara 1 dan 2
      const y15 = tube.bottom - tubeHeight * (1.5 / maxRise);
      ctx.beginPath();
      ctx.setLineDash([3, 2]);
      ctx.moveTo(tube.x - tube.width / 2 - 4, y15);
      ctx.lineTo(tube.x + tube.width / 2 + 8, y15);
      ctx.strokeStyle = '#ff6600';
      ctx.lineWidth   = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.font      = 'bold 8px Comic Neue, cursive';
      ctx.fillStyle = '#ff6600';
      ctx.fillText('1.5°', tube.x + tube.width / 2 + 10, y15 + 3);
    }
  }
}

// ------------------------------------------------
//  Helper: tanda seru merah saat suhu kritis
// ------------------------------------------------
function _drawDangerMark(ctx, tube, currentRise, maxRise) {
  const alpha = Math.min((currentRise - 1.5) / 2.5, 1);
  ctx.font      = `bold ${Math.round(16 + alpha * 6)}px Bangers, cursive`;
  ctx.fillStyle = `rgba(220, 30, 30, ${alpha.toFixed(2)})`;
  ctx.textAlign = 'center';
  ctx.fillText('⚠', tube.x - 30, tube.top + 20);
  ctx.textAlign = 'left';
}

// ------------------------------------------------
//  Helper: roundRect (polyfill untuk browser lama)
// ------------------------------------------------
function _roundRect(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y,     x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h,     x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y,         x + r, y);
  ctx.closePath();
  if (fill)   ctx.fill();
  if (stroke) ctx.stroke();
}
