import Delay from './Delay.js';
import Gain from './Gain.js';

export default class Chorus
{
  constructor()
  {
    this.input = new Gain();
    this.direct = new Gain();
    this.output = new Gain();
    this.mix = new Gain();
    this.offset1 = new Delay();
    this.offset2 = new Delay();


    let {input, direct, offset1, offset2, mix, output} = this;

    this.inputNode = this.input.node;
    this.outputNode = this.output.node;

    //connect Dry thru signal with 2 offset delays (offset summed in mix/gain)

    input.node.connect(direct.node);
    direct.node.connect(output.node);

    input.node.connect(offset1.inputNode);
    offset1.outputNode.connect(mix.node);
    input.node.connect(offset2.inputNode);
    offset2.outputNode.connect(mix.node);
    mix.node.connect(output.node);

    //Bootup Defaults
    offset1.setFeedback(0);
    offset1.setWetDryMix(1);
    offset1.setDelayTime(0.0006);

    offset2.setFeedback(0);
    offset2.setWetDryMix(1);
    offset2.setDelayTime(0.001);

    mix.setGain(1);
  }

}
