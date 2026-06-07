// ================================================
//  js/sectors/digital.js
//  Kalkulasi emisi aktivitas digital
//  DEPENDENSI: js/data/digital.js
// ================================================

function calcDigital() {
  const streamH = parseFloat(document.getElementById('stream-slider').value);
  const gameH   = parseFloat(document.getElementById('game-slider').value);
  const emails  = parseInt(document.getElementById('email-slider').value);
  const aiQ     = parseInt(document.getElementById('ai-slider').value);
  const days    = parseFloat(document.getElementById('digital-time').value);

  const fromStream = streamH * EF_STREAM * days;
  const fromGame   = gameH * EF_GAME * days;
  const fromEmail  = emails * EF_EMAIL * days;
  const fromAi     = aiQ * EF_AI * days;
  const fromOther  = fromEmail + fromAi;

  const netKg    = fromStream + fromGame + fromOther;
  const annualKg = netKg * (365 / days);

  return { netKg, annualKg, fromStream, fromGame, fromEmail, fromAi, fromOther, streamH, gameH, emails, aiQ, days };
}

function renderFormulaDigital(r) {
  const code   = document.getElementById('formula-code');
  const detail = document.getElementById('formula-detail');

  code.innerHTML = `
<span class="f-comment">// === KALKULASI EMISI DIGITAL ===</span>

<span class="f-comment">// 1. Streaming Video</span>
streaming = jam/hari <span class="f-op">×</span> EF_STREAM <span class="f-op">×</span> hari
          = <span class="f-val">${r.streamH}</span> <span class="f-op">×</span> <span class="f-val">${EF_STREAM}</span> <span class="f-op">×</span> <span class="f-val">${r.days}</span>
          = <span class="f-result">${r.fromStream.toFixed(5)} kg CO₂e</span>

<span class="f-comment">// 2. Gaming Online</span>
gaming = jam/hari <span class="f-op">×</span> EF_GAME <span class="f-op">×</span> hari
       = <span class="f-val">${r.gameH}</span> <span class="f-op">×</span> <span class="f-val">${EF_GAME}</span> <span class="f-op">×</span> <span class="f-val">${r.days}</span>
       = <span class="f-result">${r.fromGame.toFixed(5)} kg CO₂e</span>

<span class="f-comment">// 3. Email</span>
email = jumlah/hari <span class="f-op">×</span> EF_EMAIL <span class="f-op">×</span> hari
      = <span class="f-val">${r.emails}</span> <span class="f-op">×</span> <span class="f-val">${EF_EMAIL}</span> <span class="f-op">×</span> <span class="f-val">${r.days}</span>
      = <span class="f-result">${r.fromEmail.toFixed(5)} kg CO₂e</span>

<span class="f-comment">// 4. AI Query</span>
ai = query/hari <span class="f-op">×</span> EF_AI <span class="f-op">×</span> hari
   = <span class="f-val">${r.aiQ}</span> <span class="f-op">×</span> <span class="f-val">${EF_AI}</span> <span class="f-op">×</span> <span class="f-val">${r.days}</span>
   = <span class="f-result">${r.fromAi.toFixed(5)} kg CO₂e</span>

<span class="f-comment">// 5. Total</span>
total = streaming <span class="f-op">+</span> gaming <span class="f-op">+</span> email <span class="f-op">+</span> ai
      = <span class="f-result">${r.netKg.toFixed(5)} kg CO₂e</span>

<span class="f-comment">// 6. Estimasi Tahunan</span>
tahunan = <span class="f-result">${r.annualKg.toFixed(3)} kg CO₂e/tahun</span>`;

  detail.innerHTML = `
    <h4>📖 Penjelasan</h4>
    <p>
      Jejak karbon digital berasal dari energi yang dipakai data center,
      jaringan internet, dan perangkat pengguna.
    </p>
    <p>
      <strong>Streaming</strong> (${r.fromStream.toFixed(4)} kg) adalah kontributor terbesar,
      diikuti <strong>gaming</strong> (${r.fromGame.toFixed(4)} kg).
    </p>
    <h4>📊 Konteks</h4>
    <p>
      Sektor digital menyumbang ~4% emisi global (setara industri penerbangan).
      Meski per aktivitas kecil, akumulasi miliaran pengguna sangat signifikan.
    </p>`;
}
