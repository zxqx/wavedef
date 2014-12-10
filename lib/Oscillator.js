import Knob from './Knob.js';

/**
 * Thin wrapper around the OscillatorNode API with knobs
 * and shit for modulating values
 */
export default class Oscillator
{
  /**
   * @param {AudioContext} ctx
   * @param {number} frequency in hertz
   * @param {number} detune in cents
   * @param {string} type waveform
   */
  constructor(ctx, frequency, detune, waveformType)
  {
    this.ctx = ctx;

    this.node = this.ctx.createOscillator();
    this.node.frequency = frequency;
    this.node.detune = detune;
    this.node.type = waveformType;
  }

  /**
   * Set frequency value in hertz 
   * @param {number} frequency 
   */
  setFrequency(frequency)
  {
    this.node.frequency = frequency; 
  }

  /**
   * Set detune value in cents 
   * @param {number} detune 
   */
  setDetune(detune)
  {
    this.node.detune = detune; 
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
    return this.node.frequency;
  }

  /**
   * Get detune value
   */
  getDetune()
  {
    return this.node.detune;
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
    return knob.transitionValue(this.node, 'frequency', end, duration);
  }

  /**
   * @param {number} end
   * @param {number} duration
   * @return {Promise}
   */
  transitionDetune(end, duration)
  {
    var knob = new Knob(); 
    return knob.transitionValue(this.node, 'detune', end, duration);
  }
}
