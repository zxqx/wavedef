import Delay from './Delay';
import Gain from './Gain';
import Panner from './Panner';
import LFO from './LFO';
import applyParams from '../helpers/applyParams';

export default class Chorus {
  defaults = {
    offset1Time: 0.006,
    offset2Time: 0.02,
    width: 0.2,
    movement: 0.005,
    mix: 1,
  }

  constructor(params = {}) {
    this.input = new Gain();
    this.output = new Gain();
    this.direct = new Gain();
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

    offset1.setFeedback(0);
    offset2.setFeedback(0);
    offset1.setMix(1);
    offset2.setMix(1);
    mix.setGain(1);

    lfo.modulate(this.offset1.delay.delayTime);
    lfo.modulate(this.offset2.delay.delayTime);
    lfo.setDepth(0.01);

    this::applyParams(params);
  }

  setOffset1Time(time) {
    this.offset1.setTime(time);
  }

  setOffset2Time(time) {
    this.offset2.setTime(time);
  }

  setOffset1WetDryMix(mix) {
    this.offset1.setMix(mix);
  }

  setOffset2WetDryMix(mix) {
    this.offset2.setMix(mix);
  }

  setMovement(amount) {
    this.lfo.setRate(amount);
  }

  setWidth(width) {
    this.offset1pan.setPan(0 - width);
    this.offset2pan.setPan(width);
  }

  setMix(mix) {
    this.direct.setGain(1 - mix);
    this.mix.setGain(mix / 2);
  }

  getOffset1Time() {
    return this.offset1.getTime();
  }

  getOffset2Time() {
    return this.offset2.getTime();
  }

  getMovement() {
    return this.lfo.getRate();
  }
}
