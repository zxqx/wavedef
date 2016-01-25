import ctx from 'audio-context';

export default class Envelope
{
  modulate(destination)
  {
    this.destination = destination;
  }

  setAttack(attack)
  {
    this.attack = attack;
  }

  setDecay(decay)
  {
    this.decay = decay;
  }

  setSustain(sustain)
  {
    this.sustain = sustain;
  }

  setRelease(release)
  {
    this.release = release;
  }

  triggerADS()
  {
    this.destination.setValueAtTime(0, ctx.currentTime);
    this.destination.linearRampToValueAtTime(1, ctx.currentTime + this.attack);
    //this.destination.linearRampToValueAtTime(this.sustain, ctx.currentTime + this.attack + this.decay );
  }

}
