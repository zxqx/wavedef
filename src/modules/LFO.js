import Oscillator from './Oscillator';
import Gain from './Gain';

export default class LFO {
  constructor() {
    this.osc = new Oscillator();
    this.gain = new Gain();
    this.destinations = [];

    const { osc, gain } = this;

    gain.setGain(1);
    osc.node.connect(gain.node);
  }

  modulate(destination) {
    this.destinations.push(destination);
    this.gain.node.connect(destination);

    return this;
  }

  disconnect(destination) {
    this.destinations = this.destinations.filter(d => d !== destination);
    this.gain.node.disconnect(destination);

    return this;
  }

  disconnectAll() {
    this.destinations.forEach(d => this.gain.node.disconnect(d));
    this.destinations = [];

    return this;
  }

  setDepth(depth) {
    this.gain.setGain(depth);

    return this;
  }

  setWaveformType(waveform) {
    this.osc.setType(waveform);

    return this;
  }

  setFrequency(frequency) {
    this.osc.setFrequency(frequency);

    return this;
  }

  getDestinations() {
    return this.destinations;
  }

  bpmSync(bpm, note) {
    this.osc.setFrequency(1 / ((60 / bpm) / note));

    return this;
  }

  getFrequency() {
    return this.osc.node.frequency.value;
  }

  getDepth() {
    return this.gain.getGain();
  }

  getWaveformType() {
    return this.osc.getType();
  }
}
