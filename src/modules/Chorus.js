import Delay from './Delay.js';
import Gain from './Gain.js';
import Panner from './Panner.js';
import LFO from './LFO.js';

export default class Chorus {
  constructor() {
    this.input = new Gain();
    this.direct = new Gain();
    this.output = new Gain();
    this.mix = new Gain();
    this.offset1 = new Delay();
    this.offset2 = new Delay();
    this.offset1pan = new Panner();
    this.offset2pan = new Panner();
    this.lfo = new LFO();


    const { input, direct, offset1, offset2, mix, output, offset1pan, offset2pan, lfo } = this;

    this.inputNode = this.input.node;
    this.outputNode = this.output.node;

    // connect Dry thru signal with 2 offset delays (offset summed in mix/gain)

    input.node.connect(direct.node);
    direct.node.connect(output.node);

    input.node.connect(offset1.inputNode);
    offset1.outputNode.connect(offset1pan.node);
    offset1pan.node.connect(mix.node);

    input.node.connect(offset2.inputNode);
    offset2.outputNode.connect(offset2pan.node);
    offset2pan.node.connect(mix.node);
    mix.node.connect(output.node);

    // Bootup Defaults
    offset1.setFeedback(0);
    offset1.setWetDryMix(1);
    offset1.setDelayTime(0.0006);
    offset1pan.setPanPosition(-0.5);

    offset2.setFeedback(0);
    offset2.setWetDryMix(1);
    offset2.setDelayTime(0.001);
    offset2pan.setPanPosition(0.05);

    mix.setGain(1);

    lfo.modulate(this.offset1.delay.delayTime);
    lfo.modulate(this.offset2.delay.delayTime);

    lfo.setDepth(0.01);
    lfo.setFrequency(0.005);
  }

  setWetDryMix(mix) {
    this.direct.setGain(1 - mix);
    this.mix.setGain(mix / 2);
  }

  setWidth(width) {
    this.offset1pan.setPanPosition(0 - width);
    this.offset2pan.setPanPosition(width);
  }

  setOffset1(time) {
    this.offset1.setDelayTime(time);
  }

  setOffset2(time) {
    this.offset2.setDelayTime(time);
  }

  setMovement(amount) {
    this.lfo.setFrequency(amount);
  }
}
