/**
 * A generic slider UI element for controlling
 * audio module parameters
 */
export default class Slider
{
  /**
   * @param {DOM} document
   * @param {string} label
   */
  constructor(document, label)
  {
    this.el = document.createElement('div');
    this.el.className = 'audio-control';

    this.controlEl = document.createElement('input');
    this.controlEl.type = 'range';

    this.labelEl = document.createElement('label');
    this.labelEl.innerText = label;

    this.el.appendChild(this.labelEl);
    this.el.appendChild(this.controlEl);
  }

  /**
   * Set the minimum value of the slider
   * @param {number} min
   * @return {Slider}
   */
  setMin(min)
  {
    this.controlEl.min = min;
    return this;
  }

  /**
   * Set the maximum value of the slider
   * @param {number} max
   * @return {Slider}
   */
  setMax(max)
  {
    this.controlEl.max = max;
    return this;
  }

  /**
   * Set the interval at which the slider's value
   * will change up or down
   * @param {number} step
   * @return {Slider}
   */
  setStep(step)
  {
    this.controlEl.step = step;
    return this;
  }

  /**
   * Hook the slider up to a given audio module and
   * call its callback function when the slider is moved,
   * handing it the current value of the slider
   * @param {object} module
   * @param {function} callback
   * @return {Slider}
   */
  control(module, callback)
  {
    this.controlEl.addEventListener('input', () => {
      callback.call(module, this.controlEl.value);
    });

    return this;
  }
}
