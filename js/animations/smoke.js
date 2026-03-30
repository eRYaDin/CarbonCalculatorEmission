// ================================================
//  js/animations/smoke.js
//  Animasi asap mengepul di canvas #canvas-smoke
//
//  FUNGSI YANG DIEKSPOR:
//  - animateSmoke(intensity, lvlKey)
//
//  PARAMETER:
//  - intensity : 0.0 – 1.0 (0 = bersih, 1 = sangat kotor)
//  - lvlKey    : 'low' | 'medium' | 'high'
//
//  CARA MENAMBAH ELEMEN VISUAL BARU:
//  Tambahkan gambar di dalam fungsi drawSmoke()
//  Semua variabel animasi ada di scope animateSmoke()
// ================================================

// Handle untuk cancelAnimationFrame dari luar
let _smokeAnimId = null;

function animateSmoke(intensity, lvlKey) {
  // Hentikan animasi sebelumnya jika masih berjalan
  if (_smokeAnimId) cancelAnimationFrame(_smokeAnimId);

  const canvas = document.getElementById('canvas-smoke');
  const ctx    = canvas.getContext('2d');
  const W      = canvas.width;
  const H      = canvas.height;

  // --- Konfigurasi berdasarkan level ---
  const numParticles = Math.round(3 + intensity * 18);

  // Warna partikel: hijau → kuning → abu gelap
  const smokeColor = lvlKey === 'low'
    ? '#90d890'
    : lvlKey === 'medium'
    ? '#c8c870'
    : '#505050';

  // --- Inisialisasi partikel asap ---
  const particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(_newSmokeParticle(W, intensity));
  }

  // --- Loop animasi ---
  function drawSmoke() {
    ctx.clearRect(0, 0, W, H);

    // Latar langit — berubah sesuai level
    const skyColor = lvlKey === 'low'
      ? '#d0eaff'
      : lvlKey === 'medium'
      ? '#c8d8cc'
      : '#a0a8a0';
    ctx.fillStyle = skyColor;
    ctx.fillRect(0, 0, W, H);

    // Cerobong asap (badan pabrik mini)
    _drawChimney(ctx, W, H);

    // Update dan gambar tiap partikel
    particles.forEach((p, i) => {
      // Gerak partikel: naik + goyang horizontal sinusoidal
      p.x    += p.vx + Math.sin(p.life * 0.07) * 0.6;
      p.y    += p.vy;
      p.r    += 0.12 + intensity * 0.2;   // Makin besar seiring naik
      p.alpha -= 0.006 + intensity * 0.004;
      p.life++;

      // Reset partikel yang sudah memudar / keluar layar
      if (p.alpha <= 0 || p.y < -p.r) {
        particles[i] = _newSmokeParticle(W, intensity);
        return;
      }

      // Gambar partikel
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      const alphaHex = Math.round(p.alpha * 255)
        .toString(16).padStart(2, '0');
      ctx.fillStyle = smokeColor + alphaHex;
      ctx.fill();
    });

    // Label intensitas
    ctx.fillStyle  = '#1A1008';
    ctx.font       = 'bold 10px Bangers, cursive';
    ctx.textAlign  = 'center';
    ctx.fillText(
      `Intensitas: ${Math.round(intensity * 100)}%`,
      W / 2, H - 6
    );
    ctx.textAlign = 'left';

    _smokeAnimId = requestAnimationFrame(drawSmoke);
  }

  drawSmoke();

  // Update deskripsi teks di bawah canvas
  document.getElementById('smoke-desc').textContent =
    intensity < 0.15 ? 'Asap tipis — emisi sangat rendah 👍' :
    intensity < 0.4  ? `Asap sedang — perlu dikurangi ⚠️` :
    intensity < 0.7  ? `Asap tebal — emisi tinggi! 🔶` :
                       `Asap sangat tebal — BAHAYA! 🔴`;
}

// ------------------------------------------------
//  Helper: buat partikel asap baru
// ------------------------------------------------
function _newSmokeParticle(W, intensity) {
  // Titik asal di atas cerobong (x ~80, y ~105)
  return {
    x      : 80 + (Math.random() - 0.5) * 12,
    y      : 105,
    r      : 3 + Math.random() * 5 * (0.3 + intensity * 0.7),
    vy     : -(0.5 + Math.random() * 1.0 + intensity * 1.2),
    vx     : (Math.random() - 0.5) * 0.7,
    alpha  : 0.5 + Math.random() * 0.4,
    life   : 0,
  };
}

// ------------------------------------------------
//  Helper: gambar bangunan pabrik + cerobong
// ------------------------------------------------
function _drawChimney(ctx, W, H) {
  // Badan pabrik
  ctx.fillStyle   = '#6a6a6a';
  ctx.strokeStyle = '#1A1008';
  ctx.lineWidth   = 2;

  // Gedung utama
  ctx.beginPath();
  ctx.rect(30, 115, 100, 45);
  ctx.fill(); ctx.stroke();

  // Atap segitiga
  ctx.beginPath();
  ctx.moveTo(30, 115);
  ctx.lineTo(80, 95);
  ctx.lineTo(130, 115);
  ctx.closePath();
  ctx.fill(); ctx.stroke();

  // Cerobong
  ctx.fillStyle = '#4a4a4a';
  ctx.beginPath();
  ctx.rect(68, 65, 24, 52);
  ctx.fill(); ctx.stroke();

  // Bibir cerobong
  ctx.fillStyle = '#3a3a3a';
  ctx.beginPath();
  ctx.rect(64, 62, 32, 8);
  ctx.fill(); ctx.stroke();

  // Jendela kecil
  ctx.fillStyle = '#FFE53B';
  ctx.strokeStyle = '#1A1008';
  ctx.lineWidth = 1.5;
  [[45, 125], [100, 125]].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.rect(x, y, 14, 12);
    ctx.fill(); ctx.stroke();
  });
}
