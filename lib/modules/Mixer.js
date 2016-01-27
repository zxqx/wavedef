import ctx from 'audio-context';
import Gain from './Gain.js';
import addChildModule from './addChildModule.js';

/**
 * Create a multi-channel mixer to use in synth
 */
export default class Mixer
{
  constructor()
  {
    this.node = ctx.createChannelMerger(3);

    this::addChildModule('ch1', new Gain());
    this::addChildModule('ch2', new Gain());
    this::addChildModule('ch3', new Gain());
  }
}
