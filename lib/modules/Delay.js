import ctx from 'audio-context';
import Gain from './Gain.js';

export default class Delay
{
  constructor()
    {
      this.node = ctx.createDelay();
      this.feedback = new Gain();

      let delay = this.node;
      let feedback = this.feedback;

      //Connect Feedback Loop

      this.node.connect(feedback.node);
      feedback.node.connect(this.node);

      //Defaults on 'Bootup'
      this.node.delayTime.value = 0.5;
      feedback.setGain(0.8);

    }

  setFeedback(value)
    {
      this.feedback.setGain(value);
    }

  setDelayTime(time)
    {
      this.node.delayTime.value = time;
    }

  getFeedback()
    {
      return this.feedback.getGain();
    }

  getDelayTime()
    {
      return this.node.delayTime.value;
    }

  setBpmSync(bpm,note)
    {
      this.node.delayTime.value = (60 / bpm) / note;
    }

}
