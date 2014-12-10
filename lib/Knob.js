import Promise from 'bluebird';

export default class Knob
{
  constructor()
  {
    this.transition = null;
  }

  /**
   * @param {number} start
   * @param {number} end
   * @param {number} duration
   * @return {Promise}
   */
  transitionValue(value, end, duration)
  {
    if (value === end) return;

    let transitionInterval = this._getTransitionInterval(value, end, duration);

    return new Promise((resolve, reject) => {
      this._transition = setInterval(() => {
        if (value === end) {
          this._stopTransition();
          resolve(end);
          return;
        }

        value++;
      }, transitionInterval);
    });
  }

  /**
   * @private
   */
  _stopTransition()
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
