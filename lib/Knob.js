import * as Promise from 'bluebird';

/**
 * Transition between values over time
 */
export default class Knob
{
  constructor()
  {
    this._transition = null;
  }

  /**
   * @param {object} obj
   * @param {number} prop
   * @param {number} end
   * @param {number} duration
   * @return {Promise}
   */
  transitionValue(obj, prop, end, duration)
  {
    if (!obj) return;

    let initialValue = obj[prop];
    let transitionInterval = this._getTransitionInterval(initialValue, end, duration);

    return new Promise((resolve, reject) => {
      this._transition = setInterval(() => {
        if (obj[prop] === end) {
          this._stop();
          resolve();
          return;
        }

        if (initialValue < end) obj[prop]++;
        if (initialValue > end) obj[prop]--;
      }, transitionInterval);
    });
  }

  /**
   * @private
   */
  _stop()
  {
    clearInterval(this._transition);
  }

  /**
   * @param {number} start
   * @param {number} end
   * @param {number} duration
   * @private
   */
  _getTransitionInterval(start, end, duration)
  {
    return Math.abs(end - start) / duration;
  }
}
