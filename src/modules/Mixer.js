import Gain from './Gain';
import MixerChannel from './MixerChannel';
import addChildModule from '../helpers/addChildModule';

export default class Mixer {
  constructor(channels = 2) {
    this.channels = channels;
    this.gain = new Gain();
    this.node = this.gain.node;

    this.createChannels();
  }

  createChannels() {
    for (let x = 1; x <= this.channels; x++) {
      this::addChildModule(new MixerChannel());
    }
  }

  channel(number) {
    return this.children[number - 1];
  }
}
