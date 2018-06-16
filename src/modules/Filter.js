import ctx from 'audio-context';

export default class Filter {
  constructor() {
    this.node = ctx().createBiquadFilter();
  }

  types = [
    'lowpass',
    'highpass',
    'bandpass',
    'notch',
    'allpass',
  ]

  setFrequency(frequency) {
    this.node.frequency.value = frequency;
  }

  setResonance(resonance) {
    this.node.Q.value = resonance;
  }

  setFilterType(type) {
    this.node.type = type;
  }

  setGain(gain) {
    this.node.gain.value = gain;
  }

  getFrequency() {
    return this.node.frequency.value;
  }

  getResonance() {
    return this.node.Q.value;
  }

  getFilterType() {
    return this.node.type;
  }

  getGain() {
    return this.node.gain.value;
  }
}
