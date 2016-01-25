import ctx from 'audio-context';

/**
 * Creating a Gain class to use Globally in multiple
 * applications (such as multi-channel mixer)
 */
export default class Gain
{
  constructor()
  {
    this.node = ctx.createGain();
  }

  setGain(volume)
  {
    return this.node.gain.value = volume;
  }

  getGain(volume)
  {
    return this.node.gain.value;
  }

  rampVolume(amount,time)
  {
    this.node.gain.setValueAtTime(0,ctx.currentTime);
    this.node.gain.linearRampToValueAtTime(amount, ctx.currentTime + time);
  }
}
