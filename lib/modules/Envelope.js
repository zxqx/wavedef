import ctx from 'audio-context';

export default class Envelope
{
  modulate(destination)
  {
    this.destination = destination;
  }

  setAttack(attack)
  {
    this.attack = parseFloat(attack);
  }

  setDecay(decay)
  {
    this.decay = parseFloat(decay);
  }

  setSustain(sustain)
  {
    this.sustain = parseFloat(sustain);
  }

  setRelease(release)
  {
    this.release = parseFloat(release);
  }

  setDepth(depth)
  {
    this.depth = parseInt(depth);
  }

  setStart(start)
  {
    this.start = parseFloat(start);
  }

  getAttack()
  {
    return this.attack;
  }
  getDecay()
  {
    return this.decay;
  }

  getSustain()
  {
    return this.sustain;
  }

  getRelease()
  {
    return this.release;
  }

  getStart()
  {
    return this.start;
  }

  getDepth()
  {
    return this.depth;
  }

  trigger()
  {
    this.destination.setValueAtTime(this.start, ctx.currentTime);
    this.destination.linearRampToValueAtTime(this.start + this.depth, ctx.currentTime + this.attack);
    this.destination.linearRampToValueAtTime(this.start, ctx.currentTime + this.decay);
  }

  triggerADS()
  {
    this.destination.cancelScheduledValues(ctx.currentTime);
    this.destination.setValueAtTime(0, ctx.currentTime);
    this.destination.linearRampToValueAtTime(1, ctx.currentTime + this.attack);
    this.destination.linearRampToValueAtTime(this.sustain, ctx.currentTime + this.decay);
  }

  triggerRelease()
  {
    this.destination.cancelScheduledValues(ctx.currentTime);
    this.destination.linearRampToValueAtTime(0, ctx.currentTime + this.release);
  }

}
