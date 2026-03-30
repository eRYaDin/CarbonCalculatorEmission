// ================================================
//  js/animations/earth.js
//  Animasi bumi berputar & berubah warna
//  di canvas #canvas-earth
//
//  FUNGSI YANG DIEKSPOR:
//  - animateEarth(intensity, lvlKey)
//
//  PARAMETER:
//  - intensity : 0.0 – 1.0
//  - lvlKey    : 'low' | 'medium' | 'high'
// ================================================

let _earthAnimId = null;

function animateEarth(intensity, lvlKey) {
  if (_earthAnimId) cancelAnimationFrame(_earthAnimId);

  const canvas = document.getElementById('canvas-earth');
  const ctx    = canvas.getContext('2d');
  const W      = canvas.width;
  const H      = canvas.height;
  const CX     = W / 2;
  const CY     = H / 2 - 6;
  const R      = 52;

  // --- Warna berdasarkan intensity ---
  // Laut: biru cerah → abu-abu kebiruan
  const seaR = Math.round(60  + intensity * 80);
  const seaG = Math.round(160 - intensity * 80);
  const seaB = Math.round(220 - intensity * 80);
  const seaColor = `rgb(${seaR},${seaG},${seaB})`;

  // Daratan: hijau → kuning → coklat merah
  const landR = Math.round(50  + intensity * 170);
  const landG = Math.round(160 - intensity * 130);
  const landB = Math.round(50  - intensity * 30);
  const landColor = `rgb(${landR},${landG},${landB})`;

  // Aura atmosfer (makin merah = makin panas)
  const auraAlpha = intensity * 0.45;

  let angle = 0;

  function drawEarth() {
    ctx.clearRect(0, 0, W, H);

    // --- Latar luar angkasa ---
    const spaceBg = ctx.createRadialGradient(CX, CY, R + 10, CX, CY, W);
    spaceBg.addColorStop(0, '#1a1a2e');
    spaceBg.addColorStop(1, '#0a0a14');
    ctx.fillStyle = spaceBg;
    ctx.fillRect(0, 0, W, H);

    // --- Bintang-bintang kecil ---
    _drawStars(ctx, W, H);

    // --- Aura atmosfer (glow merah jika panas) ---
    if (intensity > 0.2) {
      const aura = ctx.createRadialGradient(CX, CY, R - 4, CX, CY, R + 18);
      aura.addColorStop(0, `rgba(255,80,0,0)`);
      aura.addColorStop(1, `rgba(255,80,0,${auraAlpha.toFixed(2)})`);
      ctx.beginPath();
      ctx.arc(CX, CY, R + 18, 0, Math.PI * 2);
      ctx.fillStyle = aura;
      ctx.fill();
    }

    // --- Bola bumi (lautan) ---
    ctx.save();
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.clip();

    // Isi dengan warna laut
    ctx.fillStyle = seaColor;
    ctx.fillRect(CX - R, CY - R, R * 2, R * 2);

    // --- Daratan (bentuk benua abstrak, berputar) ---
    ctx.save();
    ctx.translate(CX, CY);
    ctx.rotate(angle);

    ctx.fillStyle = landColor;
    // Benua 1 (Asia-ish)
    _drawContinent(ctx, -18, -12, 28, 20, 0.3);
    // Benua 2 (Amerika-ish)
    _drawContinent(ctx, 18,  10, 20, 14, -0.4);
    // Benua 3 (Afrika-ish)
    _drawContinent(ctx, -5,  24, 14, 10,  0.1);
    // Benua 4 (Antartika-ish)
    _drawContinent(ctx,  8, -28, 12,  7,  0.6);

    ctx.restore();

    // --- Es kutub utara ---
    ctx.fillStyle = `rgba(240,248,255,${0.6 + intensity * 0 })`;
    ctx.beginPath();
    ctx.ellipse(CX - R, CY - R + 8, 20, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore(); // Akhiri clip

    // --- Border bumi ---
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.strokeStyle = '#1A1008';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // --- Kilap (highlight) ---
    const shine = ctx.createRadialGradient(
      CX - R * 0.3, CY - R * 0.3, 2,
      CX - R * 0.3, CY - R * 0.3, R * 0.6
    );
    shine.addColorStop(0, 'rgba(255,255,255,0.22)');
    shine.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.fillStyle = shine;
    ctx.fill();

    // --- Label suhu ---
    const tempRise = (intensity * 4).toFixed(1);
    ctx.font      = 'bold 11px Bangers, cursive';
    ctx.fillStyle = intensity > 0.5 ? '#ff4444' : '#22aa44';
    ctx.textAlign = 'center';
    ctx.fillText(`+${tempRise}°C`, CX, H - 6);
    ctx.textAlign = 'left';

    // Rotasi lambat
    angle += 0.008 + intensity * 0.006;

    _earthAnimId = requestAnimationFrame(drawEarth);
  }

  drawEarth();

  document.getElementById('earth-desc').textContent =
    lvlKey === 'low'    ? 'Bumi sehat & sejuk 🌍' :
    lvlKey === 'medium' ? 'Bumi mulai memanas ⚠️' :
                          'Bumi dalam bahaya! 🔴';
}

// ------------------------------------------------
//  Helper: gambar satu benua (ellipse abstrak)
// ------------------------------------------------
function _drawContinent(ctx, x, y, rx, ry, rot) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2);
  ctx.fill();
}

// ------------------------------------------------
//  Helper: gambar bintang-bintang latar
//  (hanya digambar sekali, pakai cache statis)
// ------------------------------------------------
const _starCache = [];
(function _initStars() {
  for (let i = 0; i < 30; i++) {
    _starCache.push({
      x : Math.random() * 160,
      y : Math.random() * 160,
      r : Math.random() * 1.2 + 0.3,
    });
  }
})();

function _drawStars(ctx) {
  ctx.fillStyle = 'rgba(255,255,255,0.8)';
  _starCache.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
}
