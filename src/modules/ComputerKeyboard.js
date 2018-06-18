import Mousetrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import {
  triggerOnPressCallbacks,
  triggerOnReleaseCallbacks,
} from '../helpers/keyboardTracking';

const OCTAVE_UP = 'octaveUp';
const OCTAVE_DOWN = 'octaveDown';

const KEY_TO_NOTE_MAP = {
  a: 'C',
  w: 'C#',
  s: 'D',
  e: 'D#',
  d: 'E',
  f: 'F',
  t: 'F#',
  g: 'G',
  y: 'G#',
  h: 'A',
  u: 'A#',
  j: 'B',
};

const KEY_TO_OCTAVE_CHANGE_MAP = {
  z: OCTAVE_DOWN,
  x: OCTAVE_UP,
};

export default class ComputerKeyboard {
  /**
   * @param {number} octave
   */
  constructor(octave = 3) {
    this.octave = octave;

    this.setupKeyBindings();

    this.triggerOnPressCallbacks = this::triggerOnPressCallbacks;
    this.triggerOnReleaseCallbacks = this::triggerOnReleaseCallbacks;
  }

  /**
   * Set the playable octave
   * @param {number} octave
   */
  setOctave(octave) {
    this.octave = octave;
  }

  /**
   * Trigger all `onPress` callbacks
   * @param {Array:function} callbacks
   */
  triggerOnPress(callbacks) {
    this.onPressCallbacks = callbacks;
  }

  /**
   * Trigger all `onRelease` callbacks
   * @param {Array:function} callbacks
   */
  triggerOnRelease(callbacks) {
    this.onReleaseCallbacks = callbacks;
  }

  /**
   * Listen for `keydown` and `keyup` events and proxy calls
   * to internal methods
   * @private
   */
  setupKeyBindings() {
    Mousetrap.bindGlobal(Object.keys(KEY_TO_NOTE_MAP), (event, key) => {
      const note = KEY_TO_NOTE_MAP[key];
      this.triggerOnPressCallbacks(`${note}${this.octave}`);
    }, 'keydown');

    Mousetrap.bindGlobal(Object.keys(KEY_TO_NOTE_MAP), (event, key) => {
      const note = KEY_TO_NOTE_MAP[key];
      this.triggerOnReleaseCallbacks(`${note}${this.octave}`);
    }, 'keyup');

    Mousetrap.bindGlobal(Object.keys(KEY_TO_OCTAVE_CHANGE_MAP), (event, key) => {
      const octaveChangeDirection = KEY_TO_OCTAVE_CHANGE_MAP[key];
      this.triggerOctaveChange(octaveChangeDirection);
    });
  }

  /**
   * Update the current octave up or down
   * @param {string} octaveChangeDirection
   * @private
   */
  triggerOctaveChange(octaveChangeDirection) {
    if (!octaveChangeDirection) return;

    if (octaveChangeDirection === OCTAVE_UP) {
      if (this.octave === 8) return;
      this.setOctave(this.octave + 1);
    }

    if (octaveChangeDirection === OCTAVE_DOWN) {
      if (this.octave === 1) return;
      this.setOctave(this.octave - 1);
    }
  }
}
