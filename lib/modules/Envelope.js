import ctx from 'audio-context';

export default class Envelope
{
  modulate(destination)
  {
    this.destination = destination;
  }

  setAttack(attack)               //set attack time
  {
    this.attack = parseFloat(attack);
  }

  setDecay(decay)                 //set decay time
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

  setStart(initial)
  {
    this.initial = parseFloat(initial);
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
    return this.initial;
  }

  getDepth()
  {
    return this.depth;
  }

  trigger()
  {
    this.destination.setValueAtTime(this.initial, ctx.currentTime);
    this.destination.linearRampToValueAtTime(this.initial + this.depth, ctx.currentTime + this.attack);
    this.destination.linearRampToValueAtTime(this.initial, ctx.currentTime + this.attack + this.decay);
  }

  triggerADS()
  {
    this.destination.setValueAtTime(0, ctx.currentTime);
    this.destination.linearRampToValueAtTime(1,ctx.currentTime + this.attack);
    this.destination.linearRampToValueAtTime(this.sustain, ctx.currentTime + this.attack + this.decay);

  }

}
