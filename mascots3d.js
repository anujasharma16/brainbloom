/* © 2026 Anuja Sharma. All rights reserved. See LICENSE. */
/* 3D Bruno (bear) and Pinky (bunny) with Three.js, in the smooth, round, bright storybook style.
   They blink, look at each other, talk (the mouth opens), gesture, laugh and dance, and Pinky has one ear up
   and one flopped. Soft shadows, and a "film" camera that moves between shots and follows the speaker.
   One shared WebGL canvas is moved into whichever [data-3d] element the current screen has.
   If Three.js or WebGL is unavailable, Stage3D is null and the 2D SVG mascots stay in place. */
const Stage3D = (() => {
  if (typeof THREE === 'undefined') return null;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    if (!renderer.getContext()) return null;
  } catch { return null; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1.5, 0.1, 60);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb8c8ff, 0.62));
  const sun = new THREE.DirectionalLight(0xfff1dc, 0.6);
  sun.position.set(3, 6, 7); sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024); sun.shadow.bias = -0.0006; sun.shadow.radius = 4;
  Object.assign(sun.shadow.camera, { left: -4.5, right: 4.5, top: 5, bottom: -2, near: 0.5, far: 24 });
  scene.add(sun);
  const rim = new THREE.DirectionalLight(0xcfe3ff, 0.4); rim.position.set(-4, 3, -5); scene.add(rim);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(16, 9), new THREE.ShadowMaterial({ opacity: 0.3 }));
  ground.rotation.x = -Math.PI / 2; ground.position.z = 0.4; ground.receiveShadow = true; scene.add(ground);

  /* ---------- realistic but friendly: round shapes with soft fur grain, sheen, glossy eyes, pads and claws ---------- */
  const noise = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 256;
    const g = c.getContext('2d'), img = g.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) { const v = Math.random() * 255; img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255; }
    g.putImageData(img, 0, 0);
    const soft = document.createElement('canvas'); soft.width = soft.height = 256;
    const sg = soft.getContext('2d'); sg.filter = 'blur(0.8px)'; sg.drawImage(c, 0, 0);
    return soft;
  })();
  const texCache = {};
  const furTex = (rx, ry) => {
    const k = rx + 'x' + ry;
    if (!texCache[k]) { const t = new THREE.CanvasTexture(noise); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); texCache[k] = t; }
    return texCache[k];
  };
  const matCache = {};
  const shellMat = (base, tip, f, tex) => {
    const k = [base, tip, f.toFixed(2), tex.uuid].join('|');
    if (!matCache[k]) matCache[k] = new THREE.MeshStandardMaterial({ color: new THREE.Color(base).lerp(new THREE.Color(tip), f), roughness: 1, metalness: 0, alphaMap: tex, alphaTest: 0.45 + f * 0.2 });
    return matCache[k];
  };
  const sphere = new THREE.SphereGeometry(1, 40, 28);
  const shellGeo = new THREE.SphereGeometry(1, 24, 16);
  const lighten = (c, k) => new THREE.Color(c).lerp(new THREE.Color(0xffffff), k).getHex();

  /* fur ellipsoid: a core with fur-grain bump and a soft sheen, plus a couple of faint fuzz layers on the big parts */
  function fur(parent, sc, color, p = [0, 0, 0], o = {}) {
    const n = Math.min(o.shells ?? 0, 1), len = (o.len ?? 0.03) * 0.75, tip = o.tip ?? lighten(color, 0.2);
    const g = new THREE.Group(); g.position.set(p[0], p[1], p[2]); parent.add(g);
    const avg = (sc[0] + sc[1] + sc[2]) / 3, tex = furTex(Math.max(3, Math.round(avg * 26)), Math.max(2, Math.round(avg * 17)));
    const core = new THREE.Mesh(sphere, new THREE.MeshPhysicalMaterial({ color, roughness: 0.9, metalness: 0, sheen: new THREE.Color(lighten(color, 0.5)), bumpMap: tex, bumpScale: o.bump ?? 0.22 }));
    core.scale.set(sc[0], sc[1], sc[2]); core.castShadow = true; g.add(core);
    for (let i = 1; i <= n; i++) {
      const f = i / n, m = new THREE.Mesh(shellGeo, shellMat(color, tip, f, tex));
      m.scale.set(sc[0] + len * f, sc[1] + len * f, sc[2] + len * f); g.add(m);
    }
    return g;
  }
  const mat = (c, r = 0.6, extra = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: 0, ...extra });
  function ell(parent, sc, color, p = [0, 0, 0], extra, r) {
    const m = new THREE.Mesh(sphere, mat(color, r ?? 0.7, extra)); m.scale.set(sc[0], sc[1], sc[2]); m.position.set(p[0], p[1], p[2]); m.castShadow = true; parent.add(m); return m;
  }
  const group = (parent, p = [0, 0, 0]) => { const g = new THREE.Group(); g.position.set(p[0], p[1], p[2]); parent.add(g); return g; };

  /* wet, glossy eye: dark ball with clear-coat, brown iris, pupil and two reflections */
  function eye(head, x, y, z, size) {
    const g = group(head, [x, y, z]), sg = Math.sign(x);
    const ball = new THREE.Mesh(sphere, new THREE.MeshPhysicalMaterial({ color: 0x140b07, roughness: 0.15, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05 }));
    ball.scale.set(size[0], size[1], size[2]); g.add(ball);
    ell(g, [size[0] * 0.56, size[1] * 0.56, size[2] * 0.4], 0x3b2210, [0, 0, size[2] * 0.62], {}, 0.3);
    ell(g, [size[0] * 0.3, size[1] * 0.3, size[2] * 0.3], 0x050302, [0, 0, size[2] * 0.85], {}, 0.3);
    ell(g, [size[0] * 0.2, size[1] * 0.2, size[2] * 0.16], 0xffffff, [-sg * size[0] * 0.28, size[1] * 0.38, size[2] * 0.95], { emissive: 0xffffff, emissiveIntensity: 0.7 }, 0.2);
    ell(g, [size[0] * 0.09, size[1] * 0.09, size[2] * 0.1], 0xffffff, [sg * size[0] * 0.26, -size[1] * 0.3, size[2] * 0.95], { emissive: 0xffffff, emissiveIntensity: 0.6 }, 0.2);
    return g;
  }
  /* a smooth tube with rounded ends (no bulges) hanging down from its origin */
  function tube(parent, r, len, color) {
    const tex = furTex(Math.max(3, Math.round(r * 40)), Math.max(2, Math.round(len * 10)));
    const m = new THREE.MeshPhysicalMaterial({ color, roughness: 0.9, metalness: 0, sheen: new THREE.Color(lighten(color, 0.5)), bumpMap: tex, bumpScale: 0.18 });
    const g = new THREE.Group(); parent.add(g);
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.94, r, len, 24, 1), m); cyl.position.y = -len / 2; cyl.castShadow = true; g.add(cyl);
    const top = new THREE.Mesh(sphere, m); top.scale.setScalar(r * 0.94); top.castShadow = true; g.add(top);
    const end = new THREE.Mesh(sphere, m); end.scale.setScalar(r); end.position.y = -len; end.castShadow = true; g.add(end);
    return g;
  }
  /* two-joint arm: shoulder > upper arm, elbow > forearm, then a small round paw */
  function arm(root, side, shoulder, rUp, rFore, color, pawColor, len) {
    const sh = group(root, shoulder), el = group(sh, [0, -len[0], 0]);
    tube(sh, rUp, len[0], color);
    tube(el, rFore, len[1], color);
    const paw = group(el, [0, -len[1], 0.03]);
    const ball = new THREE.Mesh(sphere, new THREE.MeshPhysicalMaterial({ color: pawColor, roughness: 0.9, metalness: 0, sheen: new THREE.Color(lighten(pawColor, 0.5)) }));
    ball.scale.setScalar(rFore * 1.12); ball.castShadow = true; paw.add(ball);
    return { g: sh, fore: el, side, paw };
  }
  function rig(name, root, parts) {
    return { name, root, phase: Math.random() * 6, talk: 0, nextBlink: 1 + Math.random() * 2, blinkT: -9, prevY: 0, earV: 0, mouthMode: false, ...parts };
  }

  /* ---------- Bruno the bear: a soft honey-brown teddy with a round head, big shiny eyes, rosy cheeks and a smile ---------- */
  function buildBear() {
    const root = new THREE.Group(), brown = 0xb27345, warm = 0xc88a55, tan = 0xf3d9b1, pad = 0x7a4a3a, blush = 0xff9aa6;
    const body = fur(root, [0.9, 0.92, 0.8], brown, [0, 0.95, 0], { shells: 2, len: 0.03, tip: 0xd29a66 });
    fur(root, [0.6, 0.66, 0.26], tan, [0, 0.9, 0.64], { shells: 2, len: 0.025 });
    [-1, 1].forEach((s) => {
      fur(root, [0.36, 0.46, 0.38], brown, [s * 0.46, 0.5, 0.1]);
      const foot = fur(root, [0.36, 0.2, 0.48], brown, [s * 0.48, 0.2, 0.36]);
      ell(foot, [0.22, 0.03, 0.28], pad, [0, -0.17, 0.08], {}, 0.8);
      [-1, 0, 1].forEach((k) => ell(foot, [0.06, 0.04, 0.06], pad, [k * 0.12, -0.04, 0.5], {}, 0.8)); // round toe beans, no claws
    });
    const arms = [-1, 1].map((s) => {
      const a = arm(root, s, [s * 0.8, 1.52, 0.05], 0.28, 0.25, brown, tan, [0.7, 0.62]);
      ell(a.paw, [0.13, 0.03, 0.1], pad, [0, -0.01, 0.2], {}, 0.8);
      return a;
    });
    const head = group(root, [0, 2.1, 0.05]);
    head.scale.setScalar(1.1); // a big head makes a baby-faced, cuddly bear
    fur(head, [0.96, 0.88, 0.88], warm, [0, 0, 0], { shells: 2, len: 0.03, tip: 0xdca36a });
    [-1, 1].forEach((s) => { fur(head, [0.3, 0.3, 0.16], brown, [s * 0.7, 0.72, -0.04]); ell(head, [0.18, 0.18, 0.07], 0xf4b0aa, [s * 0.7, 0.72, 0.07], {}, 0.9); });
    fur(head, [0.34, 0.27, 0.34], tan, [0, -0.25, 0.7], { shells: 2, len: 0.025, tip: 0xfbe9cc });
    ell(head, [0.12, 0.085, 0.085], 0x2a1612, [0, -0.1, 0.98], {}, 0.15);
    ell(head, [0.04, 0.025, 0.025], 0xffffff, [-0.04, -0.05, 1.04], { emissive: 0xffffff, emissiveIntensity: 0.6 }, 0.2);
    const smile = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.011, 8, 28, Math.PI), mat(0x5a2a22, 0.6));
    smile.rotation.z = Math.PI; smile.scale.y = 0.7; smile.position.set(0, -0.2, 1.03); head.add(smile);
    ell(head, [0.18, 0.03, 0.2], 0x5a1f2a, [0, -0.43, 0.8], {}, 0.9);
    const jaw = group(head, [0, -0.34, 0.58]);
    fur(jaw, [0.2, 0.08, 0.22], tan, [0, -0.03, 0.2]);
    ell(jaw, [0.12, 0.03, 0.14], 0xf08a96, [0, 0.01, 0.18], {}, 0.5);
    [-1, 1].forEach((s) => { const c = ell(head, [0.11, 0.065, 0.03], blush, [s * 0.6, -0.1, 0.68], { transparent: true, opacity: 0.55 }, 0.9); c.rotation.y = s * 0.7; c.castShadow = false; });
    const eyes = [-1, 1].map((s) => eye(head, s * 0.4, 0.1, 0.78, [0.125, 0.15, 0.1]));
    const brows = [-1, 1].map((s) => { const g = group(head, [s * 0.4, 0.34, 0.8]); g.userData.side = s; fur(g, [0.1, 0.022, 0.045], 0xa86a3a); return g; });
    return rig('bear', root, { body, head, jaw, eyes, brows, arms, ears: [], bodyY: 1, jawMax: 0.42 });
  }

  /* ---------- Pinky the bunny: pink fur with a white belly, muzzle, cheeks, tail and paws; pink lop ears ---------- */
  function buildBunny() {
    const root = new THREE.Group(), pink = 0xf59bc2, pinkTip = 0xffc4dd, white = 0xf8f4f8, soft = 0xffffff, pinkEar = 0xf48ab5, inner = 0xffd8e8, padPink = 0xf29bb5;
    const body = fur(root, [0.6, 0.72, 0.58], pink, [0, 0.82, 0], { shells: 2, len: 0.03, tip: pinkTip });
    fur(root, [0.38, 0.4, 0.26], soft, [0, 1.0, 0.36], { shells: 2, len: 0.03 });
    fur(root, [0.24, 0.24, 0.24], soft, [0, 0.55, -0.58], { shells: 3, len: 0.07, tip: 0xffffff });
    [-1, 1].forEach((s) => {
      fur(root, [0.38, 0.4, 0.46], pink, [s * 0.44, 0.48, -0.06], { shells: 1, len: 0.03, tip: pinkTip });
      const foot = fur(root, [0.2, 0.11, 0.54], soft, [s * 0.36, 0.12, 0.42]);
      ell(foot, [0.1, 0.025, 0.24], padPink, [0, -0.1, 0.06], {}, 0.8);
    });
    const arms = [-1, 1].map((s) => {
      const a = arm(root, s, [s * 0.4, 1.25, 0.28], 0.15, 0.13, pink, soft, [0.44, 0.38]);
      ell(a.paw, [0.07, 0.02, 0.07], padPink, [0, -0.01, 0.11], {}, 0.8);
      return a;
    });
    const head = group(root, [0, 1.85, 0.1]);
    fur(head, [0.74, 0.68, 0.78], pink, [0, 0, 0], { shells: 2, len: 0.03, tip: pinkTip });
    [-1, 1].forEach((s) => fur(head, [0.3, 0.25, 0.32], soft, [s * 0.4, -0.2, 0.36], { shells: 1, len: 0.03 }));
    fur(head, [0.24, 0.19, 0.32], soft, [0, -0.2, 0.66]);
    ell(head, [0.08, 0.058, 0.056], 0xf08aa8, [0, -0.06, 0.94], {}, 0.25);
    ell(head, [0.01, 0.06, 0.02], 0x9a4a6a, [0, -0.15, 0.95], {}, 0.8);
    ell(head, [0.19, 0.05, 0.2], 0x6a1a38, [0, -0.29, 0.7], {}, 0.9);
    const teeth = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.14, 0.03), mat(0xfffdf6, 0.4)); teeth.position.set(0, -0.3, 0.89); head.add(teeth);
    const jaw = group(head, [0, -0.28, 0.5]);
    fur(jaw, [0.17, 0.07, 0.2], soft, [0, -0.02, 0.19]);
    ell(jaw, [0.1, 0.03, 0.11], 0xe0707f, [0, 0.01, 0.17], {}, 0.5);
    const eyes = [-1, 1].map((s) => eye(head, s * 0.4, 0.14, 0.58, [0.115, 0.145, 0.09]));
    const wGeo = new THREE.CylinderGeometry(0.005, 0.0025, 0.75, 5), wMat = mat(0xffffff, 0.4);
    [-1, 1].forEach((s) => [-0.25, 0, 0.25].forEach((a) => {
      const w = new THREE.Mesh(wGeo, wMat); w.position.set(s * 0.32, -0.16 + a * 0.05, 0.8);
      w.rotation.z = Math.PI / 2 - s * a * 0.3; w.rotation.y = s * (0.35 - a * 0.2); head.add(w);
    }));
    /* pink lop ears: both flop down; two joints so they bend and sway */
    const ears = [-1, 1].map((s) => {
      const lop = true; // both ears flop down
      const base = group(head, [s * (lop ? 0.34 : 0.3), 0.5, -0.04]);
      const baseLen = lop ? 0.24 : 0.4, tipLen = lop ? 0.46 : 0.34;
      fur(base, [lop ? 0.18 : 0.17, baseLen, 0.065], pinkEar, [0, baseLen * 0.9, 0], { shells: 1, len: 0.025, tip: 0xffe6ee });
      ell(base, [0.1, baseLen * 0.8, 0.035], inner, [0, baseLen * 0.9, 0.05], {}, 0.8);
      const tipJ = group(base, [0, baseLen * 1.8, 0]);
      fur(tipJ, [lop ? 0.19 : 0.16, tipLen, 0.06], pinkEar, [0, tipLen * 0.88, 0], { shells: 1, len: 0.025, tip: 0xffe6ee });
      ell(tipJ, [lop ? 0.11 : 0.09, tipLen * 0.78, 0.032], inner, [0, tipLen * 0.88, 0.045], {}, 0.8);
      const e = lop ? { base, tip: tipJ, side: s, restB: -s * 0.95, restT: -s * 1.9, upright: false } : { base, tip: tipJ, side: s, restB: -s * 0.14, restT: -s * 0.2, upright: true };
      base.rotation.z = e.restB; tipJ.rotation.z = e.restT;
      return e;
    });
    return rig('bunny', root, { body, head, jaw, eyes, brows: [], arms, ears, teeth, bodyY: 1, jawMax: 0.36 });
  }

  const chars = { bear: buildBear(), bunny: buildBunny() };
  scene.add(chars.bear.root, chars.bunny.root);

  /* ---------- lesson props: a small held item per character that matches the lesson, plus a few worn accessories ----------
     Each builder draws into a group whose origin is the grip point, standing upright (+y) and facing +z. */
  const bx = (g, w, h, d, c, p = [0, 0, 0], r = 0.6, ex = {}) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(c, r, ex)); m.position.set(p[0], p[1], p[2]); m.castShadow = true; g.add(m); return m; };
  const cy = (g, rt, rb, h, c, p = [0, 0, 0], rot = [0, 0, 0], r = 0.6, ex = {}) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, 24), mat(c, r, ex)); m.position.set(p[0], p[1], p[2]); m.rotation.set(rot[0], rot[1], rot[2]); m.castShadow = true; g.add(m); return m; };
  const rg = (g, rad, tube, c, p = [0, 0, 0], arc = Math.PI * 2, rot = [0, 0, 0]) => { const m = new THREE.Mesh(new THREE.TorusGeometry(rad, tube, 10, 32, arc), mat(c, 0.4)); m.position.set(p[0], p[1], p[2]); m.rotation.set(rot[0], rot[1], rot[2]); m.castShadow = true; g.add(m); return m; };
  const glow = (c) => ({ emissive: c, emissiveIntensity: 0.7 });
  const FLAT = [Math.PI / 2, 0, 0]; // lays a cylinder's round face toward the viewer

  const PROPS = {
    robot(g) {
      bx(g, 0.22, 0.2, 0.16, 0x8ea2ff, [0, 0.12, 0]); bx(g, 0.2, 0.15, 0.15, 0xf4f6ff, [0, 0.31, 0]); bx(g, 0.15, 0.07, 0.02, 0x1d2540, [0, 0.32, 0.08], 0.3);
      [-1, 1].forEach((s) => { ell(g, [0.025, 0.025, 0.02], 0x35e0ff, [s * 0.04, 0.32, 0.095], glow(0x35e0ff), 0.3); bx(g, 0.05, 0.12, 0.05, 0xc9cfff, [s * 0.14, 0.13, 0]); });
      cy(g, 0.01, 0.01, 0.1, 0x9aa0c8, [0, 0.43, 0]); ell(g, [0.03, 0.03, 0.03], 0xff4d6d, [0, 0.49, 0], glow(0xff4d6d), 0.3);
      bx(g, 0.1, 0.03, 0.02, 0x7bdff2, [0, 0.12, 0.085], 0.5, glow(0x7bdff2));
    },
    magnifier(g) {
      cy(g, 0.022, 0.028, 0.22, 0x8b5a2b, [0, 0.11, 0]); rg(g, 0.13, 0.026, 0xffc83d, [0, 0.36, 0]);
      const glass = new THREE.Mesh(new THREE.CircleGeometry(0.126, 28), new THREE.MeshStandardMaterial({ color: 0xbfe6ff, transparent: true, opacity: 0.4, roughness: 0.1 })); glass.position.set(0, 0.36, 0); g.add(glass);
    },
    cards(g) {
      [[-0.25, 0xff8fb1], [0, 0xffd166], [0.25, 0x7bdff2]].forEach(([a, col]) => {
        const f = new THREE.Group(); f.rotation.z = a; g.add(f);
        bx(f, 0.2, 0.28, 0.012, col, [0, 0.18, a * 0.02], 0.5); ell(f, [0.04, 0.04, 0.01], 0xffffff, [0, 0.2, a * 0.02 + 0.01], {}, 0.5);
      });
    },
    bubble(g) {
      cy(g, 0.014, 0.014, 0.22, 0xdeb887, [0, 0.11, 0]); bx(g, 0.36, 0.22, 0.03, 0xffffff, [0, 0.33, 0], 0.4);
      const tail = bx(g, 0.07, 0.07, 0.03, 0xffffff, [-0.1, 0.2, 0], 0.4); tail.rotation.z = Math.PI / 4;
      [-0.09, 0, 0.09].forEach((x) => ell(g, [0.03, 0.03, 0.02], 0x5a4fcf, [x, 0.33, 0.02], {}, 0.5));
    },
    pencil(g) {
      cy(g, 0.03, 0.03, 0.34, 0xffd23f, [0, 0.19, 0]); cy(g, 0.001, 0.03, 0.09, 0xf1c79a, [0, 0.42, 0]); cy(g, 0.001, 0.012, 0.03, 0x333333, [0, 0.455, 0]);
      cy(g, 0.032, 0.032, 0.04, 0xff8fa3, [0, -0.01, 0]); cy(g, 0.033, 0.033, 0.02, 0xbfc5cc, [0, 0.03, 0]);
    },
    phone(g) {
      bx(g, 0.17, 0.3, 0.03, 0x2b2d42, [0, 0.18, 0], 0.4); bx(g, 0.14, 0.25, 0.006, 0x7bdff2, [0, 0.185, 0.018], 0.3, glow(0x4fb8e0));
      ell(g, [0.025, 0.025, 0.01], 0xff4d6d, [0.04, 0.27, 0.024], glow(0xff4d6d), 0.4); bx(g, 0.09, 0.02, 0.004, 0xffffff, [-0.01, 0.2, 0.022], 0.4);
    },
    basket(g) {
      cy(g, 0.17, 0.12, 0.13, 0xc08a4a, [0, 0.07, 0]); rg(g, 0.15, 0.015, 0xa86f33, [0, 0.13, 0], Math.PI);
      ell(g, [0.06, 0.06, 0.06], 0xe63946, [-0.06, 0.15, 0.02], {}, 0.5); ell(g, [0.06, 0.06, 0.06], 0xff9f1c, [0.06, 0.16, 0.0], {}, 0.5); ell(g, [0.05, 0.05, 0.05], 0x70c75a, [0, 0.17, 0.07], {}, 0.5);
    },
    shield(g) {
      cy(g, 0.17, 0.17, 0.04, 0x4f7cff, [0, 0.22, 0], FLAT, 0.4); cy(g, 0.12, 0.12, 0.05, 0xdfe8ff, [0, 0.22, 0.004], FLAT, 0.4);
      const k1 = bx(g, 0.05, 0.1, 0.02, 0x2fbf71, [-0.03, 0.2, 0.034], 0.4); k1.rotation.z = 0.7; const k2 = bx(g, 0.05, 0.17, 0.02, 0x2fbf71, [0.03, 0.23, 0.034], 0.4); k2.rotation.z = -0.6;
    },
    padlock(g) {
      bx(g, 0.22, 0.17, 0.08, 0xffc83d, [0, 0.1, 0], 0.35); rg(g, 0.065, 0.022, 0xc9ced6, [0, 0.185, 0], Math.PI);
      ell(g, [0.025, 0.025, 0.01], 0x3a3a3a, [0, 0.11, 0.042], {}, 0.5); bx(g, 0.016, 0.05, 0.01, 0x3a3a3a, [0, 0.08, 0.042], 0.5);
    },
    clipboard(g) {
      bx(g, 0.25, 0.34, 0.025, 0xa66a3a, [0, 0.2, 0]); bx(g, 0.21, 0.28, 0.01, 0xffffff, [0, 0.19, 0.016], 0.5); bx(g, 0.1, 0.04, 0.03, 0xc9ced6, [0, 0.37, 0.01], 0.3);
      [0.27, 0.19, 0.11].forEach((y) => { bx(g, 0.035, 0.03, 0.006, 0x2fbf71, [-0.07, y, 0.024], 0.5); bx(g, 0.09, 0.016, 0.006, 0xb8bdd6, [0.03, y, 0.024], 0.5); });
    },
    lightbulb(g) {
      ell(g, [0.13, 0.14, 0.13], 0xffe066, [0, 0.3, 0], glow(0xffd23f), 0.2); cy(g, 0.07, 0.05, 0.1, 0xaeb4c4, [0, 0.14, 0], [0, 0, 0], 0.4); cy(g, 0.045, 0.04, 0.04, 0x8a90a0, [0, 0.07, 0], [0, 0, 0], 0.4);
      [-1, 0, 1].forEach((k) => { const r = bx(g, 0.015, 0.06, 0.015, 0xffd23f, [k * 0.19, 0.4 - Math.abs(k) * 0.06, 0], 0.4); r.rotation.z = -k * 0.9; });
    },
    gear(g) {
      const gr = new THREE.Group(); gr.position.y = 0.22; g.add(gr); g.userData.spin = gr;
      cy(gr, 0.12, 0.12, 0.05, 0x8d99ae, [0, 0, 0], FLAT, 0.4); cy(gr, 0.05, 0.05, 0.06, 0x3a4150, [0, 0, 0], FLAT, 0.5);
      for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2, t = bx(gr, 0.06, 0.07, 0.05, 0x8d99ae, [Math.cos(a) * 0.14, Math.sin(a) * 0.14, 0], 0.4); t.rotation.z = a; }
    },
    piggy(g) {
      ell(g, [0.2, 0.16, 0.16], 0xff9ec4, [0, 0.2, 0], {}, 0.45); cy(g, 0.06, 0.06, 0.05, 0xff7fb0, [0, 0.19, 0.16], FLAT, 0.45);
      [-1, 1].forEach((s) => { cy(g, 0.001, 0.045, 0.07, 0xff7fb0, [s * 0.09, 0.34, 0.03], [0, 0, -s * 0.3], 0.45); ell(g, [0.018, 0.022, 0.012], 0x2b1a10, [s * 0.07, 0.25, 0.14], {}, 0.3); cy(g, 0.03, 0.03, 0.09, 0xff9ec4, [s * 0.09, 0.05, 0.06], [0, 0, 0], 0.45); cy(g, 0.03, 0.03, 0.09, 0xff9ec4, [s * 0.09, 0.05, -0.06], [0, 0, 0], 0.45); });
      bx(g, 0.1, 0.012, 0.02, 0x7a2a4a, [0, 0.36, 0], 0.5); rg(g, 0.03, 0.01, 0xff7fb0, [0, 0.22, -0.17]);
    },
    coin(g) {
      const c = new THREE.Group(); c.position.y = 0.24; g.add(c); g.userData.spin = c; g.userData.spinY = true;
      cy(c, 0.14, 0.14, 0.035, 0xffc83d, [0, 0, 0], FLAT, 0.25, glow(0xb8860b)); rg(c, 0.1, 0.012, 0xffe28a, [0, 0, 0.02]); bx(c, 0.025, 0.1, 0.012, 0xffe28a, [0, 0, 0.022], 0.3);
    },
    chart(g) {
      cy(g, 0.014, 0.014, 0.2, 0xdeb887, [0, 0.1, 0]); bx(g, 0.38, 0.3, 0.025, 0xffffff, [0, 0.35, 0], 0.4);
      [[-0.12, 0.07, 0xff8fa3], [-0.04, 0.12, 0x70c75a], [0.04, 0.17, 0x70c75a], [0.12, 0.22, 0x2fbf71]].forEach(([x, h, col]) => bx(g, 0.05, h, 0.02, col, [x, 0.22 + h / 2, 0.02], 0.5));
    },
    briefcase(g) {
      bx(g, 0.34, 0.22, 0.1, 0x8b5a2b, [0, 0.11, 0], 0.5); rg(g, 0.06, 0.016, 0x5a3a1b, [0, 0.22, 0], Math.PI);
      [-1, 1].forEach((s) => bx(g, 0.03, 0.04, 0.012, 0xffc83d, [s * 0.07, 0.15, 0.056], 0.3)); bx(g, 0.34, 0.012, 0.102, 0x6b4420, [0, 0.12, 0], 0.5);
    },
    palette(g) {
      const p = cy(g, 0.17, 0.17, 0.025, 0xe6c79c, [0, 0.2, 0], FLAT, 0.6); p.scale.x = 1.25;
      [[-0.1, 0.25, 0xff4d6d], [0.0, 0.29, 0xffd23f], [0.1, 0.25, 0x4fb8e0], [0.13, 0.15, 0x70c75a]].forEach(([x, y, col]) => ell(g, [0.03, 0.03, 0.015], col, [x, y, 0.02], {}, 0.4));
      cy(g, 0.012, 0.012, 0.2, 0xdeb887, [0.22, 0.2, 0.01], [0, 0, -0.5]); cy(g, 0.001, 0.016, 0.06, 0xff4d6d, [0.29, 0.31, 0.01], [0, 0, -0.5]);
    },
    camera(g) {
      bx(g, 0.3, 0.19, 0.12, 0x3a3f55, [0, 0.14, 0], 0.4); cy(g, 0.065, 0.065, 0.08, 0x23263a, [0, 0.14, 0.09], FLAT, 0.3); ell(g, [0.04, 0.04, 0.02], 0x4fb8e0, [0, 0.14, 0.135], glow(0x2f80c0), 0.15);
      bx(g, 0.07, 0.04, 0.03, 0xffffff, [-0.09, 0.25, 0], 0.4, glow(0xffffff)); cy(g, 0.02, 0.02, 0.02, 0xff4d6d, [0.09, 0.25, 0], [0, 0, 0], 0.4);
    },
    laptop(g) { // seen from the front: a lit screen standing on its keyboard
      bx(g, 0.38, 0.03, 0.2, 0x9aa3b8, [0, 0.03, 0.03], 0.4); bx(g, 0.3, 0.01, 0.12, 0x6b7390, [0, 0.05, 0.05], 0.5);
      bx(g, 0.38, 0.27, 0.025, 0x9aa3b8, [0, 0.185, -0.05], 0.4); bx(g, 0.34, 0.23, 0.01, 0x1d2540, [0, 0.185, -0.035], 0.3, glow(0x1d3a78));
      [[0.17, 0.26], [0.12, 0.2], [0.15, 0.14], [0.08, 0.08]].forEach(([w, y], i) => bx(g, w, 0.018, 0.006, [0x7bdff2, 0x70c75a, 0xffd23f, 0xff8fa3][i], [-0.13 + w / 2, y + 0.04, -0.028], 0.4, glow(0x446688)));
    },
    book(g) {
      bx(g, 0.26, 0.32, 0.06, 0x6c5ce7, [0, 0.18, 0], 0.5); bx(g, 0.22, 0.29, 0.05, 0xffffff, [0.012, 0.18, 0.004], 0.6); bx(g, 0.26, 0.32, 0.012, 0x6c5ce7, [0, 0.18, 0.034], 0.5);
      ell(g, [0.045, 0.045, 0.01], 0xffd23f, [0, 0.2, 0.042], glow(0xb8860b), 0.3);
    },
    bug(g) {
      ell(g, [0.14, 0.1, 0.13], 0xe63946, [0, 0.11, 0], {}, 0.3); ell(g, [0.07, 0.06, 0.07], 0x222222, [0, 0.12, 0.13], {}, 0.4);
      [[-0.06, 0.15, 0.04], [0.06, 0.15, 0.04], [-0.07, 0.12, -0.05], [0.07, 0.12, -0.05], [0, 0.18, -0.02]].forEach((p) => ell(g, [0.025, 0.02, 0.025], 0x222222, p, {}, 0.5));
      [-1, 1].forEach((s) => { cy(g, 0.005, 0.005, 0.1, 0x222222, [s * 0.04, 0.2, 0.17], [0.5, 0, -s * 0.4]); ell(g, [0.015, 0.015, 0.015], 0xffffff, [s * 0.025, 0.12, 0.185], {}, 0.3); });
    },
  };
  /* worn accessories: [where, builder] */
  const WEAR = {
    bowtie(c) { const g = group(c.root, [0, 1.12, 0.93]); [-1, 1].forEach((s) => { const w = cy(g, 0.001, 0.09, 0.13, 0xe63946, [s * 0.09, 0, 0], [0, 0, s * Math.PI / 2]); w.scale.z = 0.5; }); ell(g, [0.045, 0.045, 0.04], 0xb81d2c, [0, 0, 0.01], {}, 0.4); return g; },
    beret(c) { const g = group(c.head, [0.08, 0.8, 0.04]); g.rotation.z = -0.22; ell(g, [0.52, 0.17, 0.5], 0x2d3a8c, [0, 0, 0], {}, 0.8); ell(g, [0.05, 0.07, 0.05], 0x2d3a8c, [0, 0.17, 0], {}, 0.8); return g; },
    headphones(c) {
      const g = group(c.head, [0, 0.02, 0.0]); const band = rg(g, 0.8, 0.045, 0x3a3f55, [0, 0, 0], Math.PI); band.scale.y = 0.9;
      [-1, 1].forEach((s) => { cy(g, 0.15, 0.15, 0.1, 0xff6fa5, [s * 0.78, -0.02, 0], [0, 0, Math.PI / 2], 0.4); cy(g, 0.11, 0.11, 0.12, 0x3a3f55, [s * 0.78, -0.02, 0], [0, 0, Math.PI / 2], 0.5); });
      return g;
    },
  };

  /* which prop each character holds in each lesson: [Bruno, Pinky]; lesson-id prefixes add an accessory */
  const LESSON_PROPS = {
    'what-is-ai': ['robot', 'magnifier'], 'how-ai-learns': ['cards', 'book'], 'first-prompt': ['pencil', 'bubble'], 'daily-life': ['phone', 'basket'],
    'better-prompts': ['clipboard', 'pencil'], 'check-the-ai': ['magnifier', 'clipboard'], 'power-techniques': ['gear', 'lightbulb'], 'responsible-ai': ['shield', 'padlock'],
    'prompt-lab-1': ['bubble', 'basket'], 'prompt-lab-2': ['clipboard', 'bubble'],
    't-ideas': ['lightbulb', 'clipboard'], 't-prompts': ['bubble', 'clipboard'], 't-automation': ['gear', 'laptop'], 't-bugs': ['bug', 'magnifier'],
    'tr-basics': ['piggy', 'coin'], 'tr-orders': ['clipboard', 'chart'], 'tr-ai': ['robot', 'chart'], 'tr-prompts': ['bubble', 'chart'], 'tr-build': ['laptop', 'gear'], 'tr-safety': ['shield', 'padlock'],
    'bz-writing': ['briefcase', 'pencil'], 'bz-data': ['chart', 'magnifier'], 'bz-customers': ['phone', 'bubble'], 'bz-process': ['gear', 'clipboard'], 'bz-governance': ['shield', 'padlock'],
    'cr-ideas': ['lightbulb', 'pencil'], 'cr-writing': ['book', 'pencil'], 'cr-visual': ['palette', 'camera'], 'cr-video-audio': ['camera', 'phone'], 'cr-ethics': ['book', 'shield'],
    'dv-assistants': ['laptop', 'robot'], 'dv-prompting': ['laptop', 'bubble'], 'dv-review': ['magnifier', 'clipboard'], 'dv-debug': ['bug', 'magnifier'], 'dv-build': ['laptop', 'padlock'],
  };
  const LESSON_WEAR = { bz: ['bear', 'bowtie'], cr: ['bear', 'beret'], dv: ['bunny', 'headphones'] };

  function setProps(lessonId) {
    if (st.propsFor === lessonId) return;
    st.propsFor = lessonId;
    ['bear', 'bunny'].forEach((n) => {
      const c = chars[n];
      if (c.prop) { c.prop.parent.remove(c.prop); c.prop = null; }
      if (c.wear) { c.wear.parent.remove(c.wear); c.wear = null; }
      c.propS = 0;
    });
    const spec = lessonId && LESSON_PROPS[lessonId];
    if (!spec) return;
    ['bear', 'bunny'].forEach((n, i) => {
      const c = chars[n], build = PROPS[spec[i]];
      if (!build) return;
      c.propArm = c.arms.find((a) => a.side === (n === 'bear' ? -1 : 1));
      const g = new THREE.Group(); build(g); g.scale.setScalar(0.001);
      const holder = new THREE.Group(); holder.position.set(0, -0.04, 0.12); holder.add(g); holder.userData.inner = g;
      c.propArm.paw.add(holder); c.prop = holder; c.propS = 0;
    });
    const w = LESSON_WEAR[String(lessonId).split('-')[0]];
    if (w) { const c = chars[w[0]]; c.wear = WEAR[w[1]](c); }
  }

  /* ---------- layouts ---------- */
  /* cam: [camera height, look-at height, width to keep in frame, height to keep in frame] in world units;
     the camera distance is worked out in resize() so nothing is cropped on narrow screens */
  const LAYOUTS = {
    duo: { chars: ['bear', 'bunny'], x: { bear: -1.3, bunny: 1.3 }, yaw: { bear: 0.55, bunny: -0.55 }, head: { bear: 0.26, bunny: -0.26 }, cam: [2.0, 1.9, 6.0, 8.0], focus: true },
    front: { chars: ['bear', 'bunny'], x: { bear: -1.35, bunny: 1.35 }, yaw: { bear: 0.3, bunny: -0.3 }, head: { bear: 0, bunny: 0 }, cam: [2.0, 1.85, 6.2, 4.5], wave: true },
    bear: { chars: ['bear'], x: { bear: 0 }, yaw: { bear: 0 }, head: { bear: 0 }, cam: [1.8, 1.6, 3.4, 3.7] },
    bunny: { chars: ['bunny'], x: { bunny: 0 }, yaw: { bunny: 0 }, head: { bunny: 0 }, cam: [2.0, 1.9, 2.9, 4.3] },
    'bear-face': { chars: ['bear'], x: { bear: 0 }, yaw: { bear: 0 }, head: { bear: 0 }, cam: [2.1, 2.05, 3.4, 3.2] },
    'bunny-face': { chars: ['bunny'], x: { bunny: 0 }, yaw: { bunny: 0 }, head: { bunny: 0 }, cam: [2.4, 2.35, 2.5, 3.0] },
  };

  /* camera shots for the conversation: z = fraction of the wide-shot distance, ly = height looked at,
     follow = how far the camera slides toward the speaker */
  const SHOTS = {
    wide: { z: 1, ly: null, follow: 0 },
    dance: { z: 0.8, ly: 2.0, follow: 0 },
    medium: { z: 0.66, ly: 2.15, follow: 0.6 },
    close: { z: 0.5, ly: 2.3, follow: 1 },
    duoClose: { z: 0.62, ly: 2.2, follow: 0 },
  };

  const st = { hold: false, enterAt: null, shot: 'wide', layout: LAYOUTS.duo, speaker: null, talking: false, gesture: 0, mood: '', moodT: 0, mounted: null, raf: 0, last: 0, camZ: 8 };
  const cam = { x: 0, zoom: 1, ly: 2.6, y: 2 };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, k) => a + (b - a) * k;

  function configure(kind) {
    const L = LAYOUTS[kind] || LAYOUTS.duo;
    st.layout = L;
    Object.values(chars).forEach((c) => { c.root.visible = L.chars.includes(c.name); });
    L.chars.forEach((n) => { chars[n].root.position.set(L.x[n], 0, 0); chars[n].root.rotation.set(0, L.yaw[n], 0); });
    cam.x = 0; cam.zoom = 1; cam.ly = L.cam[1]; cam.y = L.cam[0];
  }

  /* ---------- per-frame animation ---------- */
  function update(dt, t) {
    const L = st.layout, age = t - st.moodT, duo = L.chars.length === 2;
    L.chars.forEach((n) => {
      const c = chars[n], side = n === 'bear' ? 1 : -1, engaged = st.speaker === n, speaking = engaged && st.talking;
      const listening = duo && st.speaker && !engaged;
      const enterAge = st.hold ? -1 : st.enterAt == null ? 99 : t - st.enterAt;
      const ep = st.hold ? 0 : clamp(enterAge / 1.7, 0, 1), ease = 1 - Math.pow(1 - ep, 3), walking = ep < 1;
      c.talk = lerp(c.talk, speaking ? 1 : 0, clamp(dt * 10, 0, 1));
      c.body.scale.y = c.bodyY * (1 + 0.016 * Math.sin(t * 2.2 + c.phase));
      c.body.rotation.z = 0.015 * Math.sin(t * 0.9 + c.phase);

      /* head: speaker nods and sways; listener turns toward the speaker, tilts and nods now and then */
      const nod = speaking ? 0.07 * Math.sin(t * 7.2) + 0.04 * Math.sin(t * 3.1) : listening ? 0.04 * Math.max(0, Math.sin(t * 1.3 + c.phase)) : 0.025 * Math.sin(t * 1.7 + c.phase);
      c.head.rotation.x = lerp(c.head.rotation.x, nod, 0.35);
      c.head.rotation.y = lerp(c.head.rotation.y, L.head[n] + (speaking ? 0.09 * Math.sin(t * 2.3) : 0), 0.2);
      c.head.rotation.z = lerp(c.head.rotation.z, speaking ? 0.04 * Math.sin(t * 4) : listening ? 0.1 * side : 0, 0.15);

      /* talking: jaw hinges open and shut */
      const party = st.mood === 'cheer' && age < 5.5;
      c.squint = lerp(c.squint || 0, party ? 1 : 0, clamp(dt * 8, 0, 1));
      /* while a line is spoken the mouth follows the lip-sync timeline from app.js; otherwise it falls back to a lively flap */
      const lipNow = speaking && st.lipFn ? st.lipFn(performance.now()) : null;
      const open = party ? 0.45 + 0.45 * Math.abs(Math.sin(t * 13 + c.phase)) : lipNow ? lipNow.open : speaking ? 0.3 + 0.7 * Math.abs(Math.sin(t * 12 + Math.sin(t * 4.3) * 2.5)) : 0;
      const round = lipNow ? lipNow.round : 0;
      if (c.mouthMode) { c.jawOpen = lerp(c.jawOpen || 0, open, 0.55); c.jaw.scale.y = 1 + c.jawOpen * 5.5; c.jaw.scale.x = 1 - 0.25 * c.jawOpen; }
      else { c.jaw.rotation.x = lerp(c.jaw.rotation.x, open * c.jawMax, 0.6); c.jaw.scale.x = lerp(c.jaw.scale.x, 1 - 0.3 * round * Math.min(1, open * 1.6), 0.5); } // narrower for the rounded sounds (o, u)

      /* eyes and eyebrows */
      if (t > c.nextBlink) { c.blinkT = t; c.nextBlink = t + 2.4 + Math.random() * 3.2; }
      const bp = t - c.blinkT, blink = bp < 0.15 ? Math.sin((bp / 0.15) * Math.PI) : 0;
      const gaze = (duo ? side * 0.34 : 0) + 0.08 * Math.sin(t * 0.7 + c.phase) + (speaking ? 0.05 * Math.sin(t * 3) : 0);
      c.eyes.forEach((e) => { e.scale.y = Math.min(1 - 0.92 * blink, 1 - 0.6 * c.squint); e.rotation.y = lerp(e.rotation.y, gaze, 0.2); e.rotation.x = lerp(e.rotation.x, 0.05 * Math.sin(t * 0.5 + c.phase), 0.2); });
      const surprised = st.mood === 'oops' && age < 1.4 && !speaking;
      c.brows.forEach((b) => {
        const s = b.userData.side;
        b.position.y = lerp(b.position.y, (c.name === 'bear' ? 0.36 : 0.43) + (surprised ? 0.12 : 0) + (speaking ? 0.04 * Math.sin(t * 5) : 0) + (party ? 0.06 : 0), 0.3);
        b.rotation.z = lerp(b.rotation.z, -s * (surprised ? 0.3 : speaking ? 0.1 * Math.sin(t * 3) : 0.05), 0.3);
      });

      /* body: speaker leans in; hops on cheer; shakes on oops; listener jumps in surprise */
      c.root.position.z = lerp(c.root.position.z, engaged ? 0.3 : 0, clamp(dt * 4, 0, 1));
      let y = 0, rz = 0;
      if (L.wave && n === 'bunny') y = Math.abs(Math.sin(t * 3)) * 0.18;
      if (party) { y += Math.abs(Math.sin(t * 6 + c.phase)) * 0.2; rz = 0.07 * Math.sin(t * 5 + c.phase); }
      if (st.mood === 'oops' && age < 1.0) {
        if (engaged) rz = 0.1 * Math.sin(age * 36) * (1 - age); else y += Math.sin(clamp(age / 0.5, 0, 1) * Math.PI) * 0.34;
      }
      c.root.position.x = L.x[n] + (n === 'bear' ? -1 : 1) * 3.6 * (1 - ease); // walk in from off-screen
      if (walking && !st.hold) { const f = n === 'bunny' ? 11 : 6; y += Math.abs(Math.sin(enterAge * f)) * (n === 'bunny' ? 0.22 : 0.07); rz += 0.07 * Math.sin(enterAge * f); }
      c.root.position.y = lerp(c.root.position.y, y, 0.5);
      c.root.rotation.z = lerp(c.root.rotation.z, rz, 0.5);
      const vy = (c.root.position.y - c.prevY) / Math.max(dt, 0.001); c.prevY = c.root.position.y;
      c.earV = lerp(c.earV, clamp(vy * 0.08, -0.7, 0.7), 0.25);

      /* arms: idle sway, gestures while speaking (arm toward the partner is `gs`), both up to cheer */
      const gs = side;
      c.arms.forEach((a) => {
        const s = a.side;
        let sz = s * (0.26 + 0.04 * Math.sin(t * 1.5 + c.phase)), ez = s * 0.16, sx = 0;
        if (speaking) {
          if (st.gesture === 0 && s === gs) { sz = s * (1.15 + 0.35 * Math.sin(t * 4.2)); ez = s * (0.5 + 0.3 * Math.sin(t * 4.2 + 1)); }
          else if (st.gesture === 1) { sz = s * (0.85 + 0.25 * Math.sin(t * 3.2)); ez = s * 0.5; }
          else if (s === gs) { sz = s * 1.3; ez = s * 0.1; sx = -0.5; }
        }
        if (walking) { const ph = enterAge * (n === 'bunny' ? 11 : 6) + (s > 0 ? 0 : Math.PI); sz = s * 0.3 + 0.45 * Math.sin(ph); ez = s * 0.25; }
        else if (L.wave && ((n === 'bear' && s === 1) || (n === 'bunny' && s === -1))) { sz = s * (2.5 + 0.35 * Math.sin(t * 9)); ez = s * 0.3; }
        else if (party) { sz = s * (1.5 + 0.9 * Math.sin(t * 6 + (s > 0 ? 0 : 1.6) + c.phase)); ez = s * 0.4; }
        else if (surprised) { sz = s * 1.5; ez = s * 0.6; }
        let fx = 0; // the arm holding the lesson prop brings it up in front of the chest
        if (c.prop && a === c.propArm && !walking && !party && !surprised) { sz = s * 0.22; ez = s * 0.04; sx = -1.0 + (speaking ? 0.05 * Math.sin(t * 6) : 0); fx = -1.6; }
        a.g.rotation.z = lerp(a.g.rotation.z, sz, 0.22);
        a.g.rotation.x = lerp(a.g.rotation.x, sx, 0.22);
        a.fore.rotation.z = lerp(a.fore.rotation.z, ez, 0.22);
        a.fore.rotation.x = lerp(a.fore.rotation.x, fx, 0.22);
      });
      if (c.prop) { // pops in once the character has walked on, and stays upright whatever the arm does
        const a = c.propArm; c.propS = lerp(c.propS, ep >= 1 && !surprised ? 1 : 0, clamp(dt * 7, 0, 1));
        const inner = c.prop.userData.inner, k = (n === 'bunny' ? 1.7 : 2.1) * c.propS;
        inner.scale.setScalar(Math.max(0.001, k * (1 + 0.05 * Math.sin(t * 3 + c.phase))));
        c.prop.rotation.set(-(a.g.rotation.x + a.fore.rotation.x) - 0.1, -L.yaw[n] * 0.9, 0);
        const sp = inner.userData.spin; if (sp) { if (inner.userData.spinY) sp.rotation.y = t * 2; else sp.rotation.z = t * 0.8; }
        c.prop.visible = c.propS > 0.01;
      }

      /* lop ears hang and swing; they flap up when Pinky hops and perk a little when she is surprised */
      c.ears.forEach((e) => {
        const sway = 0.07 * Math.sin(t * 2.4 + e.side) + (speaking ? 0.06 * Math.sin(t * 7) : 0);
        if (e.upright) {
          const lag = -c.earV * 0.7, straight = surprised ? 0 : 1;
          e.base.rotation.z = lerp(e.base.rotation.z, e.restB * straight + sway * 0.4 + lag * 0.3 * e.side, 0.2);
          e.tip.rotation.z = lerp(e.tip.rotation.z, e.restT * straight + sway + lag * 0.5 * e.side, 0.2);
        } else {
          const perk = surprised ? 0.7 : 0;
          e.base.rotation.z = lerp(e.base.rotation.z, e.restB + e.side * (perk * 0.6 + c.earV * 0.5) + sway * 0.5, 0.2);
          e.tip.rotation.z = lerp(e.tip.rotation.z, e.restT + e.side * (perk + c.earV) + sway, 0.2);
        }
      });
    });

    /* film camera: eased dolly between shots, a gentle drift, and a slide toward whoever is speaking */
    /* the camera leads a little toward the partner, because the speaker's face is turned that way */
    const sh = SHOTS[st.shot] || SHOTS.wide, sx = duo && st.speaker ? L.x[st.speaker] : 0;
    const tz = duo && L.focus ? sh.z : 1, tx = duo && L.focus ? (sx - Math.sign(sx) * 0.5) * sh.follow : 0, tly = duo && L.focus && sh.ly != null ? sh.ly : L.cam[1];
    const k = clamp(dt * 2.6, 0, 1);
    cam.zoom = lerp(cam.zoom, tz, k); cam.x = lerp(cam.x, tx, k); cam.ly = lerp(cam.ly, tly, k);
    camera.position.set(cam.x + 0.08 * Math.sin(t * 0.35), cam.ly + (L.cam[0] - L.cam[1]) + 0.04 * Math.sin(t * 0.5), st.camZ * cam.zoom);
    camera.lookAt(cam.x, cam.ly, 0);
  }

  /* ---------- render loop and mounting ---------- */
  function loop(ts) {
    if (!st.mounted || !canvas.isConnected) { st.raf = 0; return; }
    st.raf = requestAnimationFrame(loop);
    const t = ts / 1000, dt = Math.min(0.05, Math.max(0, t - st.last)); st.last = t;
    update(dt, t);
    renderer.render(scene, camera);
  }
  function resize() {
    const el = st.mounted; if (!el) return;
    const w = Math.max(40, el.clientWidth), h = Math.max(40, el.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    const [, , needW, needH] = st.layout.cam, k = 2 * Math.tan((camera.fov * Math.PI) / 360);
    st.camZ = Math.max(needH / k, needW / (camera.aspect * k));
  }
  addEventListener('resize', resize);

  return {
    mount(el) {
      configure(el.getAttribute('data-3d'));
      setProps(el.getAttribute('data-props'));
      st.hold = el.hasAttribute('data-enter'); st.enterAt = null; st.shot = 'wide'; st.speaker = null; st.talking = false; st.mood = el.getAttribute('data-mood') || ''; st.moodT = performance.now() / 1000;
      el.textContent = ''; el.appendChild(canvas); st.mounted = el; el.classList.add('live3d');
      resize();
      update(0.016, st.moodT); renderer.render(scene, camera); // first frame now, so there is no blank flash
      if (!st.raf) st.raf = requestAnimationFrame(loop);
    },
    unmount() { st.mounted = null; },
    /* who is talking (null = nobody); keeps the camera on them until the next speaker */
    speak(who) { st.speaker = who; st.talking = !!who; if (who) st.gesture = Math.floor(Math.random() * 3); },
    enter() { st.hold = false; st.enterAt = performance.now() / 1000; },
    swap(kind) { configure(kind); resize(); st.mood = 'cheer'; st.moodT = performance.now() / 1000; },
    shot(name) { st.shot = SHOTS[name] ? name : 'wide'; },
    props(lessonId) { setProps(lessonId); }, // hand each character the prop for this lesson (null clears)
    lip(fn) { st.lipFn = fn; }, // fn(now) -> { open, round } while someone speaks, or null
    hush() { st.talking = false; }, // stop the mouth between lines but keep the shot
    mood(name) { st.mood = name || ''; st.moodT = performance.now() / 1000; },
    get active() { return !!st.mounted; },
  };
})();
