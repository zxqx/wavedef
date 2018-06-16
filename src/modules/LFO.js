import Oscillator from './Oscillator';
import Gain from './Gain';

export default class LFO {
  constructor() {
    this.osc = new Oscillator();
    this.gain = new Gain();

    const { osc, gain } = this;

    gain.setGain(1);
    osc.node.connect(gain.node);
  }

  modulate(destination) {
    if (!Array.isArray(this.destination)) {
      this.destination = [];
    }

    this.destination.push(destination);
    this.destination.forEach(d => this.gain.node.connect(d));
  }

  modulateOne(destination) {
    this.gain.node.disconnect(this.destination);

    this.destination = destination;
    this.gain.node.connect(destination);
  }

  disconnect() {
    this.gain.node.disconnect(this.destination);
    this.destination = null;
  }

  setDepth(depth) {
    this.gain.setGain(depth);
  }

  setWaveformType(waveform) {
    this.osc.setWaveformType(waveform);
  }

  setFrequency(frequency) {
    this.osc.setFrequency(frequency);
  }

  getDestinations() {
    return this.destination;
  }

  bpmSync(bpm, note) {
    this.osc.setFrequency(1 / ((60 / bpm) / note));
  }

  getFrequency() {
    return this.osc.node.frequency.value;
  }

  getDepth() {
    return this.gain.getGain();
  }

  getWaveformType() {
    return this.osc.getWaveformType();
  }
}
