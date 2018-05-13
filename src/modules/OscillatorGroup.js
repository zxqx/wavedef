import Oscillator from './Oscillator';
import Gain from './Gain';
import addChildModule from '../helpers/addChildModule';

export default class OscillatorGroup {
  /**
   * @param {number} amount
   */
  constructor(amount) {
    this.amount = amount || 2;
    this.masterOscillator = null;
    this.frequencySync = true;

    this.gain = new Gain();
    this.node = this.gain.node;

    this.createOscillators();
  }

  startAll() {
    this.children.forEach(osc => osc.start());
  }

  stopAll() {
    this.children.forEach(osc => osc.stop());
  }

  setFrequencySyncOn() {
    this.frequencySync = true;
  }

  setMasterOscillator(osc) {
    this.masterOscillator = osc;
  }

  createOscillators() {
    for (let x = 1; x <= this.amount; x++) {
      addChildModule(this, `osc${x}`, new Oscillator());
    }
  }

  osc(id) {
    return this[`osc${id}`];
  }
}
