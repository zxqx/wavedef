import ctx from 'audio-context';
import Gain from './Gain';
import applyParams from '../helpers/applyParams';

export default class Delay {
  defaults = {
    time: 0.5,
    feedback: 0.25,
    mix: 0,
  }

  constructor(params = {}) {
    this.delay = ctx().createDelay();
    this.input = new Gain();
    this.output = new Gain();
    this.feedback = new Gain();
    this.dry = new Gain();
    this.wet = new Gain();

    const {
      delay,
      dry,
      wet,
      feedback,
    } = this;

    this.inputNode = this.input.node;
    this.outputNode = this.output.node;

    this.inputNode.connect(dry.node);
    dry.node.connect(this.outputNode);

    this.inputNode.connect(delay);
    delay.connect(feedback.node);
    feedback.node.connect(delay);
    delay.connect(wet.node);
    wet.node.connect(this.outputNode);

    this::applyParams(params);
  }

  setFeedback(value) {
    this.feedback.setGain(value);
  }

  setTime(time) {
    this.delay.delayTime.value = time;
  }

  setBpmSync(bpm, note) {
    this.delay.delayTime.value = (60 / bpm) / note;
  }

  setMix(value) {
    this.wet.setGain(0 + value);
    this.dry.setGain(1 - value);
  }

  getFeedback() {
    return this.feedback.getGain();
  }

  getTime() {
    return this.delay.delayTime.value;
  }
}
