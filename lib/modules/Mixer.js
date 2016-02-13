import Gain from './Gain.js';
import MixerChannel from './MixerChannel.js';
import addChildModule from './addChildModule.js';

/**
 * Create a multi-channel mixer to use in synth
 */
export default class Mixer
{
  constructor(amount)
  {
    this.amount = amount || 2;
    this.gain = new Gain();
    this.node = this.gain.node;

    this._createChannels();
  }

  /**
   * Boot up the requested number of mixer channels
   * @private
   */
  _createChannels()
  {
    for (let x = 1; x <= this.amount; x++) {
      let child = this::addChildModule(`ch${x}`, new MixerChannel());
    }
  }
}
