/* © 2026 Anuja Sharma. All rights reserved. See LICENSE. */
/* Brainbloom: app logic. Plain JS, no build step. */
(() => {
  const APP_NAME = 'Brainbloom';
  const COPYRIGHT_HOLDER = 'Anuja Sharma'; // change the name on the © notice here (and in about.html, privacy.html and LICENSE)
  const COPYRIGHT_SINCE = 2026;
  const PASS_PCT = 60;

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = (a) => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage blocked: app still works for this session */ } },
  };
  const dayStr = (d = new Date()) => d.toLocaleDateString('en-CA');
  const emptyProgress = () => ({ done: {}, xp: 0, streak: 0, lastDay: null, badges: {}, path: null });

  /* ---------- state ---------- */
  const S = { view: 'map', user: null, progress: emptyProgress(), run: null, story: null, result: null, authMode: 'signup', authError: '', pickLang: 'en', notice: '', cloud: null };
  const users = () => store.get('bb_users', {});

  function save() {
    if (S.cloud) { store.set('bb_cloud_' + S.cloud.uid, S.progress); scheduleCloudSave(); }
    else if (S.user) {
      const u = users();
      if (u[S.user]) { u[S.user].progress = S.progress; u[S.user].lang = LANG.current; store.set('bb_users', u); }
    } else store.set('bb_guest', S.progress);
    const m = store.get('bb_meta', {});
    store.set('bb_meta', { lang: LANG.current, session: S.user, entered: !!m.entered || !['lang', 'welcome', 'auth', 'forgot'].includes(S.view) });
  }
  function setLang(code) {
    LANG.current = code;
    document.documentElement.lang = code === 'zh' ? 'zh-Hans' : code;
    document.title = APP_NAME + ' · ' + t('tagline').split(/[.。]/)[0];
  }

  /* ---------- curriculum helpers ---------- */
  const core = LEVELS.flatMap((l) => l.lessons);
  const isDone = (id) => !!S.progress.done[id];
  const doneIn = (list) => list.filter((l) => isDone(l.id)).length;
  const levelDone = (lv) => lv.lessons.every((l) => isDone(l.id));
  const levelsDone = () => LEVELS.filter(levelDone).length;
  const isPro = () => core.every((l) => isDone(l.id));
  const activePath = () => PATHS.find((p) => p.id === S.progress.path) || null;
  function unlocked(id) {
    let i = core.findIndex((l) => l.id === id);
    if (i >= 0) return i === 0 || isDone(core[i - 1].id);
    const p = activePath();
    if (!p || !isPro()) return false;
    i = p.lessons.findIndex((l) => l.id === id);
    return i === 0 || (i > 0 && isDone(p.lessons[i - 1].id));
  }
  const findLesson = (id) => [...core, ...PATHS.flatMap((p) => p.lessons)].find((l) => l.id === id);
  const nextLessonAfter = (id) => {
    const lists = [core, ...(activePath() ? [activePath().lessons] : [])];
    for (const list of lists) { const i = list.findIndex((l) => l.id === id); if (i >= 0) return list[i + 1] || null; }
    return null;
  };

  /* ---------- milestones ---------- */
  const doneCount = (p) => Object.keys(p.done).length;
  const BADGES = [
    { id: 'first', icon: '🌟', title: T('First steps', 'Premiers pas', 'Primeros pasos'), desc: T('Complete your first lesson', 'Terminez votre première leçon', 'Completa tu primera lección'), test: (p) => doneCount(p) >= 1 },
    { id: 'three', icon: '🔥', title: T('On a roll', 'Sur une lancée', 'En racha'), desc: T('Complete 3 lessons', 'Terminez 3 leçons', 'Completa 3 lecciones'), test: (p) => doneCount(p) >= 3 },
    { id: 'perfect', icon: '💯', title: T('Perfect score', 'Score parfait', 'Puntuación perfecta'), desc: T('Get 100% in a lesson', 'Obtenez 100 % dans une leçon', 'Consigue 100 % en una lección'), test: (p) => Object.values(p.done).some((d) => d.best >= 100) },
    { id: 'streak3', icon: '📅', title: T('3-day streak', 'Série de 3 jours', 'Racha de 3 días'), desc: T('Learn 3 days in a row', 'Apprenez 3 jours de suite', 'Aprende 3 días seguidos'), test: (p) => p.streak >= 3 },
    { id: 'xp300', icon: '⭐', title: T('300 XP', '300 XP', '300 XP'), desc: T('Earn 300 XP', 'Gagnez 300 XP', 'Gana 300 XP'), test: (p) => p.xp >= 300 },
    ...LEVELS.map((lv) => ({ id: 'lv-' + lv.id, icon: lv.icon, title: lv.title, desc: T('Finish this level', 'Terminez ce niveau', 'Termina este nivel'), test: (p) => lv.lessons.every((l) => p.done[l.id]) })),
    { id: 'pro', icon: '🏆', title: T('AI Pro', 'Pro de l’IA', 'Pro de la IA'), desc: T('Finish all four levels', 'Terminez les quatre niveaux', 'Termina los cuatro niveles'), test: (p) => core.every((l) => p.done[l.id]) },
    { id: 'path-testing', icon: '🧪', title: T('Test Whisperer', 'Chuchoteur de tests', 'Susurrador de pruebas'), desc: T('Finish the Software Testing path', 'Terminez le parcours Tests logiciels', 'Termina el camino de pruebas de software'), test: (p) => PATHS[0].lessons.every((l) => p.done[l.id]) },
    { id: 'path-trading', icon: '📈', title: T('Market Explorer', 'Explorateur des marchés', 'Explorador del mercado'), desc: T('Finish the AI in Trading path', 'Terminez le parcours IA et bourse', 'Termina el camino IA en trading'), test: (p) => PATHS.find((x) => x.id === 'trading').lessons.every((l) => p.done[l.id]) },
  ];
  PATHS.filter((p) => p.badge).forEach((p) => BADGES.push({ id: 'path-' + p.id, icon: p.badge.icon, title: p.badge.title, desc: p.badge.desc, test: (pr) => p.lessons.every((l) => pr.done[l.id]) }));
  BADGES.forEach((b) => { const h = HI.badges[b.id]; if (h) { if (h[0]) b.title.hi = h[0]; b.desc.hi = h[1]; } });
  if (window.addZh) window.addZh(BADGES);
  function awardBadges() {
    const fresh = BADGES.filter((b) => !S.progress.badges[b.id] && b.test(S.progress));
    fresh.forEach((b) => { S.progress.badges[b.id] = dayStr(); });
    return fresh;
  }

  /* ---------- auth (demo: stored in the browser) ---------- */
  const toHex = (buf) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
  async function hashPw(pw, salt) {
    if (window.crypto && crypto.subtle) {
      const enc = new TextEncoder();
      const key = await crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveBits']);
      return toHex(await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: enc.encode(salt), iterations: 100000, hash: 'SHA-256' }, key, 256));
    }
    let h = 0; for (const c of salt + pw) h = (h * 31 + c.charCodeAt(0)) | 0; // weak fallback for insecure contexts
    return 'x' + h;
  }
  const newSalt = () => toHex(crypto.getRandomValues ? crypto.getRandomValues(new Uint8Array(16)) : new Uint8Array(16));

  async function signup(name, pw) {
    const key = name.toLowerCase(), u = users();
    if (!/^[\p{L}\p{N}_.-]{3,20}$/u.test(name)) return t('errUser');
    if (pw.length < 6) return t('errPass');
    if (u[key]) return t('errUserExists');
    const salt = newSalt();
    u[key] = { display: name, salt, hash: await hashPw(pw, salt), lang: LANG.current, progress: S.progress }; // guest progress moves into the account
    store.set('bb_users', u);
    S.user = key; S.notice = t('accountSaved'); go('map');
    return '';
  }
  async function login(name, pw) {
    const key = name.toLowerCase(), rec = users()[key];
    if (!rec || (await hashPw(pw, rec.salt)) !== rec.hash) return t('errBadLogin');
    S.user = key; S.progress = rec.progress; setLang(rec.lang || LANG.current);
    S.notice = ''; go('map');
    return '';
  }
  const displayName = () => (S.cloud ? S.cloud.name || (S.cloud.email || '').split('@')[0] : S.user ? users()[S.user]?.display || S.user : t('guest'));
  /* ---------- cloud accounts (Firebase): email sign-in, forgot password, sync. Local accounts remain the fallback ---------- */
  const signedIn = () => !!(S.user || S.cloud);
  const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
  /* combine two progress records without losing anything: every lesson keeps its best score, the larger streak/XP wins */
  function mergeProgress(a, b) {
    const A = a || emptyProgress(), B = b || emptyProgress(), out = emptyProgress();
    for (const id of new Set([...Object.keys(A.done || {}), ...Object.keys(B.done || {})])) {
      const x = (A.done || {})[id], y = (B.done || {})[id];
      out.done[id] = !x ? y : !y ? x : { best: Math.max(x.best, y.best), at: x.at > y.at ? x.at : y.at };
    }
    out.xp = Math.max(A.xp || 0, B.xp || 0); out.streak = Math.max(A.streak || 0, B.streak || 0);
    out.lastDay = [A.lastDay, B.lastDay].filter(Boolean).sort().pop() || null;
    out.badges = { ...(B.badges || {}), ...(A.badges || {}) }; out.path = A.path || B.path || null;
    return out;
  }
  let cloudSaveT = null, unsubUser = null;
  function scheduleCloudSave() {
    if (!S.cloud) return;
    clearTimeout(cloudSaveT);
    const uid = S.cloud.uid;
    cloudSaveT = setTimeout(() => {
      if (!S.cloud || S.cloud.uid !== uid) return; // signed out or deleted in the meantime: never write for a user who is gone
      Cloud.save(uid, { progress: S.progress, lang: LANG.current, updated: Date.now() }).catch(() => { /* offline: the cached copy syncs on the next save */ });
    }, 900);
  }
  /* runs whenever the signed-in account changes (sign in, sign up, session restored on load, sign out) */
  async function handleUser(u) {
    if (!u) {
      if (S.cloud) { S.cloud = null; S.progress = store.get('bb_guest', emptyProgress()); if (['map', 'profile', 'milestones', 'path'].includes(S.view)) render(); }
      return;
    }
    const joined = S.mergeGuest ? S.progress : null; S.mergeGuest = false;
    S.cloud = { uid: u.uid, email: u.email, name: u.displayName || '', verified: !!u.emailVerified }; S.user = null;
    let remote = null; try { remote = await Cloud.load(u.uid); } catch { /* offline: use the cached copy */ }
    S.progress = mergeProgress(mergeProgress(remote && remote.progress, store.get('bb_cloud_' + u.uid, null)), joined);
    if (remote && remote.lang && I18N[remote.lang]) setLang(remote.lang);
    S.authError = '';
    save(); scheduleCloudSave();
    if (['auth', 'forgot', 'welcome', 'lang'].includes(S.view)) go('map'); else render();
  }
  function connectCloud() { if (unsubUser) unsubUser(); unsubUser = Cloud.onUser(handleUser); }
  async function cloudSignup(email, pw, name) {
    if (!validEmail(email)) return t('errEmail');
    if (pw.length < 6) return t('errPass');
    try { S.mergeGuest = true; S.notice = t('verifySent', { email }); await Cloud.signUp(email, pw, name); return ''; }
    catch (e) { S.mergeGuest = false; S.notice = ''; return t(Cloud.errorKey(e)); }
  }
  async function cloudLogin(email, pw) {
    if (!validEmail(email)) return t('errEmail');
    try { S.mergeGuest = false; S.notice = ''; await Cloud.signIn(email, pw); return ''; } catch (e) { return t(Cloud.errorKey(e)); }
  }


  /* ---------- navigation ---------- */
  function go(view) { S.view = view; save(); render(); window.scrollTo(0, 0); }

  /* ---------- lesson runner ---------- */
  function prepQuestion(q) {
    const p = { def: q, type: q.type, text: tr(q.q) };
    if (q.type === 'mc') {
      const opts = q.opts[LANG.current] || q.opts.en;
      p.items = shuffle(opts.map((text, i) => ({ text, i })));
    } else if (q.type === 'match') {
      p.pairs = q.pairs[LANG.current] || q.pairs.en;
      const idx = p.pairs.map((_, i) => i);
      p.left = shuffle(idx); p.right = shuffle(idx); p.matched = []; p.sel = null; p.wrong = 0; p.flash = null;
    } else if (q.type === 'order') {
      p.steps = q.steps[LANG.current] || q.steps.en;
      const idx = p.steps.map((_, i) => i);
      let sh = shuffle(idx); while (sh.every((v, i) => v === i) && idx.length > 1) sh = shuffle(idx);
      p.pool = sh; p.picked = [];
    }
    return p;
  }
  function startLesson(id) {
    const lesson = findLesson(id);
    if (!lesson || !unlocked(id)) return;
    const scenes = INTROS[id] || [];
    if (scenes.length) { S.story = { lesson, scenes, i: 0, done: false, timer: null }; go('story'); }
    else beginQuiz(lesson);
  }
  /* a story ends in the quiz; a skit (shown after a passed lesson) returns to the result screen */
  function endStory() {
    const st = S.story;
    if (st.mode === 'skit') { stopStory(); S.story = null; go('result'); }
    else beginQuiz(st.lesson);
  }
  function beginQuiz(lesson) {
    stopStory();
    S.story = null;
    S.run = { lesson, qs: lesson.questions.map(prepQuestion), i: 0, correct: 0, fb: null, chosen: null, enter: true, tries: 0, wrongSet: [], outcomes: [] };
    go('lesson');
  }

  /* ---------- story intro: speech bubbles, typewriter text, optional voice ---------- */
  const voiceOn = () => store.get('bb_voice', true);
  const canSpeak = () => 'speechSynthesis' in window;
  /* Bruno prefers a male-sounding voice, Pinky a female one; both are pushed up to a child's pitch.
     Voices that run on the device (localService) obey pitch, while many online voices ignore it, so those are tried first. */
  const MALE = /david|mark|richard|james|male|hemant|pablo|raul|jorge|diego|claude|paul|henri|antoine|thomas|kangkang|yunxi|yunjian|yunyang|yunhao|google.*(fr|es|hi|zh|cmn)/i;
  const FEMALE = /zira|linda|susan|female|heera|kalpana|swara|helena|sabina|paulina|monica|elena|denise|julie|hortense|caroline|amelie|lekha|huihui|xiaoxiao|xiaoyi|yaoyao|tingting|meijia|hazel|samantha/i;
  const KID_VOICE = { bear: { pitch: 2, rate: 1.1 }, bunny: { pitch: 2, rate: 1.2 } }; // browsers cap pitch at 2
  function pickVoice(who) {
    if (!canSpeak()) return null;
    const all = speechSynthesis.getVoices().filter((v) => v.lang.replace('_', '-').toLowerCase().startsWith(LANG.current) && !/zh[-_]?hk|yue|cantonese|sinji|hiugaai|wanlung/i.test(v.lang + ' ' + v.name));
    if (!all.length) return null;
    const local = all.filter((v) => v.localService), pool = local.length ? local : all;
    const pref = who === 'bear' ? MALE : FEMALE, avoid = who === 'bear' ? FEMALE : MALE;
    return pool.find((v) => pref.test(v.name) && !avoid.test(v.name)) || pool.find((v) => !avoid.test(v.name)) || pool[0];
  }
  /* voices load lazily on many browsers: re-draw the story once they arrive so the "no voice" note can disappear */
  if (canSpeak()) speechSynthesis.onvoiceschanged = () => { const n = document.querySelector('.voice-note'); if (n && S.story && pickVoice('bear')) n.remove(); };

  /* ---------- lip sync ----------
     A mouth timeline is built from the line's syllables (vowel groups in Latin text, one per character in Chinese
     and Hindi), with short pauses at punctuation. It starts when the voice really starts and is re-aligned at every
     word boundary the voice reports, so the mouth opens and shuts with the speech instead of flapping at random. */
  function makeLip(text, rate) {
    const per = 1 / (4.7 * rate), beats = [], words = [];
    const VOW = { a: [1, 0], à: [1, 0], â: [1, 0], ä: [1, 0], á: [1, 0], o: [0.85, 0.7], ô: [0.85, 0.7], ó: [0.85, 0.7], u: [0.6, 0.85], ù: [0.6, 0.85], û: [0.6, 0.85], ü: [0.6, 0.85], e: [0.7, 0], é: [0.65, 0], è: [0.7, 0], ê: [0.7, 0], ë: [0.7, 0], i: [0.45, 0], î: [0.45, 0], ï: [0.45, 0], í: [0.45, 0], y: [0.45, 0] };
    let t = 0, m; const re = /[一-鿿]|[ऄ-औक-ह]|[A-Za-zÀ-ÿ']+|[,;:，；、]|[.!?…。！？]/g;
    const add = (amp, round, idx) => { if (idx != null) words.push({ idx, t }); beats.push({ t0: t, t1: t + per * 0.88, amp, round }); t += per; };
    while ((m = re.exec(text))) {
      const w = m[0];
      if (/^[,;:，；、]$/.test(w)) { t += 0.14; continue; }
      if (/^[.!?…。！？]$/.test(w)) { t += 0.28; continue; }
      if (/^[A-Za-zÀ-ÿ']+$/.test(w)) {
        const groups = w.toLowerCase().replace(/(?<=[^aeiouy])e$/, '').match(/[aeiouyàâäáôóùûüúéèêëîïí]+/g) || ['a'];
        groups.forEach((g, i) => { const v = VOW[g[0]] || [0.6, 0]; add(v[0], Math.max(v[1], /ou|oo|u/.test(g) ? 0.7 : 0), i ? null : m.index); });
        t += 0.03;
      } else { const k = (w.charCodeAt(0) * 7) % 5; add(0.5 + k * 0.12, k === 2 ? 0.6 : 0, m.index); }
    }
    const lip = { started: false, stopped: false, start0: 0, shift: 0, held: 0 };
    lip.start = () => { if (!lip.started) { lip.started = true; lip.start0 = performance.now(); } };
    lip.stop = () => { lip.stopped = true; };
    lip.hold = (on) => { if (on) lip.held = performance.now(); else if (lip.held) { lip.shift -= (performance.now() - lip.held) / 1000; lip.held = 0; } };
    lip.boundary = (charIndex) => {
      if (!lip.started) lip.start();
      let w = null; for (const x of words) { if (x.idx <= charIndex) w = x; else break; }
      if (w) lip.shift = (performance.now() - lip.start0) / 1000 - w.t;
    };
    lip.open = (now) => {
      if (!lip.started || lip.stopped) return { open: 0, round: 0 };
      const tt = (now - lip.start0) / 1000 - lip.shift;
      if (tt < 0) return { open: 0, round: 0 };
      if (tt > t) return { open: 0.25 + 0.3 * Math.abs(Math.sin(tt * 9)), round: 0 }; // the voice outlasts the estimate: keep a soft murmur going
      for (const b of beats) if (tt >= b.t0 && tt <= b.t1) return { open: b.amp * Math.pow(Math.sin(Math.PI * (tt - b.t0) / (b.t1 - b.t0)), 0.7), round: b.round };
      return { open: 0.04, round: 0 };
    };
    return lip;
  }
  /* Speaks only when a voice for the chosen language exists, so Hindi is never read with an English accent. */
  function speak(text, who, onend, lip) {
    if (!voiceOn()) return false;
    const voice = pickVoice(who);
    if (!voice) return false;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.voice = voice; u.lang = voice.lang;
      // child-like voices: Bruno = young boy, Pinky = young girl (high pitch, a little quicker, like excited kids)
      u.pitch = KID_VOICE[who].pitch; u.rate = KID_VOICE[who].rate;
      if (lip) { u.onstart = () => lip.start(); u.onboundary = (e) => { if (e.name === 'word' || e.name === undefined) lip.boundary(e.charIndex); }; }
      u.onend = u.onerror = () => { if (lip) lip.stop(); if (onend) onend(); };
      speechSynthesis.speak(u);
      return true;
    } catch { return false; } // a broken speech engine must never break the story
  }

  /* ---------- the "film" player: one continuous timeline, nothing is re-drawn between lines ---------- */
  const readMs = (text) => Math.max(2300, text.length * 62); // how long a line stays up when nobody speaks it
  function clearStoryTimers(st) {
    if (!st) return;
    clearTimeout(st.endT); clearTimeout(st.adv); clearTimeout(st.intro);
    st.endT = st.adv = st.intro = null;
  }
  function stopStory() {
    clearStoryTimers(S.story);
    if (canSpeak()) speechSynthesis.cancel();
    if (S.story && S.story.lip) S.story.lip.stop();
    if (Stage3D) { Stage3D.lip(null); Stage3D.speak(null); }
    FX.music.stop();
  }
  /* who is talking: 3D camera + mouth, and the 2D fallback mascots */
  function setSpeakerFx(who, talking) {
    if (Stage3D) { if (talking) Stage3D.speak(who); else Stage3D.hush(); }
    document.querySelectorAll('.cast .mascot').forEach((m) => {
      const me = m.classList.contains(who);
      m.classList.toggle('speaker', me); m.classList.toggle('quiet', !me); m.classList.toggle('talking', me && talking);
    });
  }
  function armEnd(ms, fn) {
    const st = S.story;
    clearTimeout(st.endT);
    st.endAt = performance.now() + ms; st.endFn = fn; st.endT = setTimeout(fn, ms);
  }
  const visHtml = (sc) => sc.v.map((tok, i) => `<span class="vi${tok.length <= 2 && /[→≠❓]/.test(tok) ? ' arrow' : ''}" style="animation-delay:${i * 0.3}s">${tok}</span>`).join('');
  function swapVis(sc, token) {
    const v = $('#vis'); if (!v) return;
    const apply = () => { v.innerHTML = visHtml(sc); v.classList.remove('out'); };
    if (!v.children.length) apply();
    else { v.classList.add('out'); setTimeout(() => { if (S.story && S.story.token === token) apply(); }, 220); }
  }
  function swapSubtitle(sc, text, token) {
    const sub = $('#sub'); if (!sub) return;
    const apply = () => { sub.dataset.who = sc.who; $('#who').textContent = sc.who === 'bear' ? 'Bruno 🐻' : 'Pinky 🐰'; $('#subtext').textContent = text; sub.classList.add('show'); };
    if (!sub.classList.contains('show')) return apply();
    sub.classList.remove('show');
    setTimeout(() => { if (S.story && S.story.token === token) apply(); }, 200);
  }
  function playStory() {
    const st = S.story; if (!st) return;
    clearStoryTimers(st); st.token = (st.token || 0) + 1;
    FX.music.start();
    if (!st.introDone) st.intro = setTimeout(() => { // title card, then the characters walk in, like a film opening
      st.introDone = true;
      const card = $('#titlecard'); if (card) card.classList.add('gone');
      if (Stage3D) { Stage3D.enter(); st.intro = setTimeout(showScene, 1700); } else showScene();
    }, 1500);
    else showScene();
  }
  function showScene() {
    const st = S.story; if (!st) return;
    const sc = st.scenes[st.i], text = tr(sc.text), token = st.token;
    const card = $('#titlecard'); if (card) card.classList.add('gone');
    document.querySelectorAll('#dots .dot').forEach((d, i) => { d.classList.toggle('past', i < st.i); d.classList.toggle('now', i === st.i); });
    swapVis(sc, token); swapSubtitle(sc, text, token);
    const lip = st.lip = makeLip(text, KID_VOICE[sc.who].rate);
    if (Stage3D) Stage3D.lip((now) => lip.open(now));
    setSpeakerFx(sc.who, true);
    const shot = shotFor(sc, st.i, st.scenes.length);
    if (Stage3D) { Stage3D.mood(sc.mood); Stage3D.shot(shot); }
    const stage = $('.stage'); if (stage) stage.dataset.shot = shot; if (stage) { stage.classList.remove('mood-oops', 'mood-cheer'); if (sc.mood) stage.classList.add('mood-' + sc.mood); }
    if (sc.mood === 'oops') FX.boing(); else if (sc.mood === 'cheer') FX.ding();
    st.sceneDone = false;
    const end = () => sceneEnd(token);
    const voiced = st.voiced = speak(text, sc.who, end, lip);
    if (!voiced) lip.start(); // no voice: the mouth still moves while the line is on screen
    armEnd(voiced ? 4000 + text.length * 110 : readMs(text), end); // safety net if the speech engine never reports the end
  }
  /* the next line starts right after the last one finishes: tight gap, same shot, no redraw */
  function sceneEnd(token) {
    const st = S.story;
    if (!st || st.token !== token || st.sceneDone) return;
    st.sceneDone = true; clearTimeout(st.endT);
    if (st.lip) st.lip.stop();
    setSpeakerFx(st.scenes[st.i].who, false);
    st.adv = setTimeout(() => { if (S.story !== st || st.token !== token) return; if (st.paused) st.pendingNext = true; else nextScene(); }, 280);
  }
  function nextScene() {
    const st = S.story; st.pendingNext = false;
    if (st.i + 1 >= st.scenes.length) return outro();
    st.i++; st.token++; showScene();
  }
  function outro() {
    const st = S.story, el = $('#story');
    if (el) el.classList.add('fadeout');
    FX.music.stop();
    st.adv = setTimeout(() => { if (S.story === st) endStory(); }, 700);
  }
  /* a pair is tried by tapping left then right, or by dragging the left item onto the right one */
  function tryMatch(i, j) {
    const r = S.run, q = r.qs[r.i];
    if (!q || q.type !== 'match' || r.fb || q.matched.includes(i) || q.matched.includes(j)) return;
    if (i === j) {
      q.matched.push(j); q.sel = null; q.flash = null; FX.pop();
      if (q.matched.length === q.pairs.length) answer(q.wrong <= 1, q.wrong <= 1 ? {} : { mild: true }); else render();
    } else { q.wrong++; q.flash = { side: 'R', i: j }; q.sel = null; FX.buzz(); render(); }
  }

  function answer(ok, extra = {}) {
    const r = S.run, q = r.qs[r.i];
    if (!ok && r.tries === 0 && q.type !== 'match') { // first miss: one more attempt, no answer revealed yet
      r.tries = 1; FX.wrong(); r.fb = { ok: false, retry: true }; render(); return;
    }
    // first try = full credit, second try = half, matching puzzle finished with mistakes = half
    const credit = q.type === 'match' ? (q.wrong === 0 ? 1 : 0.5) : ok ? (r.tries === 0 ? 1 : 0.5) : 0;
    r.correct += credit;
    r.outcomes.push(credit === 1 ? 'first' : credit === 0.5 ? 'second' : 'miss');
    if (extra.mild) FX.ding(); else if (ok) FX.correct(); else FX.wrong();
    r.fb = { ok, half: q.type === 'match' ? ok && q.wrong === 1 : ok && r.tries > 0, why: tr(q.def.why || { en: '' }), ...extra };
    render();
  }
  function finishLesson() {
    const r = S.run, total = r.qs.length, pct = Math.round((r.correct / total) * 100), pass = pct >= PASS_PCT;
    const prev = S.progress.done[r.lesson.id];
    let xp = Math.round(r.correct * 10);
    if (pass) {
      if (!prev) xp += 20;
      if (pct === 100 && (!prev || prev.best < 100)) xp += 10;
      S.progress.done[r.lesson.id] = { best: Math.max(pct, prev ? prev.best : 0), at: dayStr() };
      const today = dayStr(), yest = dayStr(new Date(Date.now() - 864e5));
      if (S.progress.lastDay !== today) { S.progress.streak = S.progress.lastDay === yest ? S.progress.streak + 1 : 1; S.progress.lastDay = today; }
    }
    S.progress.xp += xp;
    const wasPro = !!S.progress.badges.pro;
    const fresh = awardBadges();
    S.result = { lesson: r.lesson, outcomes: r.outcomes, pct, pass, xp, fresh, justPro: !wasPro && fresh.some((b) => b.id === 'pro'), next: pass ? nextLessonAfter(r.lesson.id) : null };
    S.run = null;
    go('result');
    if (pass) FX.win();
  }

  /* ---------- views ---------- */
  const stars = (pct) => (pct >= 100 ? '★★★' : pct >= 80 ? '★★☆' : '★☆☆');
  const bar = (pct) => `<div class="bar"><span style="width:${pct}%"></span></div>`;


  /* the little car carrying Bruno and Pinky (used on the learning track and on the quiz progress bar) */
  const carSvg = () => `<svg class="carsvg" viewBox="0 0 110 64" aria-hidden="true">
    <g class="bob">
      <!-- Bruno (left seat) and Pinky (right seat) sit in the open cockpit -->
      <ellipse cx="44" cy="31" rx="10" ry="6" fill="#a56a3c"/><ellipse cx="66" cy="32" rx="8.5" ry="5.5" fill="#f7a8c9"/>
      <circle cx="37" cy="9" r="4.6" fill="#8f5a33"/><circle cx="53" cy="9" r="4.6" fill="#8f5a33"/>
      <circle cx="45" cy="17" r="11" fill="#a56a3c"/><ellipse cx="45" cy="21" rx="5.6" ry="4" fill="#e3c39a"/>
      <circle cx="41.5" cy="15" r="1.4" fill="#2b1a10"/><circle cx="48.5" cy="15" r="1.4" fill="#2b1a10"/><ellipse cx="45" cy="19.5" rx="1.8" ry="1.2" fill="#2b1a10"/>
      <ellipse cx="62" cy="5" rx="3" ry="9" fill="#f48ab5"/><ellipse cx="62" cy="5.5" rx="1.5" ry="6.5" fill="#ffe0ec"/>
      <ellipse cx="71.5" cy="6.5" rx="3" ry="8" fill="#f48ab5" transform="rotate(14 71.5 6.5)"/><ellipse cx="71.5" cy="7" rx="1.5" ry="5.6" fill="#ffe0ec" transform="rotate(14 71.5 7)"/>
      <circle cx="66.5" cy="19" r="10" fill="#f7a8c9"/><ellipse cx="66.5" cy="22.5" rx="5" ry="3.6" fill="#fff"/><circle cx="63" cy="17.5" r="1.3" fill="#2b1a10"/><circle cx="70" cy="17.5" r="1.3" fill="#2b1a10"/><circle cx="66.5" cy="21" r="1.4" fill="#f08aa8"/>
      <!-- convertible tub: open cockpit, hood sloping down to the front -->
      <path d="M7 47 C4 40 6 35 14 34 L34 33 C45 35 60 35 70 34 L76 31 C88 29 100 32 104 39 L105 47 Z" fill="#ffd23f"/>
      <path d="M11 36 C10 27 21 22 31 25 C36 27 37 31 35 34 L13 36 Z" fill="#2e2a4a"/>
      <path d="M14 33 C17 28 24 26 31 27.5" fill="none" stroke="#5a5683" stroke-width="1" stroke-dasharray="2 1.6"/>
      <path d="M34 33 C45 35 60 35 70 34" fill="none" stroke="#e0a800" stroke-width="1.6"/>
      <path d="M77 30.5 L69.5 19" stroke="#d9dce6" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M75 30 L69 21 L72.5 20.5 L77 29.5 Z" fill="#bfe6ff" opacity=".7"/>
      <path d="M9 47 C9 38 19 34 29 37 C39 40 44 43 46 47 Z" fill="#ffdd5e"/>
      <path d="M61 47 C63 40 72 35 82 35 C93 35 101 40 105 47 Z" fill="#ffdd5e"/>
      <path d="M9 47 C9 38 19 34 29 37 C39 40 44 43 46 47" fill="none" stroke="#e0a800" stroke-width="1"/>
      <path d="M61 47 C63 40 72 35 82 35 C93 35 101 40 105 47" fill="none" stroke="#e0a800" stroke-width="1"/>
      <rect x="45" y="46" width="17" height="4" rx="2" fill="#3a3a48"/>
      <path d="M55 36 L55 45" stroke="#e0a800" stroke-width="1"/><rect x="57" y="38.5" width="4" height="1.6" rx=".8" fill="#e0a800"/>
      <circle cx="97" cy="38" r="4.2" fill="#fff7cc" stroke="#d8b44a" stroke-width="1"/>
      <rect x="102" y="43" width="6" height="5" rx="2" fill="#d9dce6"/><rect x="2" y="43" width="6" height="5" rx="2" fill="#d9dce6"/>
      <circle cx="9" cy="40" r="1.8" fill="#e5484d"/>
    </g>
    <circle cx="28" cy="49" r="12" fill="#25203f"/><circle cx="84" cy="49" r="12" fill="#25203f"/>
    <g class="wheel" style="transform-origin:28px 50px"><circle cx="28" cy="50" r="9" fill="#1c1a2b"/><circle cx="28" cy="50" r="5" fill="#d9dce6"/><circle cx="28" cy="50" r="1.6" fill="#8b8fa3"/><rect x="27.2" y="42" width="1.6" height="5" fill="#8b8fa3"/><rect x="27.2" y="53" width="1.6" height="5" fill="#8b8fa3"/></g>
    <g class="wheel" style="transform-origin:84px 50px"><circle cx="84" cy="50" r="9" fill="#1c1a2b"/><circle cx="84" cy="50" r="5" fill="#d9dce6"/><circle cx="84" cy="50" r="1.6" fill="#8b8fa3"/><rect x="83.2" y="42" width="1.6" height="5" fill="#8b8fa3"/><rect x="83.2" y="53" width="1.6" height="5" fill="#8b8fa3"/></g>
  </svg>`;

  /* learning track: a stop per level, then AI Pro, then your path; the car sits at the stop you are on */
  function trackNodes() {
    const p = activePath();
    const nodes = LEVELS.map((lv) => ({ id: 'sec-' + lv.id, icon: lv.icon, label: tr(lv.title), done: levelDone(lv) }));
    nodes.push({ id: 'pro', icon: '🏆', label: t('proRank'), done: isPro() });
    nodes.push({ id: 'path', icon: p ? p.icon : '🧭', label: t('yourPath'), done: !!p && p.lessons.every((l) => isDone(l.id)) });
    return nodes;
  }
  function viewTrack() {
    const nodes = trackNodes(), n = nodes.length, firstOpen = nodes.findIndex((x) => !x.done), idx = firstOpen < 0 ? n - 1 : firstOpen;
    const pos = (i) => 8 + (i * 84) / (n - 1);
    const total = core.length, pct = Math.round((doneIn(core) / total) * 100);
    const stops = nodes.map((x, i) => `<button class="stop ${x.done ? 'done' : i === idx ? 'cur' : 'lock'}" style="left:${pos(i)}%" data-act="jump" data-arg="${x.id}" title="${esc(x.label)}"><i>${x.done ? '✔' : x.icon}</i><small>${esc(x.label)}</small></button>`).join('');
    return `<div class="card track"><div class="row"><b>🛣️ ${esc(t('yourTrack'))}</b><span class="pct">${pct}%</span></div>
      <div class="road"><div class="roadfill" style="width:${pos(idx)}%"></div>${stops}<div class="car" style="--p:${pos(idx)}%">${carSvg()}</div></div></div>`;
  }
  /* the next lesson to play, so "Home" always shows where to carry on */
  function nextUp() {
    const lists = [core, ...(activePath() ? [activePath().lessons] : [])];
    for (const list of lists) { const l = list.find((x) => !isDone(x.id) && unlocked(x.id)); if (l) return l; }
    return null;
  }
  function crumbsHtml(lesson) {
    const li = LEVELS.findIndex((lv) => lv.lessons.some((l) => l.id === lesson.id));
    let where = '';
    if (li >= 0) where = t('levelN', { n: li + 1 }) + ' · ' + tr(LEVELS[li].title);
    else { const p = PATHS.find((x) => x.lessons.some((l) => l.id === lesson.id)); if (p) where = t('yourPath') + ' · ' + tr(p.title); }
    return `<nav class="crumbs" aria-label="breadcrumb"><button class="crumb home" data-act="crumb-home">🏠 ${esc(t('home'))}</button><span class="sep">›</span><span class="crumb">${esc(where)}</span><span class="sep">›</span><b class="crumb now">${lesson.icon} ${esc(tr(lesson.title))}</b></nav>`;
  }

  function shell(inner) {
    const items = [['map', '🏠', t('home')], ['milestones', '🏅', t('milestones')], ['profile', '👤', t('profile')]];
    const nav = (cls) => items.map(([v, ic, label]) => `<button class="${cls}${S.view === v || (v === 'map' && S.view === 'path') ? ' on' : ''}" data-act="nav" data-arg="${v}"><span class="ic">${ic}</span><span>${esc(label)}</span></button>`).join('');
    return `<div class="shell">
      <aside class="side"><div class="brand"><span class="logo">🌸</span>${APP_NAME}</div>${nav('navitem')}</aside>
      <div class="content">
        <header class="top"><div class="brand mobile"><span class="logo">🌸</span>${APP_NAME}</div>
          <div class="chips"><span class="chip" title="XP">⭐ ${S.progress.xp}</span><span class="chip" title="${esc(t('dayStreak'))}">🔥 ${S.progress.streak}</span></div></header>
        <main class="page">${inner}</main>
      </div>
      <nav class="bottom">${nav('navitem')}</nav></div>`;
  }

  function langPicker(selected, act) {
    return `<div class="langs">${LANGS.map((l) => `<button class="lang${l.code === selected ? ' on' : ''}" data-act="${act}" data-arg="${l.code}"><span class="lb">${l.badge}</span>${esc(l.name)}</button>`).join('')}</div>`;
  }

  const legalFooter = () => {
    const yr = new Date().getFullYear(), years = yr > COPYRIGHT_SINCE ? COPYRIGHT_SINCE + '–' + yr : String(COPYRIGHT_SINCE);
    return `<p class="muted legal">© ${years} ${esc(COPYRIGHT_HOLDER)}. ${esc(t('rights'))}<br><a href="privacy.html" target="_blank" rel="noopener">${esc(t('privacyLink'))}</a> · <a href="about.html" target="_blank" rel="noopener">${esc(t('aboutLink'))}</a></p>`;
  };

  /* placeholder the shared 3D canvas moves into; holds the 2D mascots as a fallback if WebGL is unavailable */
  const stage3d = (kind, fallback, cls = '', mood = '', extra = '') => `<div class="m3d ${cls}" data-3d="${kind}"${mood ? ` data-mood="${mood}"` : ''}${extra}>${fallback}</div>`;

  /* the forest behind the characters: layered, blurred trees, bokeh lights and soft flowers in front (depth of field) */
  function forestBackdrop() {
    let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    const pine = (x, h, col, blur, op) => `<svg class="pine" viewBox="0 0 100 130" style="left:${x}%;height:${h}%;filter:blur(${blur}px);opacity:${op}" fill="${col}"><polygon points="50,0 82,38 18,38"/><polygon points="50,22 90,70 10,70"/><polygon points="50,50 98,112 2,112"/><rect x="44" y="108" width="12" height="22"/></svg>`;
    let far = '', mid = '', bokeh = '';
    for (let i = 0; i < 9; i++) far += pine(i * 12 - 4 + rnd() * 6, 46 + rnd() * 16, '#245a68', 3, 0.75);
    for (let i = 0; i < 6; i++) mid += pine(i * 19 - 6 + rnd() * 8, 62 + rnd() * 18, '#17414f', 2, 0.85);
    for (let i = 0; i < 14; i++) bokeh += `<i class="bk" style="left:${Math.round(rnd() * 100)}%;top:${Math.round(rnd() * 70)}%;width:${14 + Math.round(rnd() * 44)}px;height:${14 + Math.round(rnd() * 44)}px;animation-delay:-${(rnd() * 12).toFixed(1)}s;animation-duration:${(10 + rnd() * 10).toFixed(1)}s"></i>`;
    const flower = (x, y, size, hue) => `<i class="fl" style="left:${x}%;bottom:${y}%;width:${size}px;height:${size}px;--p:${hue}"></i>`;
    return `<div class="bg" aria-hidden="true"><div class="sun"></div><div class="trees far">${far}</div><div class="trees mid">${mid}</div><div class="grass"></div>${bokeh}</div>
      <div class="fg" aria-hidden="true">${flower(-5, 12, 92, '#ff7fb6')}${flower(8, 2, 54, '#c58cff')}${flower(88, 9, 80, '#ff8fc2')}${flower(78, -2, 46, '#ffd36b')}</div>`;
  }

  /* which camera shot a line gets: establish wide, move in on the speaker, party shots for happy beats, tight two-shot for the punchline */
  function shotFor(sc, i, n) {
    if (sc.shot) return sc.shot;
    if (i === 0) return 'wide';
    if (i === n - 1) return 'duoClose';
    if (sc.mood === 'cheer') return 'dance';
    if (sc.mood === 'oops') return 'close';
    return i % 2 ? 'medium' : 'close';
  }

  function viewStory() {
    const st = S.story, title = st.mode === 'skit' ? t('skitTitle') : tr(st.lesson.title);
    const dots = st.scenes.map(() => '<span class="dot"></span>').join('');
    const cast = `<div class="cast">${mascot('bear', 'quiet')}${mascot('bunny', 'quiet')}</div>`;
    const noVoice = (st.noVoice = voiceOn() && canSpeak() && !pickVoice('bear')) ? `<p class="muted voice-note" role="note">🔇 ${esc(t('noVoice', { lang: LANGS.find((l) => l.code === LANG.current).name }))}</p>` : '';
    return `<div class="story movie" id="story">
      <div class="lhead"><button class="icon-btn homebtn" data-act="crumb-home" aria-label="${esc(t('home'))}" title="${esc(t('home'))}">🏠</button><div class="dots" id="dots">${dots}</div>
        <button class="icon-btn${FX.music.on() ? '' : ' off'}" id="musicbtn" data-act="toggle-music" title="${esc(FX.music.on() ? t('musicOn') : t('musicOff'))}">🎵</button>
        <button class="icon-btn" id="voicebtn" data-act="toggle-voice" title="${esc(voiceOn() ? t('voiceOn') : t('voiceOff'))}">${voiceOn() ? '🔊' : '🔇'}</button></div>
      ${crumbsHtml(st.lesson)}
      <div class="stage cinema">
        ${forestBackdrop()}
        <div class="titlecard" id="titlecard"><span class="tc-ic">${st.mode === 'skit' ? '🎭' : st.lesson.icon}</span><h2>${esc(title)}</h2>${st.mode === 'skit' ? '' : `<p>${esc(t('storyTime'))}</p>`}</div>
        <div class="vis" id="vis" aria-hidden="true"></div>
        ${stage3d('duo', cast, 'cast3d', '', ` data-enter data-props="${st.lesson.id}"`)}
        <div class="vignette"></div><div class="grain"></div>
        <div class="letterbox top"></div><div class="letterbox bottom"></div>
        <div class="subtitle" id="sub" role="status" aria-live="polite"><b class="who" id="who"></b><p id="subtext"></p></div>
      </div>
      ${noVoice}
      <div class="story-actions">
        <button class="btn ghost" data-act="story-replay">🔁 ${esc(t('replayVoice'))}</button>
        <button class="btn ghost" data-act="story-skip">${esc(t('skip'))}</button>
        <button class="btn ghost push" id="pausebtn" data-act="story-pause">⏸ ${esc(t('pause'))}</button>
      </div></div>`;
  }

  function confetti() {
    const colors = ['#6c5ce7', '#00b8a9', '#f5a623', '#ff6fa5', '#16a34a'];
    return `<div class="confetti" aria-hidden="true">${Array.from({ length: 36 }, (_, i) => `<i style="left:${Math.round(Math.random() * 100)}%;background:${colors[i % 5]};animation-delay:${(Math.random() * 1.2).toFixed(2)}s;animation-duration:${(2 + Math.random() * 2).toFixed(2)}s"></i>`).join('')}</div>`;
  }

  function viewLang() {
    return `<div class="center"><div class="hero">${stage3d('front', `<div class="duo">${mascot('bear', 'wave')}${mascot('bunny', 'jump')}</div>`, 'duo3d')}<h1>${APP_NAME}</h1></div>
      <h2>${LANGS.map((l) => esc(I18N[l.code].chooseLang)).join(' · ')}</h2>
      ${langPicker(S.pickLang, 'pick-lang')}
      <button class="btn primary wide" data-act="lang-continue">${esc(I18N[S.pickLang].continue)} →</button>
      <p class="muted">${esc(I18N[S.pickLang].langHint)}</p>${legalFooter()}</div>`;
  }

  function viewWelcome() {
    return `<div class="center"><div class="hero">${stage3d('front', `<div class="duo">${mascot('bear', 'wave')}${mascot('bunny', 'jump')}</div>`, 'duo3d')}<h1>${esc(t('welcomeTitle'))}</h1><p class="lead">${esc(t('welcomeSub'))}</p></div>
      <div class="stack">
        <button class="btn primary wide" data-act="guest">🎮 ${esc(t('playGuest'))}</button>
        <button class="btn wide" data-act="auth" data-arg="signup">✨ ${esc(t('createAccount'))}</button>
        <button class="btn ghost wide" data-act="auth" data-arg="login">${esc(t('login'))}</button>
      </div><p class="muted">${esc(t('guestNote'))}</p>${legalFooter()}</div>`;
  }

  function viewAuth() {
    const signupMode = S.authMode === 'signup';
    return `<div class="center"><form id="auth" class="card form" autocomplete="on">
      <h2>${esc(signupMode ? t('createAccount') : t('login'))}</h2>
      ${Cloud.on
        ? `<label>${esc(t('email'))}<input name="u" type="email" required autocomplete="email" autocapitalize="none" inputmode="email"></label>${signupMode ? `<label>${esc(t('displayNameOpt'))}<input name="n" maxlength="30" autocomplete="nickname"></label>` : ''}`
        : `<label>${esc(t('username'))}<input name="u" required minlength="3" maxlength="20" autocomplete="username" autocapitalize="none"></label>`}
      <label>${esc(t('password'))}<input name="p" type="password" required minlength="${signupMode ? 6 : 1}" autocomplete="${signupMode ? 'new-password' : 'current-password'}"></label>
      <p class="error" role="alert">${esc(S.authError)}</p>
      <button class="btn primary wide" type="submit">${esc(signupMode ? t('signup') : t('login'))}</button>
      ${Cloud.on && !signupMode ? `<button class="btn ghost wide" type="button" data-act="forgot">${esc(t('forgotPassword'))}</button>` : ''}
      <button class="btn ghost wide" type="button" data-act="auth" data-arg="${signupMode ? 'login' : 'signup'}">${esc(signupMode ? t('login') : t('createAccount'))}</button>
      <button class="btn ghost wide" type="button" data-act="${signedIn() || store.get('bb_meta', {}).entered ? 'nav' : 'to-welcome'}" data-arg="profile">← ${esc(t('back'))}</button>
      <p class="muted">${esc(Cloud.on ? t('authNoteCloud') : t('authNote'))} <a href="privacy.html" target="_blank" rel="noopener">${esc(t('privacyLink'))}</a></p></form></div>`;
  }

  function viewForgot() {
    return `<div class="center"><form id="forgot" class="card form" autocomplete="on">
      <h2>${esc(t('forgotTitle'))}</h2><p class="muted">${esc(t('forgotHelp'))}</p>
      <label>${esc(t('email'))}<input name="e" type="email" required autocomplete="email" autocapitalize="none" inputmode="email"></label>
      <p class="${S.forgotOk ? 'okmsg' : 'error'}" role="status">${esc(S.forgotMsg || '')}</p>
      <button class="btn primary wide" type="submit">${esc(t('sendReset'))}</button>
      <button class="btn ghost wide" type="button" data-act="auth" data-arg="login">← ${esc(t('back'))}</button></form></div>`;
  }

  let tileN = 0;
  function lessonTile(l) {
    const open = unlocked(l.id), d = S.progress.done[l.id];
    const state = d ? 'done' : open ? 'open' : 'locked';
    return `<button class="tile ${state}" data-lid="${l.id}" style="--i:${tileN++}" ${open ? `data-act="lesson" data-arg="${l.id}"` : 'disabled'} aria-label="${esc(tr(l.title))}">
      <span class="tic">${open || d ? l.icon : '🔒'}</span>
      <span class="tt">${esc(tr(l.title))}</span>
      <span class="ts">${d ? `<b class="stars">${stars(d.best)}</b> ${esc(t('replay'))}` : open ? esc(t('start')) + ' ▶' : esc(t('locked'))}</span></button>`;
  }

  function viewMap() {
    tileN = 0;
    const total = core.length, done = doneIn(core);
    const guestBanner = !signedIn() ? `<div class="banner"><span>💾 ${esc(t('guestBanner'))}</span><button class="btn small" data-act="auth" data-arg="signup">${esc(t('saveProgress'))}</button></div>` : '';
    const notice = S.notice ? `<div class="banner ok">✅ ${esc(S.notice)}</div>` : '';
    const proBanner = isPro() && !S.progress.path ? `<div class="banner pro"><span>🏆 <b>${esc(t('proTitle'))}</b> ${esc(t('proText'))}</span><button class="btn primary small" data-act="nav" data-arg="path">${esc(t('choosePath'))}</button></div>` : '';
    const levels = LEVELS.map((lv, i) => {
      const lockedLv = i > 0 && !levelDone(LEVELS[i - 1]);
      return `<section class="level${lockedLv ? ' dim' : ''}" id="sec-${lv.id}"><div class="lvhead"><span class="lvic">${lv.icon}</span><div><h3>${esc(t('levelN', { n: i + 1 }))} · ${esc(tr(lv.title))}</h3><p class="muted">${esc(tr(lv.desc))} · ${esc(t('lessonsDone', { a: doneIn(lv.lessons), b: lv.lessons.length }))}</p></div></div>
        <div class="tiles">${lv.lessons.map((l) => lessonTile(l)).join('')}</div></section>`;
    }).join('');
    const p = activePath();
    const pathSec = p ? `<section class="level path" id="sec-path"><div class="lvhead"><span class="lvic">${p.icon}</span><div><h3>${esc(t('yourPath'))} · ${esc(tr(p.title))}</h3><p class="muted">${esc(t('lessonsDone', { a: doneIn(p.lessons), b: p.lessons.length }))}</p></div><button class="btn ghost small push" data-act="nav" data-arg="path">${esc(t('changePath'))}</button></div>
        ${p.notice ? `<p class="notice">⚠️ ${esc(tr(p.notice))}</p>` : ''}<div class="tiles">${p.lessons.map((l) => lessonTile(l)).join('')}</div></section>` : '';
    const nu = nextUp();
    const upnext = nu ? `<div class="upnext"><span class="un-ic">${nu.icon}</span><div class="un-txt"><small>${esc(t('upNext'))}</small><b>${esc(tr(nu.title))}</b></div><button class="btn primary small" data-act="lesson" data-arg="${nu.id}">${esc(t('start'))} ▶</button></div>`
      : `<div class="upnext done"><span class="un-ic">🎉</span><div class="un-txt"><b>${esc(t('allDone'))}</b></div></div>`;
    if (S.quoteIdx == null) S.quoteIdx = (Math.floor(Date.now() / 864e5) % (QUOTES.length / 2)) * 2; // a different pair each day, always starting with Pinky
    const q = quoteAt(S.quoteIdx), face = q.who === 'bear' ? 'bear-face' : 'bunny-face';
    const out = `<div class="greet">${stage3d(face, mascot(q.who, 'small wave'), 'face', 'cheer')}<div><h1>${esc(t('hello', { name: displayName() }))}</h1><p class="quote" id="quote">&ldquo;<span id="qtext">${esc(q.text)}</span>&rdquo; <small id="qwho">${q.who === 'bear' ? 'Bruno 🐻' : 'Pinky 🐰'}</small></p></div></div>
      ${viewTrack()}${upnext}
      ${notice}${guestBanner}${proBanner}${levels}${pathSec}`;
    S.notice = '';
    return shell(out);
  }

  function viewPath() {
    const pro = isPro();
    const cards = PATHS.map((p) => `<div class="card pathcard ${S.progress.path === p.id ? 'on' : ''}"><div class="lvic big">${p.icon}</div><h3>${esc(tr(p.title))}</h3><p>${esc(tr(p.desc))}</p>${p.notice ? `<p class="notice">⚠️ ${esc(tr(p.notice))}</p>` : ''}
      <p class="muted">${esc(t('lessonsDone', { a: doneIn(p.lessons), b: p.lessons.length }))}</p>
      <button class="btn primary" ${pro ? `data-act="pick-path" data-arg="${p.id}"` : 'disabled'}>${esc(t('startPath'))}</button></div>`).join('');
    const soon = SOON_PATHS.map((p) => `<div class="card pathcard soon"><div class="lvic big">${p.icon}</div><h3>${esc(tr(p.title))}</h3><span class="chip">${esc(t('comingSoon'))}</span></div>`).join('');
    return shell(`<h1>${esc(t('pathTitle'))}</h1><p class="lead">${esc(pro ? t('pathSub') : t('pathLocked'))}</p><div class="grid">${cards}</div>${soon ? `<h3>${esc(t('morePaths'))}</h3><div class="grid">${soon}</div>` : ''}`);
  }

  function viewMilestones() {
    const done = doneIn(core), pct = Math.round((done / core.length) * 100);
    const steps = [...LEVELS.map((lv, i) => ({ icon: lv.icon, label: tr(lv.title), on: levelDone(lv) })), { icon: '🏆', label: t('proRank'), on: isPro() }, { icon: activePath() ? activePath().icon : '🧭', label: activePath() ? tr(activePath().title) : t('yourPath'), on: PATHS.some((p) => p.lessons.every((l) => isDone(l.id))) }];
    const badges = BADGES.map((b) => { const got = S.progress.badges[b.id]; return `<div class="badge ${got ? 'got' : ''}"><div class="bic">${got ? b.icon : '❔'}</div><b>${esc(tr(b.title))}</b><small>${esc(tr(b.desc))}</small></div>`; }).join('');
    return shell(`<h1>${esc(t('milestones'))}</h1>
      <div class="card"><div class="row"><b>${esc(t('overall'))}</b><span>${pct}%</span></div>${bar(pct)}</div>
      <h3>${esc(t('roadmap'))}</h3><div class="roadmap">${steps.map((s) => `<div class="step ${s.on ? 'on' : ''}"><span class="sic">${s.on ? '✅' : s.icon}</span><span>${esc(s.label)}</span></div>`).join('')}</div>
      <h3>${esc(t('badges'))} (${Object.keys(S.progress.badges).length}/${BADGES.length})</h3><div class="badges">${badges}</div>`);
  }

  function viewProfile() {
    const rank = t('rank' + levelsDone());
    return shell(`<h1>${esc(t('profile'))}</h1>
      <div class="card"><div class="avatar">${signedIn() ? '😀' : '👤'}</div><h2>${esc(displayName())}</h2>
        <p class="muted">${esc(S.cloud ? S.cloud.email : S.user ? t('loggedAs', { name: displayName() }) : t('guestMode'))} · ${esc(t('rank'))}: <b>${esc(rank)}</b></p>
        ${S.cloud ? `<p class="${S.cloud.verified ? 'okmsg' : 'warnmsg'}">${S.cloud.verified ? '✅ ' + esc(t('emailVerified')) : '✉️ ' + esc(t('emailNotVerified'))}</p>
        <div class="stack row-btn">${S.cloud.verified ? '' : `<button class="btn" data-act="resend-verify">${esc(t('resendVerify'))}</button>`}<button class="btn" data-act="logout">${esc(t('logout'))}</button><button class="btn ghost danger" data-act="delete-account">${esc(t('deleteAccount'))}</button></div>`
        : S.user ? `<button class="btn" data-act="logout">${esc(t('logout'))}</button>` : `<div class="stack row-btn"><button class="btn primary" data-act="auth" data-arg="signup">${esc(t('createAccount'))}</button><button class="btn" data-act="auth" data-arg="login">${esc(t('login'))}</button></div>`}</div>
      <div class="card"><h3>${esc(t('language'))}</h3>${langPicker(LANG.current, 'set-lang')}</div>
      <div class="card"><h3>${esc(t('theme'))}</h3><div class="langs">${[['system', '🖥️', 'themeSystem'], ['light', '☀️', 'themeLight'], ['dark', '🌙', 'themeDark']].map(([v, ic, k]) => `<button class="lang${themeChoice() === v ? ' on' : ''}" data-act="set-theme" data-arg="${v}">${ic} ${esc(t(k))}</button>`).join('')}</div></div>
      ${installCard()}
      <div class="card"><h3>${esc(t('stats'))}</h3><div class="stats"><div><b>${S.progress.xp}</b><small>${esc(t('totalXp'))}</small></div><div><b>${S.progress.streak}</b><small>${esc(t('dayStreak'))}</small></div><div><b>${doneCount(S.progress)}</b><small>${esc(t('lessonsComplete'))}</small></div></div></div>
      <button class="btn ghost danger" data-act="reset">${esc(t('resetProgress'))}</button>
      ${legalFooter()}`);
  }

  /* shown once the question is finished (answered, or all attempts used): the right answer in plain words */
  function answerBox(q, fb) {
    let body = '';
    if (q.type === 'mc') body = `<span>${esc((q.def.opts[LANG.current] || q.def.opts.en)[q.def.a])}</span>`;
    else if (q.type === 'tf') body = `<span>${esc(q.def.a ? t('tfTrue') : t('tfFalse'))}</span>`;
    else if (q.type === 'match') body = `<ul class="ansl">${q.pairs.map((p) => `<li><b>${esc(p[0])}</b> → ${esc(p[1])}</li>`).join('')}</ul>`;
    else body = `<ol class="ansl">${q.steps.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>`;
    return `<div class="ansbox ${fb.ok ? 'ok' : 'bad'}"><b class="ansverdict">${fb.ok ? '✅ ' + esc(t('correct')) : '❌ ' + esc(t('wrongFinal'))}</b><div><b>${esc(t('answerIs'))}:</b> ${body}</div></div>`;
  }

  function questionBody(q, r) {
    const html = questionBodyRaw(q, r);
    return r.fb && !r.fb.retry ? html + answerBox(q, r.fb) : html;
  }

  function questionBodyRaw(q, r) {
    const fb = r.fb, final = fb && !fb.retry; // 'retry' = first miss, answer still hidden
    if (q.type === 'mc') {
      return `<h2>${esc(q.text)}</h2><div class="opts">${q.items.map((it) => {
        let cls = 'opt';
        if (final && it.i === q.def.a) cls += ' right'; else if (r.wrongSet.includes(it.i) || (final && it.i === r.chosen)) cls += ' wrong';
        return `<button class="${cls}" ${fb || r.wrongSet.includes(it.i) ? 'disabled' : ''} data-act="mc" data-arg="${it.i}">${esc(it.text)}</button>`;
      }).join('')}</div>`;
    }
    if (q.type === 'tf') {
      const btn = (val, label) => { let cls = 'opt tf'; if (final && val === q.def.a) cls += ' right'; else if (r.wrongSet.includes(val) || (final && val === r.chosen)) cls += ' wrong'; return `<button class="${cls}" ${fb || r.wrongSet.includes(val) ? 'disabled' : ''} data-act="tf" data-arg="${val}">${esc(label)}</button>`; };
      return `<h2>${esc(q.text)}</h2><div class="opts two">${btn(true, '✔ ' + t('tfTrue'))}${btn(false, '✘ ' + t('tfFalse'))}</div>`;
    }
    if (q.type === 'match') {
      const cell = (i, side) => {
        const done = q.matched.includes(i);
        let cls = 'cell' + (done ? ' done' : '');
        if (side === 'L' && q.sel === i) cls += ' sel';
        if (q.flash && q.flash.side === side && q.flash.i === i) cls += ' shake';
        const off = done || fb;
        const hook = side === 'L' ? (off ? '' : ' data-drag') : (off ? '' : ' data-drop');
        return `<li><button class="${cls}" ${off ? 'disabled' : ''} data-act="m${side}" data-arg="${i}"${hook}>${done ? '<span class="bul" aria-hidden="true">✔</span>' : ''}<span>${esc(q.pairs[i][side === 'L' ? 0 : 1])}</span></button></li>`;
      };
      return `<h2>${esc(q.text)}</h2><p class="muted">${esc(t('matchHint'))}</p><div class="match"><ul class="mcol">${q.left.map((i) => cell(i, 'L')).join('')}</ul><ul class="mcol">${q.right.map((i) => cell(i, 'R')).join('')}</ul></div>`;
    }
    /* order */
    const placed = q.picked.map((i, n) => `<button class="chipstep placed" ${fb ? 'disabled' : ''} data-act="oRem" data-arg="${i}"><b>${n + 1}</b>${esc(q.steps[i])}</button>`).join('');
    const pool = q.pool.filter((i) => !q.picked.includes(i)).map((i) => `<button class="chipstep" ${fb ? 'disabled' : ''} data-act="oAdd" data-arg="${i}">${esc(q.steps[i])}</button>`).join('');
    const reveal = '';
    return `<h2>${esc(q.text)}</h2><p class="muted">${esc(t('orderHint'))}</p><div class="slots">${placed || '<span class="muted">…</span>'}</div><div class="pool">${pool}</div>
      ${!fb && q.picked.length === q.steps.length ? `<button class="btn primary wide" data-act="oCheck">${esc(t('check'))}</button>` : ''}${reveal}`;
  }

  function viewLesson() {
    const r = S.run, q = r.qs[r.i], total = r.qs.length;
    const pct = Math.round(((r.i + (r.fb && !r.fb.retry ? 1 : 0)) / total) * 100);
    let fbHtml = '';
    const enter = r.enter; r.enter = false;
    if (r.fb && r.fb.retry) {
      fbHtml = `<div class="feedback bad retry"><div class="fbin">${stage3d('bear-face', mascot('bear', 'tiny'), 'face tiny', 'oops')}<div><b>💡 ${esc(t('incorrect'))}</b><p>${esc(t('retryMsg'))}</p></div>
        <button class="btn dark" data-act="retry">${esc(t('tryAgain'))} →</button></div></div>`;
    } else if (r.fb) {
      let msg = (r.fb.half ? t('secondTry') + ' ' : '') + r.fb.why;
      if (q.type === 'match') msg = (q.wrong === 0 ? t('matchDone') : q.wrong === 1 ? t('secondTry') : t('matchMistakes', { n: q.wrong })) + (r.fb.why ? ' ' + r.fb.why : '');
      fbHtml = `<div class="feedback ${r.fb.ok ? 'ok' : 'bad'}"><div class="fbin">${stage3d(r.fb.ok ? 'bunny-face' : 'bear-face', mascot(r.fb.ok ? 'bunny' : 'bear', r.fb.ok ? 'tiny jump' : 'tiny'), 'face tiny', r.fb.ok ? 'cheer' : 'oops')}<div><b>${r.fb.ok ? '🎉 ' + esc(t('correct')) : '❌ ' + esc(t('wrongFinal'))}</b><p>${esc(msg)}</p></div>
        <button class="btn ${r.fb.ok ? 'primary' : 'dark'}" data-act="next">${esc(r.i + 1 === total ? t('finish') : t('next'))} →</button></div></div>`;
    }
    return `<div class="lesson"><div class="lhead"><button class="icon-btn homebtn" data-act="crumb-home" aria-label="${esc(t('home'))}" title="${esc(t('home'))}">🏠</button><div class="mini"><i class="mfill" style="width:${pct}%"></i><span class="mcar" style="left:${pct}%">${carSvg()}</span></div><span class="count">${r.i + 1}/${total}</span><button class="icon-btn" data-act="toggle-sfx" aria-pressed="${FX.sfxOn()}" title="${esc(FX.sfxOn() ? t('sfxOn') : t('sfxOff'))}">${FX.sfxOn() ? '🔔' : '🔕'}</button></div>
      <div class="qwrap">${crumbsHtml(r.lesson)}<div class="qcard${enter ? ' enter' : ''}">${questionBody(q, r)}</div></div>${fbHtml}</div>`;
  }

  function viewResult() {
    const x = S.result;
    const fresh = x.fresh.length ? `<div class="card"><h3>${esc(t('newBadges'))}</h3><div class="badges small">${x.fresh.map((b) => `<div class="badge got"><div class="bic">${b.icon}</div><b>${esc(tr(b.title))}</b></div>`).join('')}</div></div>` : '';
    const pro = x.justPro ? `<div class="banner pro"><span>🏆 <b>${esc(t('proTitle'))}</b> ${esc(t('proText'))}</span></div>` : '';
    return `${x.pass ? confetti() : ''}<div class="center result">${stage3d(x.pass ? 'bunny' : 'bear', mascot(x.pass ? 'bunny' : 'bear', x.pass ? 'big jump' : 'big'), 'solo', x.pass ? 'cheer' : '')}
      <p class="cheer">${esc(x.pass ? t('cheerWin') : t('cheerTry'))}</p>
      <h1>${esc(x.pass ? t('lessonDone') : t('lessonFailed'))}</h1>
      <div class="stars big">${x.pass ? stars(x.pct).split('').map((s, i) => `<span style="animation-delay:${0.3 + i * 0.25}s">${s}</span>`).join('') : '☆☆☆'}</div>
      <p class="lead">${esc(t('score'))}: <b>${x.pct}%</b> · ${esc(t('xpEarned', { n: x.xp }))}</p>
      <div class="outcomes" aria-label="${esc(t('reviewTitle'))}">${x.outcomes.map((o) => (o === 'first' ? '✅' : o === 'second' ? '🔁' : '❌')).join(' ')}</div>
      ${summaryFor(x.lesson.id).length ? `<div class="card summary"><h3>📝 ${esc(t('summaryTitle'))}</h3><ul>${summaryFor(x.lesson.id).map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>` : ''}${pro}${fresh}
      <div class="stack">
        ${x.justPro ? `<button class="btn primary wide" data-act="nav" data-arg="path">${esc(t('choosePath'))}</button>` : x.pass && x.next ? `<button class="btn primary wide" data-act="lesson" data-arg="${x.next.id}">${esc(t('nextLesson'))} →</button>` : ''}
        ${!x.pass ? `<button class="btn primary wide" data-act="lesson" data-arg="${x.lesson.id}">${esc(t('tryAgain'))}</button>` : ''}
        ${x.pass && SKITS[x.lesson.id] ? `<button class="btn wide skitbtn" data-act="skit" data-arg="${x.lesson.id}">🎭 ${esc(t('watchSkit'))}</button>` : ''}
        <button class="btn wide" data-act="nav" data-arg="map">🏠 ${esc(t('home'))}</button></div></div>`;
  }

  /* "Hi, Guest!" mascot: the bunny and the bear take turns, flipping over like a card */
  function startGreetFlip() {
    clearInterval(S.greetTimer);
    const host = $('.greet .m3d');
    if (!host || !Stage3D) return;
    let kind = host.getAttribute('data-3d');
    S.greetTimer = setInterval(() => {
      if (!host.isConnected) return clearInterval(S.greetTimer);
      host.classList.add('flipout');
      setTimeout(() => {
        kind = kind === 'bunny-face' ? 'bear-face' : 'bunny-face';
        S.quoteIdx++; const nq = quoteAt(S.quoteIdx), qe = $('#quote');
        if (qe) { $('#qtext').textContent = nq.text; $('#qwho').textContent = nq.who === 'bear' ? 'Bruno 🐻' : 'Pinky 🐰'; qe.classList.remove('fadein'); void qe.offsetWidth; qe.classList.add('fadein'); }
        host.setAttribute('data-3d', kind); Stage3D.swap(kind);
        host.classList.remove('flipout'); host.classList.add('flipin');
        setTimeout(() => host.classList.remove('flipin'), 320);
      }, 260);
    }, 3800);
  }

  function render() {
    clearInterval(S.greetTimer);
    const views = { lang: viewLang, welcome: viewWelcome, auth: viewAuth, map: viewMap, path: viewPath, milestones: viewMilestones, profile: viewProfile, forgot: viewForgot, story: viewStory, lesson: viewLesson, result: viewResult };
    if (S.view !== 'story') stopStory();
    $('#app').innerHTML = views[S.view]();
    if (Stage3D) { const host = $('[data-3d]'); if (host) Stage3D.mount(host); else Stage3D.unmount(); }
    if (S.view === 'story') playStory();
    if (S.view === 'map') startGreetFlip();
    if (S.view === 'map' && S.focusLesson) {
      const el = document.querySelector(`.tile[data-lid="${S.focusLesson}"]`); S.focusLesson = null;
      if (el) setTimeout(() => { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); el.classList.add('pulse'); setTimeout(() => el.classList.remove('pulse'), 2400); }, 450);
    }
    const first = $('#app input'); if (first && S.view === 'auth') first.focus();
  }

  /* ---------- events ---------- */
  const actions = {
    'pick-lang': (a) => { S.pickLang = a; setLang(a); render(); },
    'lang-continue': () => { setLang(S.pickLang); go('welcome'); },
    install: async () => { if (!deferredInstall) return; deferredInstall.prompt(); try { await deferredInstall.userChoice; } catch { /* dismissed */ } deferredInstall = null; render(); },
    'set-theme': (a) => { store.set('bb_theme', a); applyTheme(a); render(); },
    'set-lang': (a) => { setLang(a); save(); render(); },
    guest: () => { store.set('bb_meta', { ...store.get('bb_meta', {}), entered: true, lang: LANG.current }); go('map'); },
    auth: (a) => { S.authMode = a; S.authError = ''; go('auth'); },
    'to-welcome': () => go('welcome'),
    nav: (a) => { if (a === 'map' && S.view === 'result' && S.result) S.focusLesson = S.result.lesson.id; go(a); },
    'crumb-home': () => {
      if (S.view === 'lesson') { if (!confirm(t('leave'))) return; S.focusLesson = S.run.lesson.id; S.run = null; }
      else if (S.view === 'story') { S.focusLesson = S.story.lesson.id; stopStory(); S.story = null; }
      go('map');
    },
    jump: (a) => {
      const to = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 70, behavior: 'smooth' }); };
      if (a === 'pro') window.scrollTo({ top: 0, behavior: 'smooth' });
      else if (a === 'path') { if (activePath()) to('sec-path'); else go('path'); }
      else to(a);
    },
    'pick-path': (a) => { S.progress.path = a; go('map'); },
    lesson: (a) => startLesson(a),
    'story-skip': () => endStory(),
    skit: (a) => { S.story = { lesson: findLesson(a), scenes: SKITS[a], i: 0, done: false, timer: null, mode: 'skit' }; go('story'); },
    'story-exit': () => { stopStory(); const skit = S.story.mode === 'skit'; S.story = null; go(skit ? 'result' : 'map'); },
    'story-pause': () => {
      const st = S.story; if (!st.introDone) return;
      st.paused = !st.paused;
      const b = $('#pausebtn'); if (b) b.textContent = st.paused ? '▶ ' + t('play') : '⏸ ' + t('pause');
      if (st.paused) {
        if (canSpeak()) speechSynthesis.pause();
        st.remain = Math.max(0, st.endAt - performance.now());
        clearTimeout(st.endT); clearTimeout(st.adv);
        if (st.lip) st.lip.hold(true);
        if (Stage3D) Stage3D.hush();
      } else {
        if (canSpeak()) speechSynthesis.resume();
        if (st.lip) st.lip.hold(false);
        if (st.pendingNext) nextScene();
        else if (!st.sceneDone) { setSpeakerFx(st.scenes[st.i].who, true); armEnd(st.remain || 1000, st.endFn); }
        else st.adv = setTimeout(nextScene, 200);
      }
    },
    'story-replay': () => { stopStory(); const st = S.story; st.i = 0; st.introDone = false; st.paused = false; st.pendingNext = false; st.token = (st.token || 0) + 1; render(); },
    'toggle-music': () => {
      store.set('bb_music', !FX.music.on());
      const b = $('#musicbtn'); if (b) { b.classList.toggle('off', !FX.music.on()); b.title = FX.music.on() ? t('musicOn') : t('musicOff'); }
      if (FX.music.on()) FX.music.start(); else FX.music.stop();
    },
    'toggle-voice': () => {
      store.set('bb_voice', !voiceOn());
      const b = $('#voicebtn'); if (b) { b.textContent = voiceOn() ? '🔊' : '🔇'; b.title = voiceOn() ? t('voiceOn') : t('voiceOff'); }
      const st = S.story;
      if (!voiceOn() && st && st.voiced && !st.sceneDone) { // switched off mid-line: let the subtitle finish on a reading timer
        st.token++; const tok = st.token; st.voiced = false;
        if (canSpeak()) speechSynthesis.cancel();
        armEnd(Math.max(1500, tr(st.scenes[st.i].text).length * 40), () => sceneEnd(tok));
      }
    },
    'toggle-sfx': () => { store.set('bb_sfx', !FX.sfxOn()); render(); },
    exit: () => { if (confirm(t('leave'))) { S.run = null; go('map'); } },
    mc: (a) => { const r = S.run; if (r.fb) return; r.chosen = Number(a); const ok = r.chosen === r.qs[r.i].def.a; if (!ok && r.tries === 0) r.wrongSet.push(r.chosen); answer(ok); },
    tf: (a) => { const r = S.run; if (r.fb) return; r.chosen = a === 'true'; const ok = r.chosen === r.qs[r.i].def.a; if (!ok && r.tries === 0) r.wrongSet.push(r.chosen); answer(ok); },
    mL: (a) => { const q = S.run.qs[S.run.i]; q.sel = Number(a); q.flash = null; render(); },
    mR: (a) => { const q = S.run.qs[S.run.i]; if (q.sel !== null) tryMatch(q.sel, Number(a)); },
    oAdd: (a) => { const q = S.run.qs[S.run.i]; q.picked.push(Number(a)); render(); },
    oRem: (a) => { const q = S.run.qs[S.run.i]; q.picked = q.picked.filter((i) => i !== Number(a)); render(); },
    retry: () => { const r = S.run, q = r.qs[r.i]; r.fb = null; r.chosen = null; if (q.type === 'order') q.picked = []; render(); },
    oCheck: () => { const q = S.run.qs[S.run.i]; answer(q.picked.every((v, i) => v === i)); },
    next: () => { const r = S.run; if (r.i + 1 >= r.qs.length) return finishLesson(); r.i++; r.fb = null; r.chosen = null; r.tries = 0; r.wrongSet = []; r.enter = true; render(); window.scrollTo(0, 0); },
    logout: async () => {
      if (S.cloud) {
        clearTimeout(cloudSaveT);
        try { await Cloud.save(S.cloud.uid, { progress: S.progress, lang: LANG.current, updated: Date.now() }); } catch { /* offline: the cached copy syncs next time */ }
        try { await Cloud.signOut(); } catch { /* signing out locally anyway */ }
        S.cloud = null;
      }
      S.user = null; S.progress = store.get('bb_guest', emptyProgress()); go('welcome');
    },
    forgot: () => { S.forgotMsg = ''; S.forgotOk = false; go('forgot'); },
    'resend-verify': async () => { try { await Cloud.resendVerification(); alert(t('verifyResent')); } catch (e) { alert(t(Cloud.errorKey(e))); } },
    'delete-account': async () => {
      if (!S.cloud || !confirm(t('confirmDelete'))) return;
      const uid = S.cloud.uid;
      clearTimeout(cloudSaveT); // a queued save must not bring the data back
      try { await Cloud.remove(uid); } catch (e) { alert(t(Cloud.errorKey(e))); return; }
      try { localStorage.removeItem('bb_cloud_' + uid); } catch { /* ignore */ }
      S.cloud = null; S.progress = emptyProgress(); S.notice = t('accountDeleted'); store.set('bb_guest', S.progress); go('welcome');
    },
    reset: () => { if (confirm(t('confirmReset'))) { S.progress = emptyProgress(); save(); render(); } },
  };
  /* drag a left item onto its partner; a plain tap (no movement) still selects, as before */
  let drag = null, dragMoved = false;
  const dropTarget = (x, y) => { const el = document.elementFromPoint(x, y); return el ? el.closest('.cell[data-drop]') : null; };
  document.addEventListener('pointerdown', (e) => {
    const el = e.target.closest('.cell[data-drag]');
    if (!el || !S.run || S.view !== 'lesson' || S.run.fb || (e.pointerType === 'mouse' && e.button !== 0)) return;
    drag = { el, i: Number(el.dataset.arg), x: e.clientX, y: e.clientY, moved: false, ghost: null, over: null };
  });
  document.addEventListener('pointermove', (e) => {
    if (!drag) return;
    if (!drag.moved) {
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 8) return;
      drag.moved = true; dragMoved = true;
      drag.ghost = document.createElement('div'); drag.ghost.className = 'dragghost'; drag.ghost.textContent = drag.el.textContent.trim();
      document.body.appendChild(drag.ghost); drag.el.classList.add('dragging');
    }
    e.preventDefault();
    if (e.clientY > innerHeight - 80) window.scrollBy(0, 14); else if (e.clientY < 80) window.scrollBy(0, -14); // scroll while dragging near the edge
    drag.ghost.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -120%)`;
    const t = dropTarget(e.clientX, e.clientY);
    if (t !== drag.over) { if (drag.over) drag.over.classList.remove('hot'); if (t) t.classList.add('hot'); drag.over = t; }
  }, { passive: false });
  const endDrag = (e, drop) => {
    if (!drag) return;
    const d = drag; drag = null;
    if (d.ghost) d.ghost.remove();
    d.el.classList.remove('dragging'); if (d.over) d.over.classList.remove('hot');
    if (d.moved) {
      setTimeout(() => { dragMoved = false; }, 0); // swallow the click the browser fires after a drag
      const t = drop ? dropTarget(e.clientX, e.clientY) : null;
      if (t) tryMatch(d.i, Number(t.dataset.arg));
    }
  };
  document.addEventListener('pointerup', (e) => endDrag(e, true));
  document.addEventListener('pointercancel', (e) => endDrag(e, false));

  document.addEventListener('click', (e) => {
    if (dragMoved) return;
    const el = e.target.closest('[data-act]');
    if (el && actions[el.dataset.act]) actions[el.dataset.act](el.dataset.arg);
  });
  document.addEventListener('submit', async (e) => {
    if (e.target.id === 'forgot') {
      e.preventDefault();
      const email = String(new FormData(e.target).get('e')).trim();
      if (!validEmail(email)) { S.forgotMsg = t('errEmail'); S.forgotOk = false; return render(); }
      if (Date.now() - (S.lastReset || 0) < 30000) { S.forgotMsg = t('waitReset'); S.forgotOk = false; return render(); }
      S.lastReset = Date.now();
      try { await Cloud.reset(email); } catch (err) {
        const k = Cloud.errorKey(err);
        if (k === 'errNetwork' || k === 'errTooMany' || k === 'errGeneric') { S.forgotMsg = t(k); S.forgotOk = false; S.lastReset = 0; return render(); }
        /* any other failure (for example "no such account") gets the same reply as success, so emails cannot be probed */
      }
      S.forgotMsg = t('resetSent'); S.forgotOk = true; render();
      return;
    }
    if (e.target.id !== 'auth') return;
    e.preventDefault();
    const f = new FormData(e.target), name = String(f.get('u')).trim(), pw = String(f.get('p'));
    if (Cloud.on) S.authError = await (S.authMode === 'signup' ? cloudSignup(name, pw, String(f.get('n') || '').trim()) : cloudLogin(name, pw));
    else S.authError = await (S.authMode === 'signup' ? signup(name, pw) : login(name, pw));
    if (S.authError) render();
  });

  /* ---------- install as an app (Android, Windows and desktop Chrome/Edge show a button; iPhone/iPad need "Add to Home Screen") ---------- */
  let deferredInstall = null;
  addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredInstall = e; if (S.view === 'profile') render(); });
  addEventListener('appinstalled', () => { deferredInstall = null; if (S.view === 'profile') render(); });
  const isStandalone = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  function installCard() {
    if (isStandalone()) return '';
    const how = deferredInstall ? `<button class="btn primary" data-act="install">${esc(t('installBtn'))}</button>` : `<p class="muted">${esc(isIos() ? t('installIos') : t('installOther'))}</p>`;
    return `<div class="card"><h3>📲 ${esc(t('installTitle'))}</h3><p class="muted">${esc(t('installText'))}</p>${how}</div>`;
  }

  /* ---------- theme: follows the device by default; Profile can force light or dark ---------- */
  const darkQuery = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  const themeChoice = () => { const v = store.get('bb_theme', 'system'); return v === 'light' || v === 'dark' ? v : 'system'; };
  function applyTheme(name) {
    const dark = name === 'dark' || (name !== 'light' && !!(darkQuery && darkQuery.matches));
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', dark ? '#14122b' : '#f8f6ff');
  }
  applyTheme(themeChoice());
  if (darkQuery) { const follow = () => { if (themeChoice() === 'system') applyTheme('system'); }; darkQuery.addEventListener ? darkQuery.addEventListener('change', follow) : darkQuery.addListener(follow); }

  /* ---------- boot ---------- */
  const meta = store.get('bb_meta', {});
  const rec = meta.session && users()[meta.session];
  if (rec) { S.user = meta.session; S.progress = rec.progress; }
  else S.progress = store.get('bb_guest', emptyProgress());
  const startLangCode = (rec && rec.lang) || meta.lang;
  if (startLangCode && I18N[startLangCode]) { setLang(startLangCode); S.pickLang = startLangCode; }
  else { S.pickLang = 'en'; setLang('en'); } // English is the default until the user chooses
  S.view = rec || (meta.entered && meta.lang) ? 'map' : meta.lang ? 'welcome' : 'lang';
  render();
  Cloud.onAdapter(connectCloud); // when a cloud adapter is ready, follow its signed-in user
  Cloud.init();                  // no-op unless firebase-config.js has a config
})();
