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
  }

  setDecay(decay)                 //set decay time
  {
    this.decay = decay;
  }

  setSustain(sustain)             //set sustain level
  {
    this.sustain = sustain;
  }

  setRelease(release)             //set release time
  {
    this.release = release;
  }

  triggerADS()
  {
    this.destination.setValueAtTime(0, ctx.currentTime);
    this.destination.linearRampToValueAtTime(1, ctx.currentTime + this.attack);
    this.destination.linearRampToValueAtTime(this.sustain, ctx.currentTime + this.attack + this.decay );
  }

}
