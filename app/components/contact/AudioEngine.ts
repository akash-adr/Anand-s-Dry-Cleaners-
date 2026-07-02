"use client";

// Web Audio API Synthesizer Engine
let audioCtx: AudioContext | null = null;

export const initAudioContext = () => {
  if (typeof window !== "undefined" && !audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  
  // Attempt to resume if suspended
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  
  return audioCtx;
};

export const getIsAudioEnabled = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auraSoundEnabled') !== 'false';
  }
  return true;
};

export const setAudioEnabled = (enabled: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auraSoundEnabled', enabled ? 'true' : 'false');
  }
};

export const playBubblePop = (baseFrequency = 400, volume = 0.10) => {
  if (!getIsAudioEnabled()) return;
  const ctx = initAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;
  osc.frequency.setValueAtTime(baseFrequency, now);
  // Sweet high-pitched exponential sweep
  osc.frequency.exponentialRampToValueAtTime(baseFrequency * 2.2, now + 0.08);

  // Short pop envelope
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.start(now);
  osc.stop(now + 0.15);
};

export const playSuccessChime = () => {
  if (!getIsAudioEnabled()) return;
  const ctx = initAudioContext();
  if (!ctx || ctx.state === 'suspended') return;

  // C-Major Arpeggio (C4, E4, G4, C5)
  const frequencies = [261.63, 329.63, 392.00, 523.25];
  
  frequencies.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Use sine for pure, harmonious tone
    osc.type = "sine";
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Staggered entrance
    const startTime = ctx.currentTime + index * 0.08;

    osc.frequency.setValueAtTime(freq, startTime);
    // Dynamic suffix sweeps
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, startTime + 0.2);

    // Envelope
    gain.gain.setValueAtTime(0.08, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

    osc.start(startTime);
    osc.stop(startTime + 0.4);
  });
};
