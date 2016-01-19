/**
 * Thin wrapper around the OscillatorNode API that exposes
 * convenient methods for interacting with parameters
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
   * @return {Oscillator}
   */
  setFrequency(frequency)
  {
    this.node.frequency.value = frequency;
    return this;
  }

  /**
   * Set detune value in cents
   * @param {number} detune
   * @return {Oscillator}
   */
  setDetune(detune)
  {
    this.node.detune.value = detune;
    return this;
  }

  /**
   * Set waveform type
   * @param {string} type
   * @return {Oscillator}
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
   * @param {number} value
   * @param {number} duration in seconds
   * @return {Oscillator}
   */
  transitionFrequency(value, duration)
  {
    var freq = this.node.frequency;

    freq.linearRampToValueAtTime(freq.value, this.ctx.currentTime);
    freq.linearRampToValueAtTime(value, this.ctx.currentTime + duration);

    return this;
  }

  /**
   * @param {number} value
   * @param {number} duration in seconds
   * @return {Oscillator}
   */
  transitionDetune(value, duration)
  {
    var detune = this.node.detune;

    detune.linearRampToValueAtTime(detune.value, this.ctx.currentTime);
    detune.linearRampToValueAtTime(value, this.ctx.currentTime + duration);

    return this;
  }
}
