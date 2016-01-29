import ctx from 'audio-context';

export default class PercussionEnv
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

  setStart(initial)
  {
    this.initial = initial;
    this.initial = parseFloat(this.initial);
  }

  setDepth(depth)
  {
    this.depth = parseFloat(depth)
  }
  getAttack(attack)
  {
    return this.attack;
  }

  getDecay(decay)
  {
    return this.decay;
  }


  trigger()
  {
    this.destination.setValueAtTime(this.initial, ctx.currentTime);
    this.destination.linearRampToValueAtTime(500, ctx.currentTime + this.attack);
    this.destination.linearRampToValueAtTime(this.initial, ctx.currentTime + this.attack + this.decay );
  }

}
