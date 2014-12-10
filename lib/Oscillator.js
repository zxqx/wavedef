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
   * @param {number} frequency 
   */
  setFrequency(frequency)
  {
    this.node.frequency = frequency; 
  }

  /**
   * @param {number} detune 
   */
  setDetune(detune)
  {
    this.node.detune = detune; 
  }

  /**
   * @param {string} type 
   */
  setWaveformType(type)
  {
    this.node.type = type; 
  }

  /**
   * @param {number} end
   * @param {number} duration
   * @return {Promise}
   */
  transitionFrequency(end, duration)
  {
    var knob = new Knob(); 
    var freq = this.node.frequency;

    return knob.transitionValue(freq, end, duration);
  }

  /**
   * @param {number} end
   * @param {number} duration
   * @return {Promise}
   */
  transitionDetune(end, duration)
  {
    var knob = new Knob(); 
    var detune = this.node.detune;

    return knob.transitionValue(detune, end, duration);
  }
}
