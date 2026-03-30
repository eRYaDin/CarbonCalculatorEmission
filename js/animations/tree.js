// ================================================
//  js/animations/tree.js
//  Animasi pohon tumbuh/menyusut berdasarkan
//  level emisi, di canvas #canvas-tree
//
//  FUNGSI YANG DIEKSPOR:
//  - animateTree(intensity, lvlKey)
//
//  PARAMETER:
//  - intensity : 0.0 – 1.0
//  - lvlKey    : 'low' | 'medium' | 'high'
// ================================================

let _treeAnimId = null;

function animateTree(intensity, lvlKey) {
  if (_treeAnimId) cancelAnimationFrame(_treeAnimId);

  const canvas = document.getElementById('canvas-tree');
  const ctx    = canvas.getContext('2d');
  const W      = canvas.width;
  const H      = canvas.height;

  // Kesehatan pohon: emisi tinggi = pohon tidak sehat
  // health 1.0 = lebat hijau, 0.0 = mati kering
  const targetHealth = 1.0 - intensity;
  let   currentHealth = lvlKey === 'low' ? 0.9 : 0.5;  // Start agak cepat

  // Partikel daun gugur (hanya aktif saat health rendah)
  const leaves = [];
  if (intensity > 0.3) {
    const n = Math.round(intensity * 12);
    for (let i = 0; i < n; i++) {
      leaves.push(_newLeaf(W, H));
    }
  }

  function drawTree() {
    ctx.clearRect(0, 0, W, H);

    // --- Easing menuju targetHealth ---
    currentHealth += (targetHealth - currentHealth) * 0.025;

    // --- Latar langit (berubah sesuai kesehatan) ---
    const skyR = Math.round(135 + (1 - currentHealth) * 80);
    const skyG = Math.round(206 - (1 - currentHealth) * 90);
    const skyB = Math.round(235 - (1 - currentHealth) * 100);
    ctx.fillStyle = `rgb(${skyR},${skyG},${skyB})`;
    ctx.fillRect(0, 0, W, H);

    // --- Matahari (redup jika emisi tinggi) ---
    const sunAlpha = 0.3 + currentHealth * 0.6;
    ctx.beginPath();
    ctx.arc(130, 22, 16, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,230,50,${sunAlpha})`;
    ctx.fill();

    // --- Tanah / rumput ---
    _drawGround(ctx, W, H, currentHealth);

    // --- Batang pohon ---
    const trunkH   = Math.round(28 + currentHealth * 22);
    const trunkW   = Math.round(10 + currentHealth * 4);
    const trunkX   = W / 2;
    const trunkBot = H - 28;
    const trunkTop = trunkBot - trunkH;

    // Warna batang: coklat sehat → abu kering
    const trunkL = Math.round(25 + currentHealth * 15);
    ctx.fillStyle   = `hsl(25, ${Math.round(40 + currentHealth * 30)}%, ${trunkL}%)`;
    ctx.strokeStyle = '#1A1008';
    ctx.lineWidth   = 1.5;

    // Batang dengan sedikit taper
    ctx.beginPath();
    ctx.moveTo(trunkX - trunkW / 2, trunkBot);
    ctx.lineTo(trunkX - trunkW / 3, trunkTop);
    ctx.lineTo(trunkX + trunkW / 3, trunkTop);
    ctx.lineTo(trunkX + trunkW / 2, trunkBot);
    ctx.closePath();
    ctx.fill(); ctx.stroke();

    // --- Kanopi (mahkota pohon) ---
    const layers = Math.round(1 + currentHealth * 2.5);
    _drawCanopy(ctx, trunkX, trunkTop, currentHealth, layers);

    // --- Daun gugur (animasi jatuh) ---
    if (leaves.length > 0) {
      leaves.forEach((leaf, i) => {
        leaf.x   += leaf.vx + Math.sin(leaf.life * 0.05) * 0.4;
        leaf.y   += leaf.vy;
        leaf.rot += leaf.vrot;
        leaf.life++;

        if (leaf.y > H + 10) {
          leaves[i] = _newLeaf(W, H);
          return;
        }

        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, leaf.rx, leaf.ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = leaf.color;
        ctx.fill();
        ctx.restore();
      });
    }

    // --- Label persentase kesehatan ---
    const pct = Math.round(currentHealth * 100);
    ctx.font      = 'bold 11px Bangers, cursive';
    ctx.fillStyle = pct > 60 ? '#1a6e1a' : pct > 30 ? '#8a5a00' : '#aa1a1a';
    ctx.textAlign = 'center';
    ctx.fillText(`Kesehatan: ${pct}%`, W / 2, H - 5);
    ctx.textAlign = 'left';

    _treeAnimId = requestAnimationFrame(drawTree);
  }

  drawTree();

  document.getElementById('tree-desc').textContent =
    intensity < 0.2 ? 'Hutan subur & sehat 🌲' :
    intensity < 0.5 ? 'Hutan mulai terdampak 🍂' :
    intensity < 0.8 ? 'Hutan kritis! Butuh aksi! 🆘' :
                      'Hutan nyaris gundul! 🏜️';
}

// ------------------------------------------------
//  Helper: gambar mahkota pohon berlapis
// ------------------------------------------------
function _drawCanopy(ctx, cx, baseY, health, layers) {
  // Warna kanopi: hijau cerah → kuning → coklat
  const hue  = Math.round(50  + health * 75);   // 50=kuning, 125=hijau
  const sat  = Math.round(20  + health * 65);
  const lum  = Math.round(20  + health * 35);

  ctx.fillStyle   = `hsl(${hue},${sat}%,${lum}%)`;
  ctx.strokeStyle = '#1A1008';
  ctx.lineWidth   = 1.5;

  // Ukuran tiap lapis (dari bawah ke atas)
  const radii  = [44, 36, 26].slice(0, Math.ceil(layers));
  const yGap   = 22;

  radii.forEach((r, i) => {
    const layerR   = r * (0.4 + health * 0.6);   // Mengecil saat tidak sehat
    const layerY   = baseY - i * yGap * health;

    ctx.beginPath();
    ctx.arc(cx, layerY, layerR, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Highlight sedikit di atas tiap lapis
    if (health > 0.4) {
      ctx.fillStyle = `hsla(${hue},${sat}%,${lum + 12}%,0.4)`;
      ctx.beginPath();
      ctx.arc(cx - layerR * 0.2, layerY - layerR * 0.25, layerR * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `hsl(${hue},${sat}%,${lum}%)`;
    }
  });
}

// ------------------------------------------------
//  Helper: gambar tanah & rumput
// ------------------------------------------------
function _drawGround(ctx, W, H, health) {
  const groundY = H - 25;

  // Warna tanah: hijau → coklat kering
  const groundHue = Math.round(30 + health * 60);
  const groundSat = Math.round(30 + health * 30);
  const groundLum = Math.round(25 + health * 15);

  ctx.fillStyle = `hsl(${groundHue},${groundSat}%,${groundLum}%)`;
  ctx.beginPath();
  ctx.roundRect
    ? ctx.roundRect(0, groundY, W, H - groundY, [4, 4, 0, 0])
    : ctx.rect(0, groundY, W, H - groundY);
  ctx.fill();
  ctx.strokeStyle = '#1A1008';
  ctx.lineWidth   = 1.5;
  ctx.stroke();

  // Rumput kecil (hanya jika health cukup tinggi)
  if (health > 0.35) {
    const bladeColor = `hsl(${100 + health * 20},${40 + health * 40}%,${20 + health * 20}%)`;
    ctx.strokeStyle = bladeColor;
    ctx.lineWidth   = 1.5;
    const bladeCount = Math.round(health * 14);
    for (let i = 0; i < bladeCount; i++) {
      const bx = 15 + (i / bladeCount) * (W - 30);
      const bh = 4 + Math.sin(i * 1.3) * 3;
      ctx.beginPath();
      ctx.moveTo(bx, groundY);
      ctx.quadraticCurveTo(bx + 2, groundY - bh, bx + 4, groundY - bh + 1);
      ctx.stroke();
    }
  }
}

// ------------------------------------------------
//  Helper: buat partikel daun gugur baru
// ------------------------------------------------
function _newLeaf(W, H) {
  // Warna daun gugur: merah, oranye, kuning
  const palette = ['#cc4400','#dd7700','#bb9900','#884400','#cc6600'];
  return {
    x   : 20 + Math.random() * (W - 40),
    y   : -10,
    vx  : (Math.random() - 0.5) * 0.8,
    vy  : 0.5 + Math.random() * 1.0,
    rot : Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.08,
    rx  : 4 + Math.random() * 4,
    ry  : 2 + Math.random() * 2,
    life : 0,
    color: palette[Math.floor(Math.random() * palette.length)],
  };
}
