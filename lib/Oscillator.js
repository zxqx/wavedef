import Knob from './Knob.js';

/**
 * Thin wrapper around the OscillatorNode API with knobs
 * and shit for modulating values
 */
export default class Oscillator
{
  /**
   * @param {AudioContext} ctx
   */
  constructor(ctx)
  {
    this.ctx = ctx;
    this.node = this.ctx.createOscillator();
  }

  /**
   * Set frequency value in hertz 
   * @param {number} frequency 
   */
  setFrequency(frequency)
  {
    this.node.frequency.value = frequency;
  }

  /**
   * Set detune value in cents 
   * @param {number} detune 
   */
  setDetune(detune)
  {
    this.node.detune.value = detune;
  }

  /**
   * Set waveform type
   * @param {string} type 
   */
  setWaveformType(type)
  {
    this.node.type = type;
  }

  /**
   * Get frequency value
   */
  getFrequency()
  {
    return this.node.frequency.value;
  }

  /**
   * Get detune value
   */
  getDetune()
  {
    return this.node.detune.value;
  }

  /**
   *  Get waveform type 
   */
  getWaveformType()
  {
    return this.node.type;
  }

  /**
   * @param {number} end
   * @param {number} duration
   * @return {Promise}
   */
  transitionFrequency(end, duration)
  {
    var knob = new Knob(); 
    return knob.transitionValue(this.node.frequency, 'value', end, duration);
  }

  /**
   * @param {number} end
   * @param {number} duration
   * @return {Promise}
   */
  transitionDetune(end, duration)
  {
    var knob = new Knob(); 
    return knob.transitionValue(this.node.detune, 'value', end, duration);
  }
}
