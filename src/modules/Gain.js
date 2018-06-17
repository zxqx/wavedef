import ctx from 'audio-context';
import applyParams from '../helpers/applyParams';

/**
 * Creating a Gain class to use Globally in multiple
 * applications (such as multi-channel mixer)
 */
export default class Gain {
  defaults = {
    gain: 1,
  }

  constructor(params = {}) {
    this.node = ctx().createGain();

    this::applyParams(params);
  }

  setGain(gain) {
    this.node.gain.value = gain;
  }

  getGain() {
    return this.node.gain.value;
  }
}
