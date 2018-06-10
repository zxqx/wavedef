import ctx from 'audio-context';

export default class Envelope {
  modulate(destination) {
    this.destination = destination;
    this.setStart(destination.value);

    return this;
  }

  setAttack(attack) {
    this.attack = parseFloat(attack);

    return this;
  }

  setDecay(decay) {
    this.decay = parseFloat(decay);

    return this;
  }

  setSustain(sustain) {
    this.sustain = parseFloat(sustain);

    return this;
  }

  setRelease(release) {
    this.release = parseFloat(release);

    return this;
  }

  setPeakLevel(peakLevel) {
    this.peakLevel = parseFloat(peakLevel);

    return this;
  }

  setDepth(depth) {
    this.depth = parseInt(depth, 10);

    return this;
  }

  setStart(start) {
    this.start = parseFloat(start);

    return this;
  }

  getAttack() {
    return this.attack;
  }

  getDecay() {
    return this.decay;
  }

  getSustain() {
    return this.sustain;
  }

  getRelease() {
    return this.release;
  }

  getPeakLevel() {
    return this.peakLevel;
  }

  getStart() {
    return this.start;
  }

  getDepth() {
    return this.depth;
  }

  computeNormalizedSustain() {
    const peakLevel = this.computeNormalizedPeakLevel();

    return ((peakLevel - this.start) * this.sustain) + this.start;
  }

  computeNormalizedPeakLevel() {
    return this.peakLevel + this.start;
  }

  triggerAttack() {
    const peakLevel = this.computeNormalizedPeakLevel();

    this.destination.linearRampToValueAtTime(peakLevel, ctx().currentTime + this.attack);
  }

  triggerDecay() {
    const sustain = this.computeNormalizedSustain();

    this.destination.linearRampToValueAtTime(
      sustain,
      ctx().currentTime + this.attack + this.decay,
    );
  }

  triggerRelease() {
    this.destination.cancelScheduledValues(ctx().currentTime);
    this.destination.setValueAtTime(this.destination.value, ctx().currentTime);
    this.destination.linearRampToValueAtTime(this.start, ctx().currentTime + this.release);

    return this;
  }

  triggerADS() {
    this.destination.cancelScheduledValues(ctx().currentTime);
    this.destination.setValueAtTime(this.start, ctx().currentTime);
    this.triggerAttack();
    this.triggerDecay();

    return this;
  }

  trigger() {
    this.destination.cancelScheduledValues(ctx().currentTime);
    this.destination.setValueAtTime(this.start, ctx().currentTime);
    this.triggerADS();

    this.destination.linearRampToValueAtTime(
      this.start,
      ctx().currentTime + this.attack + this.decay + this.release,
    );

    return this;
  }
}
