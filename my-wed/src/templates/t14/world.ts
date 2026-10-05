// Real-time 3D chapel aisle for template 14 (three.js). Loaded lazily so the other templates
// do not pay for three.js.
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export interface World {
  open(): void;
  setStop(index: number): void;
  dispose(): void;
}

const GAP = 9; // distance between arches
const ARCH_R = 2.3;
const ALTAR_R = 2.8;

/** Deterministic random so every render of the aisle is identical. */
const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const glowTexture = (inner: string, outer: string) => {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.35, outer);
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

const petalTexture = () => {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  g.translate(32, 32);
  g.rotate(0.6);
  const grad = g.createRadialGradient(0, -4, 2, 0, 0, 22);
  grad.addColorStop(0, "rgba(255,240,244,1)");
  grad.addColorStop(1, "rgba(240,170,190,0)");
  g.fillStyle = grad;
  g.beginPath();
  g.ellipse(0, 0, 13, 22, 0, 0, Math.PI * 2);
  g.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};

export const createWorld = (
  canvas: HTMLCanvasElement,
  opts: { stops: number; photo: string },
): World => {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#140d1a");
  scene.fog = new THREE.FogExp2("#1c1220", 0.05);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.28;

  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 160);
  const disposables: { dispose(): void }[] = [envTex, pmrem];
  const track = <T extends { dispose(): void }>(x: T) => {
    disposables.push(x);
    return x;
  };

  // ---------- lights ----------
  scene.add(new THREE.HemisphereLight("#ffd9c4", "#1a1018", 0.55));
  const camLight = new THREE.PointLight("#ffcf9a", 14, 14, 1.7);
  scene.add(camLight);

  const n = opts.stops; // arch index of the altar
  const altarZ = -n * GAP;
  const altarLight = new THREE.PointLight("#ffd7a8", 70, 18, 1.4);
  altarLight.position.set(0, 3.4, altarZ + 2);
  scene.add(altarLight);

  // ---------- floor and aisle ----------
  const floor = new THREE.Mesh(
    track(new THREE.PlaneGeometry(16, 130)),
    track(
      new THREE.MeshStandardMaterial({
        color: "#2b2129",
        roughness: 0.8,
        metalness: 0.05,
      }),
    ),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.z = -55;
  scene.add(floor);

  const runner = new THREE.Mesh(
    track(new THREE.PlaneGeometry(2.1, 130)),
    track(
      new THREE.MeshStandardMaterial({ color: "#cfc2ba", roughness: 0.95 }),
    ),
  );
  runner.rotation.x = -Math.PI / 2;
  runner.position.set(0, 0.004, -55);
  scene.add(runner);

  // petals lying on the runner
  {
    const r = rng(11);
    const geo = track(new THREE.CircleGeometry(0.05, 10));
    const mat = track(
      new THREE.MeshStandardMaterial({
        roughness: 0.7,
        side: THREE.DoubleSide,
      }),
    );
    const count = 420;
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const m = new THREE.Object3D();
    const tones = ["#f6c9d3", "#ffffff", "#efb4c2", "#fbe4e8"].map(
      (c) => new THREE.Color(c),
    );
    for (let i = 0; i < count; i++) {
      m.position.set((r() - 0.5) * 2.4, 0.01, 4 - r() * (n * GAP + 6));
      m.rotation.set(-Math.PI / 2, 0, r() * Math.PI);
      m.scale.set(1, 0.6 + r() * 0.5, 1);
      m.updateMatrix();
      mesh.setMatrixAt(i, m.matrix);
      mesh.setColorAt(i, tones[i % tones.length]);
    }
    scene.add(mesh);
  }

  // ---------- arches with flower garlands ----------
  const pillarMat = track(
    new THREE.MeshStandardMaterial({ color: "#f4ebde", roughness: 0.55 }),
  );
  const flowerGeo = track(new THREE.IcosahedronGeometry(1, 1));
  const flowerMat = track(new THREE.MeshStandardMaterial({ roughness: 0.75 }));
  const leafGeo = track(new THREE.SphereGeometry(1, 8, 6));
  const leafMat = track(
    new THREE.MeshStandardMaterial({ color: "#5b7a52", roughness: 0.8 }),
  );
  const flowerTones = [
    "#ffffff",
    "#f8e2e7",
    "#f2c3cd",
    "#fbefe6",
    "#e9a9b8",
  ].map((c) => new THREE.Color(c));
  const flowers: { p: THREE.Vector3; s: number; c: THREE.Color }[] = [];
  const leaves: { p: THREE.Vector3; s: number; rot: THREE.Euler }[] = [];

  const addArch = (z: number, R: number, seed: number) => {
    const r = rng(seed);
    const h = 2.7;
    const pillarGeo = track(new THREE.CylinderGeometry(0.1, 0.13, h, 20));
    for (const x of [-R, R]) {
      const p = new THREE.Mesh(pillarGeo, pillarMat);
      p.position.set(x, h / 2, z);
      scene.add(p);
    }
    const top = new THREE.Mesh(
      track(new THREE.TorusGeometry(R, 0.085, 12, 64, Math.PI)),
      pillarMat,
    );
    top.position.set(0, h, z);
    scene.add(top);
    // garland on the curve
    const N = Math.round(R * 22);
    for (let i = 0; i < N; i++) {
      const a = (i / (N - 1)) * Math.PI;
      for (let k = 0; k < 2; k++) {
        const jitter = new THREE.Vector3(
          (r() - 0.5) * 0.22,
          (r() - 0.5) * 0.22,
          (r() - 0.5) * 0.25,
        );
        flowers.push({
          p: new THREE.Vector3(Math.cos(a) * R, h + Math.sin(a) * R, z).add(
            jitter,
          ),
          s: 0.07 + r() * 0.08,
          c: flowerTones[Math.floor(r() * flowerTones.length)],
        });
      }
      if (i % 2 === 0) {
        leaves.push({
          p: new THREE.Vector3(
            Math.cos(a) * (R + 0.12),
            h + Math.sin(a) * (R + 0.12),
            z + (r() - 0.5) * 0.2,
          ),
          s: 0.14 + r() * 0.06,
          rot: new THREE.Euler(r() * 3, r() * 3, a),
        });
      }
    }
    // flowers cascading down the pillars
    for (const x of [-R, R]) {
      for (let i = 0; i < 14; i++) {
        const y = h - i * 0.1 - r() * 0.05;
        flowers.push({
          p: new THREE.Vector3(
            x + (r() - 0.5) * 0.25,
            y,
            z + (r() - 0.5) * 0.25,
          ),
          s: 0.06 + r() * 0.07 * (1 - i / 16),
          c: flowerTones[Math.floor(r() * flowerTones.length)],
        });
      }
    }
  };
  for (let i = 0; i < n; i++) addArch(-i * GAP, ARCH_R, 100 + i);
  addArch(altarZ, ALTAR_R, 999);

  {
    const fm = new THREE.InstancedMesh(flowerGeo, flowerMat, flowers.length);
    const lm = new THREE.InstancedMesh(leafGeo, leafMat, leaves.length);
    const m = new THREE.Object3D();
    flowers.forEach((f, i) => {
      m.position.copy(f.p);
      m.rotation.set(0, 0, 0);
      m.scale.setScalar(f.s);
      m.updateMatrix();
      fm.setMatrixAt(i, m.matrix);
      fm.setColorAt(i, f.c);
    });
    leaves.forEach((l, i) => {
      m.position.copy(l.p);
      m.rotation.copy(l.rot);
      m.scale.set(l.s, l.s * 0.32, l.s * 0.55);
      m.updateMatrix();
      lm.setMatrixAt(i, m.matrix);
    });
    scene.add(fm, lm);
  }

  // ---------- candles ----------
  const flameTex = track(
    glowTexture("rgba(255,246,220,1)", "rgba(255,190,110,0.55)"),
  );
  const flames: THREE.Sprite[] = [];
  {
    const candleGeo = track(new THREE.CylinderGeometry(0.045, 0.05, 0.42, 14));
    const candleMat = track(
      new THREE.MeshStandardMaterial({
        color: "#f6efe4",
        roughness: 0.6,
        emissive: "#3a2410",
      }),
    );
    const flameMat = track(
      new THREE.SpriteMaterial({
        map: flameTex,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
      }),
    );
    for (let z = 5; z > altarZ - 2; z -= 2.25) {
      for (const x of [-1.45, 1.45]) {
        const c = new THREE.Mesh(candleGeo, candleMat);
        c.position.set(x, 0.21, z);
        scene.add(c);
        const f = new THREE.Sprite(flameMat);
        f.position.set(x, 0.5, z);
        f.scale.setScalar(0.42);
        scene.add(f);
        flames.push(f);
      }
    }
  }

  // ---------- bokeh lights in the distance ----------
  {
    const r = rng(7);
    const count = 180;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (r() - 0.5) * 36;
      pos[i * 3 + 1] = 1 + r() * 11;
      pos[i * 3 + 2] = 2 - r() * (n * GAP + 30);
    }
    const g = track(new THREE.BufferGeometry());
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const bokeh = new THREE.Points(
      g,
      track(
        new THREE.PointsMaterial({
          map: track(
            glowTexture("rgba(255,236,200,0.9)", "rgba(255,190,140,0.25)"),
          ),
          size: 0.55,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          fog: false,
        }),
      ),
    );
    scene.add(bokeh);
  }

  // ---------- falling petals ----------
  const petalCount = 240;
  const petalPos = new Float32Array(petalCount * 3);
  const petalSeed = new Float32Array(petalCount);
  {
    const r = rng(23);
    for (let i = 0; i < petalCount; i++) {
      petalPos[i * 3] = (r() - 0.5) * 7;
      petalPos[i * 3 + 1] = r() * 5;
      petalPos[i * 3 + 2] = 4 - r() * (n * GAP + 8);
      petalSeed[i] = r() * 10;
    }
  }
  const petalGeo = track(new THREE.BufferGeometry());
  petalGeo.setAttribute("position", new THREE.BufferAttribute(petalPos, 3));
  const petals = new THREE.Points(
    petalGeo,
    track(
      new THREE.PointsMaterial({
        map: track(petalTexture()),
        size: 0.13,
        transparent: true,
        depthWrite: false,
        color: "#ffffff",
      }),
    ),
  );
  scene.add(petals);

  // ---------- doors on the first arch ----------
  const doorMat = track(
    new THREE.MeshStandardMaterial({
      color: "#efe4d4",
      roughness: 0.45,
      metalness: 0.05,
    }),
  );
  const trimMat = track(
    new THREE.MeshStandardMaterial({
      color: "#c9a25a",
      roughness: 0.3,
      metalness: 0.9,
    }),
  );
  const makeDoor = (side: -1 | 1) => {
    const pivot = new THREE.Group();
    pivot.position.set(side * ARCH_R * 0.94, 0, 0.05);
    const w = ARCH_R * 0.94;
    const panel = new THREE.Mesh(
      track(new THREE.BoxGeometry(w, 2.6, 0.06)),
      doorMat,
    );
    panel.position.set(-side * (w / 2), 1.3, 0);
    pivot.add(panel);
    for (const [y, hh] of [
      [0.75, 0.9],
      [1.95, 0.9],
    ]) {
      const inset = new THREE.Mesh(
        track(new THREE.BoxGeometry(w * 0.66, hh, 0.02)),
        doorMat,
      );
      inset.position.set(-side * (w / 2), y, 0.05);
      const frame = new THREE.Mesh(
        track(new THREE.BoxGeometry(w * 0.7, hh + 0.05, 0.015)),
        trimMat,
      );
      frame.position.set(-side * (w / 2), y, 0.04);
      pivot.add(frame, inset);
    }
    const handle = new THREE.Mesh(
      track(new THREE.SphereGeometry(0.05, 12, 10)),
      trimMat,
    );
    handle.position.set(-side * (w - 0.18), 1.3, 0.08);
    pivot.add(handle);
    scene.add(pivot);
    return pivot;
  };
  const doorL = makeDoor(-1);
  const doorR = makeDoor(1);

  // ---------- altar: glow, framed photo, 3D ring ----------
  const halo = new THREE.Sprite(
    track(
      new THREE.SpriteMaterial({
        map: track(
          glowTexture("rgba(255,236,200,1)", "rgba(255,190,140,0.35)"),
        ),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        fog: false,
      }),
    ),
  );
  halo.position.set(0, 2.2, altarZ - 2);
  halo.scale.setScalar(9);
  scene.add(halo);

  const frame = new THREE.Mesh(
    track(new THREE.BoxGeometry(1.66, 2.16, 0.06)),
    track(
      new THREE.MeshStandardMaterial({
        color: "#d4ac62",
        metalness: 1,
        roughness: 0.25,
      }),
    ),
  );
  frame.position.set(0, 1.75, altarZ - 0.6);
  scene.add(frame);
  const photoMat = track(
    new THREE.MeshBasicMaterial({ color: "#ffffff", toneMapped: false }),
  );
  const photo = new THREE.Mesh(
    track(new THREE.PlaneGeometry(1.5, 2.0)),
    photoMat,
  );
  photo.position.set(0, 1.75, altarZ - 0.56);
  scene.add(photo);
  new THREE.TextureLoader().load(opts.photo, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    // cover-fit the photo into a 3:4 frame
    const img = tex.image as HTMLImageElement;
    const want = 1.5 / 2.0;
    const have = img.width / img.height;
    if (have > want) {
      tex.repeat.set(want / have, 1);
      tex.offset.set((1 - want / have) / 2, 0);
    } else {
      tex.repeat.set(1, have / want);
      tex.offset.set(0, (1 - have / want) / 2);
    }
    photoMat.map = track(tex);
    photoMat.needsUpdate = true;
  });

  const ring = new THREE.Group();
  const band = new THREE.Mesh(
    track(new THREE.TorusGeometry(0.24, 0.045, 32, 120)),
    track(
      new THREE.MeshPhysicalMaterial({
        color: "#f0c879",
        metalness: 1,
        roughness: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 2.4,
      }),
    ),
  );
  const gem = new THREE.Mesh(
    track(new THREE.OctahedronGeometry(0.075, 0)),
    track(
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        metalness: 0.1,
        roughness: 0,
        envMapIntensity: 4,
        clearcoat: 1,
      }),
    ),
  );
  gem.position.y = 0.3;
  gem.scale.set(1, 1.25, 1);
  ring.add(band, gem);
  ring.position.set(0, 3.25, altarZ + 0.6);
  scene.add(ring);
  const ringLight = new THREE.PointLight("#fff1d6", 6, 3, 1.5);
  ringLight.position.set(0.5, 3.6, altarZ + 1.6);
  scene.add(ringLight);

  const sparkles: THREE.Sprite[] = [];
  {
    const mat = track(
      new THREE.SpriteMaterial({
        map: flameTex,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
        fog: false,
      }),
    );
    const r = rng(5);
    for (let i = 0; i < 14; i++) {
      const s = new THREE.Sprite(mat);
      s.position.set(
        (r() - 0.5) * 1.6,
        2.8 + r() * 0.9,
        altarZ + 0.6 + (r() - 0.5) * 0.6,
      );
      s.userData.phase = r() * Math.PI * 2;
      scene.add(s);
      sparkles.push(s);
    }
  }

  // ---------- camera choreography ----------
  const camPos = new THREE.Vector3(0, 1.75, 10.5);
  const camLook = new THREE.Vector3(0, 2.0, -6);
  const wantPos = camPos.clone();
  const wantLook = camLook.clone();
  camera.position.copy(camPos);
  camera.lookAt(camLook);

  let opened = false;
  let doorT = 0;
  const setStop = (i: number) => {
    if (i >= n) {
      wantPos.set(0, 1.75, altarZ + 7.6);
      wantLook.set(0, 2.55, altarZ);
    } else {
      wantPos.set(0, 1.7, -i * GAP + 5.6);
      wantLook.set(0, 2.15, -i * GAP - 8);
    }
  };

  // ---------- render loop ----------
  const resize = () => {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = w / h < 0.6 ? 58 : 50;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const clock = new THREE.Clock();
  let raf = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;

    if (opened && doorT < 1) doorT = Math.min(1, doorT + dt / 2.2);
    const e = 1 - Math.pow(1 - doorT, 3);
    doorL.rotation.y = e * 1.85;
    doorR.rotation.y = -e * 1.85;

    const k = 1 - Math.exp(-dt * 1.35);
    camPos.lerp(wantPos, k);
    camLook.lerp(wantLook, k);
    camera.position.set(
      camPos.x + Math.sin(t * 0.5) * 0.04,
      camPos.y + Math.sin(t * 0.8) * 0.025,
      camPos.z,
    );
    camera.lookAt(camLook);
    camLight.position.set(camera.position.x, 2.4, camera.position.z - 2.5);

    for (let i = 0; i < flames.length; i++) {
      flames[i].scale.setScalar(
        0.38 + Math.sin(t * 9 + i * 1.7) * 0.03 + Math.sin(t * 13 + i) * 0.02,
      );
    }
    for (let i = 0; i < petalCount; i++) {
      const s = petalSeed[i];
      petalPos[i * 3 + 1] -= dt * (0.18 + (s % 1) * 0.12);
      petalPos[i * 3] += Math.sin(t * 0.9 + s) * dt * 0.08;
      if (petalPos[i * 3 + 1] < 0) petalPos[i * 3 + 1] = 5;
    }
    petalGeo.attributes.position.needsUpdate = true;

    ring.rotation.y = t * 0.9;
    ring.rotation.x = Math.sin(t * 0.7) * 0.25;
    ring.position.y = 3.25 + Math.sin(t * 1.3) * 0.05;
    for (const s of sparkles) {
      const a = (Math.sin(t * 2.2 + s.userData.phase) + 1) / 2;
      s.scale.setScalar(0.05 + a * 0.14);
    }
    halo.material.opacity = 0.85 + Math.sin(t * 0.8) * 0.15;

    renderer.render(scene, camera);
  };
  tick();

  return {
    open() {
      opened = true;
      setStop(0);
    },
    setStop,
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
};
