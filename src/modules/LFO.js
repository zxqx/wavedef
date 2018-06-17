import Oscillator from './Oscillator';
import Gain from './Gain';
import applyParams from '../helpers/applyParams';

export default class LFO {
  defaults = {
    type: 'sine',
    depth: 100,
    rate: 1,
  }

  constructor(params = {}) {
    this.osc = new Oscillator();
    this.gain = new Gain();
    this.destinations = [];

    const { osc, gain } = this;

    gain.setGain(1);
    osc.node.connect(gain.node);

    this::applyParams(params);
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

  setType(type) {
    this.osc.setType(type);

    return this;
  }

  setRate(rate) {
    this.osc.setFrequency(rate);

    return this;
  }

  getDestinations() {
    return this.destinations;
  }

  bpmSync(bpm, note) {
    this.osc.setFrequency(1 / ((60 / bpm) / note));

    return this;
  }

  getRate() {
    return this.osc.node.frequency.value;
  }

  getDepth() {
    return this.gain.getGain();
  }

  getType() {
    return this.osc.getType();
  }
}
