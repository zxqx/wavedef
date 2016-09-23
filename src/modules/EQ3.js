import Filter from './Filter.js';
import Gain from './Gain.js';
/*
Basic EQ built with 3 filters in series. High and Low have a frequency adjustment
Mid Frequency is based off of the high and low settings
*/

export default class EQ3
{
  constructor()
  {
    this.input = new Gain();
    this.output = new Gain();
    this.eqLow = new Filter();
    this.eqMid = new Filter();
    this.eqHigh = new Filter();

    this.inputNode = this.input.node;
    this.outputNode = this.output.node;

    //Set Variables
    let input = this.input;
    let output = this.output;
    let low = this.eqLow;
    let mid = this.eqMid;
    let high = this.eqHigh;

    //Audio routing
    input.node.connect(low.node);
    low.node.connect(mid.node);
    mid.node.connect(high.node);
    high.node.connect(output.node);

    //Bootup Defaults. Defaults based on Ableton's 3-band EQ startup
    input.setGain(1);
    output.setGain(1);

    low.setFilterType('lowshelf');
    low.setFrequency(250);
    low.setGain(25);

    mid.setFilterType('peaking');
    mid.setFrequency(1375);
    mid.setGain(25);

    high.setFilterType('highshelf');
    high.setFrequency(2500);
    high.setGain(25);

  }

  lowSetGain(value)
  {
    this.eqLow.setGain(value);
  }

  midSetGain(value)
  {
    this.eqMid.setGain(value);
  }

  highSetGain(value)
  {
    this.eqHigh.setGain(value);
  }

  lowFrequency(frequency)
  {
    this.eqLow.setFrequency(frequency);
    this.midFrequency();
  }

  highFrequency(frequency)
  {
    this.eqHigh.setFrequency(frequency);
    this.midFrequency();
  }

  midFrequency()
  {
    let low = parseInt(this.eqLow.getFrequency());
    let high = parseInt(this.eqHigh.getFrequency());
    let average = (low + high) / 2;
    this.eqMid.setFrequency(average);
  }
}
