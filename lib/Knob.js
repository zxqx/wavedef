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
   * @param {AudioNode} node
   * @param {number} value
   * @param {number} end
   * @param {number} duration
   * @return {Promise}
   */
  transitionValue(node, value, end, duration)
  {
    if (!node) throw new Error('Requires audio node');
    if (value === end) return;

    let v = node[value];
    let transitionInterval = this._getTransitionInterval(v, end, duration);

    return new Promise((resolve, reject) => {
      this._transition = setInterval(() => {
        if (node[value] === end) {
          this._stop();
          resolve();
          return;
        }

        node[value]++;
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
