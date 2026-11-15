/* Answer effects: confetti + chime for correct, bomb blast + buzzer for wrong.
   Sounds are synthesised with the Web Audio API (no audio files). Visuals live in #fx, outside #app,
   so they survive re-renders. */
const FX = (() => {
  let ctx = null;
  const sfxOn = () => { try { return localStorage.getItem('bb_sfx') !== 'false'; } catch { return true; } };
  const calm = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const layer = () => document.getElementById('fx');
  const rand = (a, b) => a + Math.random() * (b - a);

  /* ---------- sound ---------- */
  function audio() {
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    } catch { return null; }
  }
  function tone(freq, at, dur, type, vol, slideTo) {
    const c = audio(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, at);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, at + dur);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(vol, at + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g).connect(c.destination); o.start(at); o.stop(at + dur + 0.05);
  }
  function noise(at, dur, vol, from, to) {
    const c = audio(); if (!c) return;
    const buf = c.createBuffer(1, Math.floor(c.sampleRate * dur), c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = buf; f.type = 'lowpass';
    f.frequency.setValueAtTime(from, at); f.frequency.exponentialRampToValueAtTime(to, at + dur);
    g.gain.setValueAtTime(vol, at); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    src.connect(f).connect(g).connect(c.destination); src.start(at);
  }
  const now = () => { const c = audio(); return c ? c.currentTime : 0; };

  const sound = {
    /* bright rising arpeggio + sparkle */
    correct() {
      const t = now();
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, t + i * 0.085, 0.4, 'triangle', 0.22));
      tone(2093, t + 0.34, 0.5, 'sine', 0.07); tone(2637, t + 0.42, 0.45, 'sine', 0.05);
    },
    /* explosion boom, then a two-part buzzer */
    wrong() {
      const t = now();
      noise(t + 0.35, 0.7, 0.55, 1400, 60); tone(80, t + 0.35, 0.55, 'sine', 0.5, 30);
      tone(130, t + 0.5, 0.2, 'sawtooth', 0.22); tone(116, t + 0.74, 0.34, 'sawtooth', 0.22);
    },
    pop() { const t = now(); tone(740, t, 0.12, 'sine', 0.16); tone(1100, t + 0.05, 0.12, 'sine', 0.1); },
    buzz() { const t = now(); tone(140, t, 0.22, 'sawtooth', 0.2); },
    boing() { const t = now(); tone(520, t, 0.3, 'sine', 0.22, 130); tone(260, t + 0.02, 0.3, 'triangle', 0.1, 90); },
    ding() { const t = now(); tone(660, t, 0.3, 'triangle', 0.18); tone(880, t + 0.1, 0.35, 'triangle', 0.16); },
    /* lesson passed: short fanfare */
    win() {
      const t = now(), n = [523.25, 523.25, 523.25, 659.25, 783.99, 659.25, 783.99, 1046.5];
      const at = [0, 0.12, 0.24, 0.36, 0.52, 0.72, 0.84, 1.0], len = [0.1, 0.1, 0.1, 0.16, 0.2, 0.1, 0.16, 0.7];
      n.forEach((f, i) => { tone(f, t + at[i], len[i] + 0.1, 'square', 0.09); tone(f / 2, t + at[i], len[i] + 0.1, 'triangle', 0.12); });
    },
  };

  /* ---------- visuals ---------- */
  function confettiBurst() {
    const L = layer(); if (!L || calm()) return;
    const colors = ['#6c5ce7', '#00b8a9', '#f5a623', '#ff6fa5', '#16a34a', '#38bdf8'];
    const ox = innerWidth / 2, oy = innerHeight * 0.6;
    for (let i = 0; i < 48; i++) {
      const p = document.createElement('i');
      p.className = 'fx-piece' + (i % 9 === 0 ? ' star' : '');
      if (i % 9 === 0) p.textContent = '⭐'; else p.style.background = colors[i % colors.length];
      p.style.left = ox + 'px'; p.style.top = oy + 'px';
      const ang = rand(-Math.PI * 0.95, -Math.PI * 0.05), spd = rand(160, 420);
      const dx = Math.cos(ang) * spd, dy = Math.sin(ang) * spd, rot = rand(-540, 540);
      L.appendChild(p);
      p.animate([
        { transform: 'translate(0,0) rotate(0)', opacity: 1 },
        { transform: `translate(${dx}px,${dy}px) rotate(${rot * 0.6}deg)`, opacity: 1, offset: 0.45 },
        { transform: `translate(${dx * 1.15}px,${dy + 380}px) rotate(${rot}deg)`, opacity: 0 },
      ], { duration: rand(1300, 2000), easing: 'cubic-bezier(.2,.7,.4,1)' }).onfinish = () => p.remove();
    }
  }
  function bombBlast() {
    const L = layer(); if (!L || calm()) return;
    const cx = innerWidth / 2, cy = innerHeight * 0.42;
    const bomb = document.createElement('div');
    bomb.className = 'fx-bomb'; bomb.textContent = '💣'; bomb.style.left = cx + 'px'; bomb.style.top = cy + 'px';
    L.appendChild(bomb);
    setTimeout(() => {
      bomb.remove();
      const flash = document.createElement('div'); flash.className = 'fx-flash'; flash.style.left = cx + 'px'; flash.style.top = cy + 'px'; L.appendChild(flash);
      const boom = document.createElement('div'); boom.className = 'fx-boom'; boom.textContent = '💥'; boom.style.left = cx + 'px'; boom.style.top = cy + 'px'; L.appendChild(boom);
      setTimeout(() => { flash.remove(); boom.remove(); }, 800);
      for (let i = 0; i < 22; i++) {
        const s = document.createElement('i'); s.className = 'fx-spark'; s.style.left = cx + 'px'; s.style.top = cy + 'px';
        const ang = rand(0, Math.PI * 2), d = rand(90, 260);
        L.appendChild(s);
        s.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${Math.cos(ang) * d}px,${Math.sin(ang) * d}px) scale(.2)`, opacity: 0 }],
          { duration: rand(500, 900), easing: 'ease-out' }).onfinish = () => s.remove();
      }
      const app = document.getElementById('app');
      if (app) { app.classList.add('quake'); setTimeout(() => app.classList.remove('quake'), 500); }
    }, 350);
  }


  /* gentle generative background music for the story/skit player */
  const musicOn = () => { try { return localStorage.getItem('bb_music') !== 'false'; } catch { return true; } };
  const music = (() => {
    let master = null, timer = null, nextT = 0, step = 0;
    const chords = [[261.63, 329.63, 392], [220, 261.63, 329.63], [174.61, 220, 261.63], [196, 246.94, 293.66]];
    const pattern = [0, 1, 2, 1, 2, 1, 0, 2];
    function note(f, at, dur, type, vol, attack) {
      const c = audio(); if (!c || !master) return;
      const o = c.createOscillator(), g = c.createGain();
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, at); g.gain.exponentialRampToValueAtTime(vol, at + attack); g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
      o.connect(g).connect(master); o.start(at); o.stop(at + dur + 0.05);
    }
    function schedule(at, s) {
      const chord = chords[Math.floor(s / 8) % chords.length], k = s % 8;
      if (k === 0) chord.forEach((f) => note(f / 2, at, 3.6, 'triangle', 0.5, 0.5));
      note(chord[pattern[k]] * 2, at, 0.7, 'sine', 0.55, 0.01);
    }
    return {
      start() {
        if (!musicOn() || timer) return;
        const c = audio(); if (!c) return;
        master = c.createGain(); master.gain.setValueAtTime(0.0001, c.currentTime); master.gain.exponentialRampToValueAtTime(0.055, c.currentTime + 1.5); master.connect(c.destination);
        nextT = c.currentTime + 0.1; step = 0;
        timer = setInterval(() => { while (nextT < c.currentTime + 0.45) { schedule(nextT, step++); nextT += 0.45; } }, 120);
      },
      stop() {
        if (!timer) return;
        clearInterval(timer); timer = null;
        const c = audio(), m = master; master = null;
        if (c && m) { m.gain.cancelScheduledValues(c.currentTime); m.gain.setValueAtTime(Math.max(m.gain.value, 0.0001), c.currentTime); m.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.5); setTimeout(() => m.disconnect(), 700); }
      },
      on: musicOn,
    };
  })();

  return {
    sfxOn,
    music,
    correct() { confettiBurst(); if (sfxOn()) sound.correct(); },
    wrong() { bombBlast(); if (sfxOn()) sound.wrong(); try { navigator.vibrate && navigator.vibrate([60, 40, 120]); } catch { /* optional */ } },
    buzz() { if (sfxOn()) sound.buzz(); },
    pop() { if (sfxOn()) sound.pop(); },
    boing() { if (sfxOn()) sound.boing(); },
    ding() { if (sfxOn()) sound.ding(); },
    win() { if (sfxOn()) sound.win(); },
  };
})();
