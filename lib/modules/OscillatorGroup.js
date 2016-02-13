import ctx from 'audio-context';
import Gain from './Gain.js';
import Oscillator, { ON_FREQUENCY_CHANGE } from './Oscillator.js';
import addChildModule from './addChildModule.js';

export default class OscillatorGroup
{
  /**
   * @param {number} amount
   */
  constructor(amount)
  {
    this.amount = amount;
    this.frequencySync = true;
    this.masterOscillator = null;

    this.gain = new Gain();
    this.node = this.gain.node;

    this._createOscillators();
  }

  /**
   * Proxy start calls to all oscillators
   */
  startAll()
  {
    this.children.forEach(osc => osc.start());
  }

  /**
   * Sync all oscillators to one master oscillator
   */
  setFrequencySyncOn()
  {
    this.frequencySync = true;
  }

  /**
   * Disable frequency sync
   */
  setFrequencySyncOff()
  {
    this.frequencySync = false;
    this.masterOscillator.unsubscribe(ON_FREQUENCY_CHANGE);
  }

  /**
   * @param {OscillatorNode} osc
   */
  setMasterOscillator(osc)
  {
    this.masterOscillator = osc;
  }

  /**
   * Boot up the requested number of oscillators
   * @private
   */
  _createOscillators()
  {
    for (let x = 1; x <= this.amount; x++) {
      let child = this::addChildModule(`osc${x}`, new Oscillator());

      if (this.frequencySync) {
        this._setupFrequencySyncCallback(child);
      }
    }
  }

  /**
   * @param {OscillatorNode} child
   * @private
   */
  _setupFrequencySyncCallback(child)
  {
    if (this.children.indexOf(child) === 0) {
      this.setMasterOscillator(this.masterOscillator || child);
    }
    else {
      child.subscribe(ON_FREQUENCY_CHANGE, this.masterOscillator, () => {
        let freq = this.masterOscillator.getFrequency();
        child.setFrequency(freq);
      });
    }
  }
}
