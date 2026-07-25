// Web Audio API synthesizer for cute husky bark and playful howl sounds

class HuskyAudioSynthesizer {
  constructor() {
    this.audioCtx = null;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Cute playful husky "Arf! Howl!" sound
  playHelloSound() {
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      // 1. Initial short "Woof" (bark)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      const filter1 = this.audioCtx.createBiquadFilter();

      osc1.type = 'sawtooth';
      filter1.type = 'bandpass';
      filter1.frequency.setValueAtTime(450, now);
      filter1.Q.setValueAtTime(2.5, now);

      // Pitch drop for bark
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(120, now + 0.15);

      gain1.gain.setValueAtTime(0.01, now);
      gain1.gain.linearRampToValueAtTime(0.35, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc1.connect(filter1);
      filter1.connect(this.audioCtx.destination);

      osc1.start(now);
      osc1.stop(now + 0.18);

      // 2. Playful Husky Howl "Awoo!" right after bark
      const howlStart = now + 0.18;
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      const filter2 = this.audioCtx.createBiquadFilter();

      osc2.type = 'triangle';
      filter2.type = 'lowpass';
      filter2.frequency.setValueAtTime(1200, howlStart);

      // Frequency glide up then down for "Awoooo"
      osc2.frequency.setValueAtTime(220, howlStart);
      osc2.frequency.exponentialRampToValueAtTime(480, howlStart + 0.25);
      osc2.frequency.linearRampToValueAtTime(380, howlStart + 0.55);
      osc2.frequency.exponentialRampToValueAtTime(180, howlStart + 0.85);

      // Cute vibrato
      const lfo = this.audioCtx.createOscillator();
      const lfoGain = this.audioCtx.createGain();
      lfo.frequency.setValueAtTime(6.5, howlStart);
      lfoGain.gain.setValueAtTime(12, howlStart);
      lfo.connect(osc2.frequency);
      lfo.start(howlStart + 0.2);
      lfo.stop(howlStart + 0.85);

      gain2.gain.setValueAtTime(0.01, howlStart);
      gain2.gain.linearRampToValueAtTime(0.28, howlStart + 0.12);
      gain2.gain.setValueAtTime(0.28, howlStart + 0.45);
      gain2.gain.exponentialRampToValueAtTime(0.001, howlStart + 0.85);

      osc2.connect(filter2);
      filter2.connect(gain2);
      gain2.connect(this.audioCtx.destination);

      osc2.start(howlStart);
      osc2.stop(howlStart + 0.88);

    } catch (e) {
      console.warn("Audio synthesis error:", e);
    }
  }

  // Playful happy yap when starting to play ball
  playYipSound() {
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(650, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.2);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }
}

export const huskyAudio = new HuskyAudioSynthesizer();
