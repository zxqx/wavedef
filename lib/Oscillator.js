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

    window.osc = this;
  }

  /**
   * Set frequency value in hertz 
   * @param {number} frequency 
   */
  setFrequency(frequency)
  {
    this.node.frequency.value = frequency;
    return this;
  }

  /**
   * Set detune value in cents 
   * @param {number} detune 
   */
  setDetune(detune)
  {
    this.node.detune.value = detune;
    return this;
  }

  /**
   * Set waveform type
   * @param {string} type 
   */
  setWaveformType(type)
  {
    this.node.type = type;
    return this;
  }

  /**
   * Get frequency value
   * @return {number}
   */
  getFrequency()
  {
    return this.node.frequency.value;
  }

  /**
   * Get detune value
   * @return {number}
   */
  getDetune()
  {
    return this.node.detune.value;
  }

  /**
   * Get waveform type 
   * @return {string}
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
