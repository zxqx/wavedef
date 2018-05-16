import ctx from 'audio-context';

export default class Filter {
  constructor(name = 'Filter') {
    this.name = name;
    this.node = ctx().createBiquadFilter();
  }

  getParams() {
    return [
      {
        label: 'Frequency',
        context: this,
        path: 'node.frequency',
      },
      {
        label: 'Resonance',
        context: this,
        path: 'node.Q',
      },
    ];
  }

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
