import Gain from './Gain.js';

/**
 * Set up a mixer channel with a toggle on/off switch and volume control
 */
export default class MixerChannel {
  constructor() {
    this.input = new Gain();
    this.output = new Gain();
    this.inputNode = this.input.node;
    this.outputNode = this.output.node;

    this.toggleOff();
    this.inputNode.connect(this.outputNode);
  }

  /**
   * Set the gain
   * @param {number} gain
   */
  setGain(gain) {
    this.output.setGain(gain);
  }

  /**
   * Turn on the channel
   */
  toggleOn() {
    this.input.setGain(1);
  }

  /**
   * Turn off the channel
   */
  toggleOff() {
    this.input.setGain(0);
  }
}
