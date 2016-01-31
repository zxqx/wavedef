import ctx from 'audio-context';

export default class Envelope
{
  modulate(destination)
  {
    this.destination = destination;
  }

  setAttack(attack)               //set attack time
  {
    this.attack = attack;
    this.attack = parseFloat(this.attack);
  }

  setDecay(decay)                 //set decay time
  {
    this.decay = parseFloat(decay);
  }

  setSustain(sustain)
  {
    this.sustain = parseFloat(sustain);
  }

  setStart(initial)
  {
    this.initial = parseFloat(initial);
  }

  setDepth(depth)
  {
    this.depth = parseFloat(depth);
  }

  getAttack()
  {
    return this.attack;
  }

  getDecay()
  {
    return this.decay;
  }

  getStart()
  {
    return this.initial;
  }

  getDepth()
  {
    return this.depth;
  }

  getSustain()
  {
    return this.sustain;
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
