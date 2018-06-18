import LFO from './LFO';
import Gain from './Gain';
import applyParams from '../helpers/applyParams';

export default class Ringmod {
  defaults = {
    type: 'sine',
    frequency: 100,
    depth: 1,
    mix: 0,
  }

  constructor(params = {}) {
    this.lfo = new LFO();
    this.gain = new Gain();
    this.post = new Gain();
    this.input = new Gain();
    this.output = new Gain();
    this.dry = new Gain();

    this.inputNode = this.input.node;
    this.outputNode = this.output.node;

    const {
      lfo,
      gain,
      input,
      output,
      dry,
      post,
    } = this;

    input.node.connect(gain.node);
    gain.node.connect(post.node);
    post.node.connect(output.node);

    input.node.connect(dry.node);
    dry.node.connect(output.node);

    gain.setGain(0);
    input.setGain(1);
    dry.setGain(1);
    lfo.modulate(gain.node.gain);

    this::applyParams(params);
  }

  setFrequency(frequency) {
    this.lfo.setRate(frequency);
  }

  setDepth(depth) {
    this.lfo.setDepth(depth);
  }

  setType(type) {
    this.lfo.setType(type);
  }

  setGain(gain) {
    this.gain.setGain(gain);
  }

  setMix(mix) {
    this.post.setGain(mix);
    this.dry.setGain(1 - mix);
  }

  getFrequency() {
    return this.lfo.getRate();
  }

  getDepth() {
    return this.lfo.getDepth();
  }

  getGain() {
    return this.gain.getGain();
  }

  getType() {
    return this.lfo.getType();
  }
}
