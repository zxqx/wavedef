import Gain from './Gain';

/**
 * Set up a mixer channel with a toggle on/off switch and volume control
 */
export default class MixerChannel {
  constructor() {
    this.input = new Gain();
    this.output = new Gain();
    this.inputNode = this.input.node;
    this.outputNode = this.output.node;

    this.inputNode.connect(this.outputNode);
  }

  setGain(gain) {
    this.output.setGain(gain);
  }

  toggleOn() {
    this.input.setGain(1);
  }

  toggleOff() {
    this.input.setGain(0);
  }
}
