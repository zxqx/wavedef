import Mousetrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';
import {
  triggerOnPressCallbacks,
  triggerOnReleaseCallbacks,
} from '../helpers/keyboardTracking';

const OCTAVE_UP = 'octaveUp';
const OCTAVE_DOWN = 'octaveDown';

const KEY_TO_NOTE_MAP = {
  a: 'C.0',
  w: 'C#.0',
  s: 'D.0',
  e: 'D#.0',
  d: 'E.0',
  f: 'F.0',
  t: 'F#.0',
  g: 'G.0',
  y: 'G#.0',
  h: 'A.0',
  u: 'A#.0',
  j: 'B.0',
  k: 'C.1',
  o: 'C#.1',
  l: 'D.1',
  p: 'D#.1',
  ';': 'E.1',
  '\'': 'F.1',
  ']': 'F#.1',
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
      const noteAndOctave = KEY_TO_NOTE_MAP[key];
      const [note, octave] = noteAndOctave.split('.');
      this.triggerOnPressCallbacks(`${note}${this.octave + parseInt(octave, 10)}`);
    }, 'keydown');

    Mousetrap.bindGlobal(Object.keys(KEY_TO_NOTE_MAP), (event, key) => {
      const noteAndOctave = KEY_TO_NOTE_MAP[key];
      const [note, octave] = noteAndOctave.split('.');
      this.triggerOnReleaseCallbacks(`${note}${this.octave + parseInt(octave, 10)}`);
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
