import ctx from 'audio-context';
import Gain from './Gain.js';
import Mixer from './Mixer.js';

export default class Delay
{
  constructor()
  {
    this.delay = ctx.createDelay();
    this.feedback = new Gain();
    this.input = new Gain();
    this.mixer = new Mixer();
    this.dry = this.mixer.ch1;
    this.wet = this.mixer.ch2;

    let delay = this.delay;
    let feedback = this.feedback;
    let input = this.input;
    let dry = this.dry;
    let wet = this.wet;

    this.inputNode = this.input.node;
    this.outputNode = this.mixer.node;

    //Connect Feedback Loop
    input.node.connect(dry.node);

    input.node.connect(delay);
    delay.connect(feedback.node);
    feedback.node.connect(delay);

    delay.connect(wet.node);


    //Defaults on 'Bootup'
    this.setDelayTime(0.5);
    this.setFeedback(0.5);
    this.wetDryMix(0.5);

  }

  setFeedback(value)
  {
    this.feedback.setGain(value);
  }

  setDelayTime(time)
  {
    this.delay.delayTime.value = time;
  }

  getFeedback()
  {
    return this.feedback.getGain();
  }

  getDelayTime()
  {
    return this.delay.delayTime.value;
  }

  setBpmSync(bpm,note)
  {
    this.delay.delayTime.value = (60 / bpm) / note;
  }

  wetDryMix(value)
  {
    this.wet.setGain(0 + value);
    this.dry.setGain(1 - value);
  }

}
