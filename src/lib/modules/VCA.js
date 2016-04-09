import Gain from './Gain.js';

export default class VCA extends Gain
{
  constructor()
  {
    super();

    this.setGain(0);
  }
}
