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
    this.node.gain.value = volume;
  }

  getGain()
  {
    return this.node.gain.value;
  }
}
