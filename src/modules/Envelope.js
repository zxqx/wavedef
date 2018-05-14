import ctx from 'audio-context';

export default class Envelope {
  modulate(destination) {
    this.destination = destination;

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

  getStart() {
    return this.start;
  }

  getDepth() {
    return this.depth;
  }

  trigger() {
    this.destination.setValueAtTime(this.start, ctx().currentTime);
    this.destination.linearRampToValueAtTime(
      this.start + this.depth,
      ctx().currentTime + this.attack,
    );
    this.destination.linearRampToValueAtTime(this.start, ctx().currentTime + this.decay);

    return this;
  }

  triggerADS() {
    this.destination.cancelScheduledValues(ctx().currentTime);
    this.destination.setValueAtTime(0, ctx().currentTime);
    this.destination.linearRampToValueAtTime(1, ctx().currentTime + this.attack);
    this.destination.linearRampToValueAtTime(this.sustain,
      ctx().currentTime + this.attack + this.decay,
    );

    return this;
  }

  triggerRelease() {
    this.destination.cancelScheduledValues(ctx().currentTime);
    this.destination.linearRampToValueAtTime(0, ctx().currentTime + this.release);

    return this;
  }
}
