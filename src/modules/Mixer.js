import Gain from './Gain';
import MixerChannel from './MixerChannel';
import applyParams from '../helpers/applyParams';
import addChildModule from '../helpers/addChildModule';

export default class Mixer {
  defaults = {
    channels: 2,
  }

  constructor(params = {}) {
    this.gain = new Gain();
    this.node = this.gain.node;

    this::applyParams(params);
    this.createChannels();
  }

  setChannels(numberOfChannels) {
    this.channels = numberOfChannels;
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
