import ctx from 'audio-context';
import applyParams from '../helpers/applyParams';

export default class Filter {
  defaults = {
    cutoff: 350,
    resonance: 1,
    type: 'lowpass',
  }

  constructor(params = {}) {
    this.node = ctx().createBiquadFilter();

    this::applyParams(params);
  }

  types = [
    'lowpass',
    'highpass',
    'bandpass',
    'notch',
    'allpass',
  ]

  setCutoff(frequency) {
    this.node.frequency.value = frequency;
  }

  setResonance(resonance) {
    this.node.Q.value = resonance;
  }

  setType(type) {
    this.node.type = type;
  }

  setGain(gain) {
    this.node.gain.value = gain;
  }

  getCutoff() {
    return this.node.frequency.value;
  }

  getResonance() {
    return this.node.Q.value;
  }

  getType() {
    return this.node.type;
  }

  getGain() {
    return this.node.gain.value;
  }
}
