// ================================================
//  js/sectors/digital.js
//  Kalkulasi emisi + render formula untuk
//  sektor digital & teknologi
//
//  FUNGSI YANG DIEKSPOR (dipanggil dari main.js):
//  - calcDigital()              → return objek hasil
//  - renderFormulaDigital(result) → isi DOM formula
//
//  DEPENDENSI (harus sudah dimuat sebelum file ini):
//  - js/data/digital.js
//    (DIGITAL_FACTORS, DIGITAL_DEFAULTS, DIGITAL_SKALA)
//
//  CARA MENAMBAH AKTIVITAS DIGITAL BARU:
//  1. Tambah slider di index.html (sec-digital)
//  2. Baca nilainya di calcDigital() di bawah
//  3. Hitung emisi menggunakan DIGITAL_FACTORS
//  4. Masukkan ke netKg dan tampilkan di formula
// ================================================

// ------------------------------------------------
//  calcDigital()
//  Membaca semua input digital dari DOM dan
//  menghitung total jejak karbon digital
//
//  RETURN OBJECT:
//  {
//    netKg        : total emisi (kg CO₂e)
//    annualKg     : estimasi tahunan (kg CO₂e)
//    fromStream   : emisi streaming video (kg)
//    fromGame     : emisi gaming online (kg)
//    fromEmail    : emisi email (kg)
//    fromAi       : emisi AI queries (kg)
//    fromOther    : fromEmail + fromAi (kg)
//    streamH      : input jam streaming/hari
//    gameH        : input jam gaming/hari
//    emails       : input jumlah email/hari
//    aiQ          : input jumlah AI query/hari
//    days         : total hari (skala waktu)
//    annualMult   : untuk estimasi tahunan
//  }
// ------------------------------------------------
function calcDigital() {
  // Baca input dari DOM
  const streamH = parseFloat(document.getElementById('stream-slider').value);
  const gameH   = parseFloat(document.getElementById('game-slider').value);
  const emails  = parseInt(document.getElementById('email-slider').value)  || 0;
  const aiQ     = parseInt(document.getElementById('ai-slider').value)     || 0;
  const days    = parseInt(document.getElementById('digital-time').value);

  const F = DIGITAL_FACTORS;  // Shortcut ke faktor emisi

  // --- Emisi dari masing-masing aktivitas ---

  // 1. Streaming video (default: HD 1080p)
  //    Rumus: jam/hari × faktor g/jam ÷ 1000 × total hari
  const fromStream = (streamH * F.streaming_hd_per_jam / 1000) * days;

  // 2. Gaming online (default: cloud gaming)
  const fromGame = (gameH * F.gaming_cloud_per_jam / 1000) * days;

  // 3. Email (default: email biasa tanpa attachment)
  const fromEmail = (emails * F.email_biasa_per_item / 1000) * days;

  // 4. AI queries (rata-rata sederhana + kompleks)
  //    Ambil rata-rata antara query sederhana dan kompleks
  const efAi   = (F.ai_query_sederhana + F.ai_query_kompleks) / 2;
  const fromAi = (aiQ * efAi / 1000) * days;

  // --- Grup "lainnya" ---
  const fromOther = fromEmail + fromAi;

  // --- Total gabungan ---
  const netKg = fromStream + fromGame + fromOther;

  // --- Estimasi tahunan ---
  const skala      = DIGITAL_SKALA[days];
  const annualMult = skala ? skala.annualMult : 1;
  const annualKg   = netKg * annualMult;

  return {
    netKg,
    annualKg,
    fromStream,
    fromGame,
    fromEmail,
    fromAi,
    fromOther,
    streamH,
    gameH,
    emails,
    aiQ,
    days,
    annualMult,
  };
}

// ------------------------------------------------
//  renderFormulaDigital(result)
//  Mengisi elemen #formula-code dan #formula-detail
// ------------------------------------------------
function renderFormulaDigital(result) {
  const { streamH, gameH, emails, aiQ, days,
          fromStream, fromGame, fromEmail, fromAi, netKg } = result;

  const F          = DIGITAL_FACTORS;
  const skalaLabel = DIGITAL_SKALA[days]?.label || '';
  const efAi       = (F.ai_query_sederhana + F.ai_query_kompleks) / 2;

  document.getElementById('formula-code').innerHTML =
`<span class="f-comment">// ============================================</span>
<span class="f-comment">// Faktor streaming HD  : ${F.streaming_hd_per_jam} g CO₂e/jam</span>
<span class="f-comment">// Faktor cloud gaming  : ${F.gaming_cloud_per_jam} g CO₂e/jam</span>
<span class="f-comment">// Faktor email biasa   : ${F.email_biasa_per_item} g CO₂e/email</span>
<span class="f-comment">// Faktor AI query      : ~${efAi} g CO₂e/query (rata-rata)</span>
<span class="f-comment">// Skala waktu          : ${skalaLabel} (${days} hari)</span>
<span class="f-comment">// ============================================</span>

<span class="f-comment">// BREAKDOWN EMISI:</span>
Streaming = <span class="f-val">${streamH} jam/hr</span> <span class="f-op">×</span> <span class="f-val">${F.streaming_hd_per_jam} g/jam</span> <span class="f-op">×</span> <span class="f-val">${days} hr</span>  = <span class="f-val">${(fromStream * 1000).toFixed(0)} g</span>  = <span class="f-val">${fromStream.toFixed(3)} kg</span>
Gaming    = <span class="f-val">${gameH} jam/hr</span>   <span class="f-op">×</span> <span class="f-val">${F.gaming_cloud_per_jam} g/jam</span> <span class="f-op">×</span> <span class="f-val">${days} hr</span>  = <span class="f-val">${(fromGame * 1000).toFixed(0)} g</span>  = <span class="f-val">${fromGame.toFixed(3)} kg</span>
Email     = <span class="f-val">${emails} email/hr</span> <span class="f-op">×</span> <span class="f-val">${F.email_biasa_per_item} g/email</span><span class="f-op">×</span> <span class="f-val">${days} hr</span>  = <span class="f-val">${(fromEmail * 1000).toFixed(0)} g</span>  = <span class="f-val">${fromEmail.toFixed(3)} kg</span>
AI Query  = <span class="f-val">${aiQ} query/hr</span>  <span class="f-op">×</span> <span class="f-val">${efAi} g/query</span>  <span class="f-op">×</span> <span class="f-val">${days} hr</span>  = <span class="f-val">${(fromAi * 1000).toFixed(0)} g</span>  = <span class="f-val">${fromAi.toFixed(3)} kg</span>

<span class="f-comment">// TOTAL:</span>
Emisi     = ${fromStream.toFixed(3)} + ${fromGame.toFixed(3)} + ${fromEmail.toFixed(3)} + ${fromAi.toFixed(3)}
          = <span class="f-result">${netKg.toFixed(4)} kg CO₂e</span>`;

  // Kontributor terbesar
  const kontribusi = [
    { nama: 'Streaming', val: fromStream },
    { nama: 'Gaming',    val: fromGame   },
    { nama: 'Email',     val: fromEmail  },
    { nama: 'AI',        val: fromAi     },
  ].sort((a, b) => b.val - a.val);

  const terbesar    = kontribusi[0];
  const pctTerbesar = netKg > 0
    ? ((terbesar.val / netKg) * 100).toFixed(0)
    : 0;

  // Konteks perbandingan menarik
  const streamingSetahun = (fromStream * (DIGITAL_SKALA[days]?.annualMult || 1)).toFixed(1);

  document.getElementById('formula-detail').innerHTML = `
    <h4>📱 Kontributor Terbesar</h4>
    <p><strong>${terbesar.nama}</strong> menyumbang
    <strong>${pctTerbesar}%</strong> dari total jejak digital kamu.
    Fokus pengurangan di sini untuk dampak terbesar!</p>

    <h4>📺 Mengapa Streaming Cukup Signifikan?</h4>
    <p>Setiap jam streaming HD melibatkan server encode, CDN,
    jaringan internet, dan layar — semuanya mengonsumsi listrik.
    Estimasi streaming HD-mu setahun: <strong>~${streamingSetahun} kg CO₂e</strong>.
    Turunkan ke SD atau nonaktifkan video saat hanya mendengarkan audio.</p>

    <h4>🤖 Jejak Karbon AI</h4>
    <p>Satu query ke model bahasa besar (LLM) membutuhkan sekitar
    <strong>0.002–0.01 kWh</strong> — 10–100× lebih besar dari pencarian Google.
    Training model AI jauh lebih besar lagi (~300 ton CO₂e untuk GPT-3).
    Gunakan AI secara efisien: satu prompt jelas lebih baik dari
    10 percobaan bolak-balik.</p>

    <h4>📧 Email: Kecil tapi Terakumulasi</h4>
    <p>Satu email spam = 0.3 g CO₂e. Tapi dunia mengirim
    <strong>300 miliar email per hari</strong> — totalnya
    membutuhkan listrik setara 170 pembangkit batubara!
    Unsubscribe dari newsletter yang tidak dibaca adalah
    aksi kecil yang berdampak kolektif besar.</p>

    <h4>🔬 Sumber Data</h4>
    <p>arXiv 2024 (Environmental Burden of US Data Centers) ·
    The Shift Project (streaming footprint) ·
    Mike Berners-Lee "How Bad Are Bananas?" 2020 (email) ·
    IEA Data Centers & Networks Report 2023</p>`;
}
