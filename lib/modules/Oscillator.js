import ctx from 'audio-context';

export const ON_FREQUENCY_CHANGE = 'event:onFrequencyChange';

/**
 * Thin wrapper around the OscillatorNode API that exposes
 * convenient methods for interacting with parameters
 */
export default class Oscillator
{
  constructor()
  {
    this.node = ctx.createOscillator();
  }

  /**
   * Proxy start() to oscillator node
   * @return {Oscillator}
   */
  start()
  {
    this.node.start();
    return this;
  }

  /**
   * Proxy stop() to oscillator node
   * @return {Oscillator}
   */
  stop()
  {
    this.node.stop();
    return this;
  }

  /**
   * Set frequency value in hertz
   * @param {number} frequency
   * @return {Oscillator}
   */
  setFrequency(frequency)
  {
    this.node.frequency.value = frequency;

    if (this.onFrequencyChangeCallbacks) {
      this.onFrequencyChangeCallbacks.forEach(cb => cb(frequency));
    }

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
   * Subscribe to an event and invoke a callback when it happens
   * @param {string} eventName
   * @param {AudioNode} instance
   * @param {function} callback
   */
  subscribe(eventName, instance, callback)
  {
    if (eventName === ON_FREQUENCY_CHANGE) {
      if (!Array.isArray(instance.onFrequencyChangeCallbacks)) {
        instance.onFrequencyChangeCallbacks = [];
      }

      instance.onFrequencyChangeCallbacks.push(callback);
    }
  }

  /**
   * Stop listening to a given event
   * @param {string} eventName
   */
  unsubscribe(eventName)
  {
    if (eventName === ON_FREQUENCY_CHANGE) {
      this.onFrequencyChangeCallbacks = null;
    }
  }
}
