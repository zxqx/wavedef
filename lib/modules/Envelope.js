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
    this.decay = decay;
    this.decay = parseFloat(this.decay);
  }

  setSustain(sustain)             //set sustain level
  {
    this.sustain = sustain;
    this.sustain = parseFloat(this.sustain);
  }

  setRelease(release)             //set release time
  {
    this.release = release;
    this.release = parseFloat(this.release);
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
    this.destination.setValueAtTime(0, ctx.currentTime);
    this.destination.linearRampToValueAtTime(1, ctx.currentTime + this.attack);
    this.destination.linearRampToValueAtTime(this.sustain, ctx.currentTime + this.attack + this.decay );
  }

}
