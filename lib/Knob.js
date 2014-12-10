export default class Knob
{
  constructor()
  {
    this.transition = null;
  }

  /**
   * @param {number} value
   * @param {number} start
   * @param {number} end
   * @param {number} duration
   */
  transitionValue(value, start, end, duration)
  {
    if (start === end) return;

    value = start;
    let transitionInterval = this._getTransitionValue(start, end, duration);

    this.transition = setInterval(() => {
      if (value === end) {
        this._stopTransition();
        return;
      }

      value++;
    }, transitionInterval);
  }

  /**
   * @private
   */
  _stopTransition()
  {
    clearInterval(this.transition);
  }

  /**
   * @param {number} start
   * @param {number} end
   * @param {number} duration
   * @private
   */
  _getTransitionValue(start, end, duration)
  {
    return Math.abs(end - start) / duration;
  }
}
