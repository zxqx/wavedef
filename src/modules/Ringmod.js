import LFO from './LFO.js';
import Gain from './Gain.js';

export default class Ringmod {
  constructor() {
    this.ringmod = new LFO();
    this.lfo = new LFO();
    this.gain = new Gain();
    this.post = new Gain();
    this.input = new Gain();
    this.output = new Gain();
    this.dry = new Gain();

    this.inputNode = this.input.node;
    this.outputNode = this.output.node;

    const { ringmod, gain, lfo, input, output, dry, post } = this;

    input.node.connect(gain.node);
    gain.node.connect(post.node);
    post.node.connect(output.node);

    input.node.connect(dry.node);
    dry.node.connect(output.node);

    gain.setGain(0);
    input.setGain(1);
    dry.setGain(1);
    ringmod.modulate(gain.node.gain);
    lfo.modulate(ringmod.osc.node.frequency);
    lfo.setDepth(0);
    lfo.setFrequency(100);
  }

  setFrequency(frequency) {
    this.ringmod.setFrequency(frequency);
  }

  setDepth(depth) {
    this.ringmod.setDepth(depth);
  }

  setWaveformType(waveform) {
    this.ringmod.setWaveformType(waveform);
  }

  setGain(gain) {
    this.gain.setGain(gain);
  }

  lfoRate(rate) {
    this.lfo.setFrequency(rate);
  }

  lfoDepth(depth) {
    this.lfo.setDepth(depth);
  }

  setLfoWaveformType(waveform) {
    this.lfo.setWaveformType(waveform);
  }

  setWetDryMix(value) {
    this.post.setGain(value);
    this.dry.setGain(1 - value);
  }
}
