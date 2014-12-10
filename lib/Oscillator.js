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
  constructor(ctx, frequency, detune, type)
  {
    this.ctx = ctx;
    this.frequency = frequency;
    this.detune = detune;
    this.type = type;

    this.node = this.ctx.createOscillator;
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
   * @param {number} type 
   */
  setWaveformType(type)
  {
    this.node.type = type; 
  }

  /**
   * @param {number} start
   * @param {number} end
   * @param {number} duration
   */
  transitionFrequency(start, end, duration)
  {
    var knob = new Knob(); 
    var freq = this.node.frequency;

    knob.transitionValue(freq, start, end, duration);
  }

  /**
   * @param {number} start
   * @param {number} end
   * @param {number} duration
   */
  transitionDetune(start, end, duration)
  {
    var knob = new Knob(); 
    var detune = this.node.detune;

    knob.transitionValue(detune, start, end, duration);
  }
}
