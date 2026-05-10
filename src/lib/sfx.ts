// Lightweight WebAudio SFX — no network assets, no CORS.

let ctx: AudioContext | null = null;
function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

function makeNoiseBuffer(ac: AudioContext, seconds: number) {
  const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * seconds), ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

/** Short, subtle wax-seal crack: low thump + filtered noise snap. */
export function playSealCrack(volume = 0.35) {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  const master = ac.createGain();
  master.gain.value = volume;
  master.connect(ac.destination);

  // Low thump
  const osc = ac.createOscillator();
  const oGain = ac.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(160, t);
  osc.frequency.exponentialRampToValueAtTime(55, t + 0.18);
  oGain.gain.setValueAtTime(0.0001, t);
  oGain.gain.exponentialRampToValueAtTime(0.7, t + 0.01);
  oGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
  osc.connect(oGain).connect(master);
  osc.start(t);
  osc.stop(t + 0.3);

  // Crack snap — short burst of band-passed noise
  const noise = ac.createBufferSource();
  noise.buffer = makeNoiseBuffer(ac, 0.18);
  const bp = ac.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 2400;
  bp.Q.value = 0.9;
  const nGain = ac.createGain();
  nGain.gain.setValueAtTime(0.0001, t);
  nGain.gain.exponentialRampToValueAtTime(0.55, t + 0.005);
  nGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
  noise.connect(bp).connect(nGain).connect(master);
  noise.start(t);
  noise.stop(t + 0.2);
}

/** Soft paper slide / unfold: long filtered noise sweep. */
export function playPaperSlide(volume = 0.25, duration = 1.4) {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  const master = ac.createGain();
  master.gain.value = volume;
  master.connect(ac.destination);

  const noise = ac.createBufferSource();
  noise.buffer = makeNoiseBuffer(ac, duration + 0.2);
  const lp = ac.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.setValueAtTime(900, t);
  lp.frequency.linearRampToValueAtTime(2600, t + duration * 0.6);
  lp.frequency.linearRampToValueAtTime(1200, t + duration);
  lp.Q.value = 0.4;

  const hp = ac.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 600;

  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.5, t + 0.25);
  g.gain.exponentialRampToValueAtTime(0.25, t + duration * 0.7);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);

  noise.connect(hp).connect(lp).connect(g).connect(master);
  noise.start(t);
  noise.stop(t + duration + 0.05);
}
