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

  setSustain(sustain)             //set sustain level
  {
    this.sustain = parseFloat(sustain);
  }

  setRelease(release)             //set release time
  {
    this.release = parseFloat(release);
  }

  setStart(initial)
  {
    this.initial = parseFloat(initial);

  }

  setDepth(depth)
  {
    this.depth = parseFloat(depth);
  } 

  getAttack(attack)
  {
    return this.attack;
  }

  getDecay(decay)
  {
    return this.decay;
  }

  getSustain(sustain)
  {
    return this.sustain;
  }

  getRelease(release)
  {
    return this.release;
  }

  triggerADS()
  {
    this.destination.setValueAtTime(this.initial, ctx.currentTime);
    this.destination.linearRampToValueAtTime(this.initial + this.depth, ctx.currentTime + this.attack);
    this.destination.linearRampToValueAtTime(this.initial, ctx.currentTime + this.attack + this.decay );
  }

}
