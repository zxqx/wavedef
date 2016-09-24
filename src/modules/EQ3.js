import Filter from './Filter.js';
import Gain from './Gain.js';

export default class EQ3 {
  constructor() {
    this.input = new Gain();
    this.output = new Gain();
    this.eqLow = new Filter();
    this.eqMid = new Filter();
    this.eqHigh = new Filter();

    this.inputNode = this.input.node;
    this.outputNode = this.output.node;

    const input = this.input;
    const output = this.output;
    const low = this.eqLow;
    const mid = this.eqMid;
    const high = this.eqHigh;

    input.node.connect(low.node);
    low.node.connect(mid.node);
    mid.node.connect(high.node);
    high.node.connect(output.node);

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

  lowSetGain(value) {
    this.eqLow.setGain(value);
  }

  midSetGain(value) {
    this.eqMid.setGain(value);
  }

  highSetGain(value) {
    this.eqHigh.setGain(value);
  }

  lowFrequency(frequency) {
    this.eqLow.setFrequency(frequency);
    this.midFrequency();
  }

  highFrequency(frequency) {
    this.eqHigh.setFrequency(frequency);
    this.midFrequency();
  }

  midFrequency() {
    const low = parseInt(this.eqLow.getFrequency(), 10);
    const high = parseInt(this.eqHigh.getFrequency(), 10);
    const average = (low + high) / 2;
    this.eqMid.setFrequency(average);
  }
}
