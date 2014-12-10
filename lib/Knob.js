import Promise from 'bluebird';

/**
 * Transition between values over time
 */
export default class Knob
{
  constructor()
  {
    this.transition = null;
  }

  /**
   * @param {object} obj
   * @param {number} value
   * @param {number} end
   * @param {number} duration
   * @return {Promise}
   */
  transitionValue(obj, value, end, duration)
  {
    if (!obj) return;
    if (value === end) return;

    let v = obj[value];
    let transitionInterval = this._getTransitionInterval(v, end, duration);

    return new Promise((resolve, reject) => {
      this._transition = setInterval(() => {
        if (obj[value] === end) {
          this._stop();
          resolve();
          return;
        }

        obj[value]++;
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
