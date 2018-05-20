import LFO from './LFO';
import Gain from './Gain';

export default class Ringmod {
  constructor(name = 'Ringmod') {
    this.name = name;
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
  }

  getParams() {
    return [
      {
        label: 'Frequency',
        context: this,
        path: 'lfo.osc.node.frequency',
      },
    ];
  }
  setFrequency(frequency) {
    this.lfo.setFrequency(frequency);
  }

  setDepth(depth) {
    this.lfo.setDepth(depth);
  }

  setWaveformType(waveform) {
    this.lfo.setWaveformType(waveform);
  }

  setGain(gain) {
    this.gain.setGain(gain);
  }

  setWetDryMix(value) {
    this.post.setGain(value);
    this.dry.setGain(1 - value);
  }
}
