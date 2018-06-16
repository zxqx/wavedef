import Delay from './Delay';
import Gain from './Gain';
import Panner from './Panner';
import LFO from './LFO';
import applyParams from '../helpers/applyParams';

export default class Chorus {
  constructor(params = {}) {
    this.defaults = {
      offset1DelayTime: 0.006,
      offset1WetDryMix: 1,
      offset2DelayTime: 0.02,
      offset2WetDryMix: 1,
      movement: 0.005,
      width: 0.2,
      wetDryMix: 1,
    };

    this.input = new Gain();
    this.direct = new Gain();
    this.output = new Gain();
    this.mix = new Gain();
    this.offset1 = new Delay();
    this.offset2 = new Delay();
    this.offset1pan = new Panner();
    this.offset2pan = new Panner();
    this.lfo = new LFO();

    const {
      input,
      direct,
      offset1,
      offset2,
      mix,
      output,
      offset1pan,
      offset2pan,
      lfo,
    } = this;

    this.inputNode = this.input.node;
    this.outputNode = this.output.node;

    input.node.connect(direct.node);
    direct.node.connect(output.node);

    input.node.connect(offset1.inputNode);
    offset1.outputNode.connect(offset1pan.node);
    offset1pan.node.connect(mix.node);

    input.node.connect(offset2.inputNode);
    offset2.outputNode.connect(offset2pan.node);
    offset2pan.node.connect(mix.node);
    mix.node.connect(output.node);

    offset1pan.setPanPosition(-0.5);
    offset2pan.setPanPosition(0.05);
    offset1.setFeedback(0);
    offset2.setFeedback(0);
    mix.setGain(1);

    lfo.modulate(this.offset1.delay.delayTime);
    lfo.modulate(this.offset2.delay.delayTime);
    lfo.setDepth(0.01);

    this::applyParams(params);
  }

  setOffset1DelayTime(time) {
    this.offset1.setDelayTime(time);
  }

  setOffset2DelayTime(time) {
    this.offset2.setDelayTime(time);
  }

  setOffset1WetDryMix(mix) {
    this.offset1.setWetDryMix(mix);
  }

  setOffset2WetDryMix(mix) {
    this.offset2.setWetDryMix(mix);
  }

  setMovement(amount) {
    this.lfo.setFrequency(amount);
  }

  setWidth(width) {
    this.offset1pan.setPanPosition(0 - width);
    this.offset2pan.setPanPosition(width);
  }

  setWetDryMix(mix) {
    this.direct.setGain(1 - mix);
    this.mix.setGain(mix / 2);
  }
}
