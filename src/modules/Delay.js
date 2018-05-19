import ctx from 'audio-context';
import Gain from './Gain';

export default class Delay {
  constructor(name = 'Delay') {
    this.name = name;
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
  }

  getParams() {
    return [
      {
        label: 'Time',
        context: this,
        path: 'delay.delayTime',
      },
      {
        label: 'Feedback',
        context: this,
        path: 'feedback.node',
      },
    ];
  }

  setFeedback(value) {
    this.feedback.setGain(value);
  }

  setDelayTime(time) {
    this.delay.delayTime.value = time;
  }

  setBpmSync(bpm, note) {
    this.delay.delayTime.value = (60 / bpm) / note;
  }

  setWetDryMix(value) {
    this.wet.setGain(0 + value);
    this.dry.setGain(1 - value);
  }

  getFeedback() {
    return this.feedback.getGain();
  }

  getDelayTime() {
    return this.delay.delayTime.value;
  }
}
