import Gain from './Gain.js';
import addChildModule from './addChildModule.js';

/**
 * Create a multi-channel mixer to use in synth
 */
export default class Mixer
{
  constructor()
  {
    this.gain = new Gain();
    this.node = this.gain.node;

    this::addChildModule('ch1', new Gain());
    this::addChildModule('ch2', new Gain());
    this::addChildModule('ch3', new Gain());
    this::addChildModule('ch4', new Gain());
    this::addChildModule('ch5', new Gain());
    this::addChildModule('ch6', new Gain());
  }
}
