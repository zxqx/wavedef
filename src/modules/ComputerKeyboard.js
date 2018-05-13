import noteToFrequency from 'note-to-frequency';
import Mousetrap from 'mousetrap';
import 'mousetrap/plugins/global-bind/mousetrap-global-bind';

const OCTAVE_UP = 'octaveUp';
const OCTAVE_DOWN = 'octaveDown';
const KEY_HOLD_DELAY_TIME = 500;

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
  constructor(octave) {
    this.octave = octave;

    this.setupKeyBindings();
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
      this.triggerOnPressCallbacks(key, note);
    }, 'keydown');

    Mousetrap.bindGlobal(Object.keys(KEY_TO_NOTE_MAP), (event, key) => {
      this.triggerOnReleaseCallbacks(key);
    }, 'keyup');

    Mousetrap.bindGlobal(Object.keys(KEY_TO_OCTAVE_CHANGE_MAP), (event, key) => {
      const octaveChangeDirection = KEY_TO_OCTAVE_CHANGE_MAP[key];
      this.triggerOctaveChange(octaveChangeDirection);
    });
  }

  /**
   * Trigger all stored `onPress` callbacks
   * Do some nasty shit to check if key is being held so we don't
   * unnecessarily re-trigger callbacks on key hold
   * @param {string} key
   * @param {string} note
   * @private
   */
  triggerOnPressCallbacks(key, note) {
    if (!note) return;

    if (!Array.isArray(this.keysBeingHeld)) {
      this.keysBeingHeld = [];
    }

    if (!this.keysBeingHeld.includes(key)) {
      this.keysBeingHeld.push(key);
    }

    if (key !== this.lastKeyHeld) {
      this.holding = false;
    }

    if (this.holding) return;

    this.currentPressedTime = new Date() - 0;

    this.keyIsBeingHeld = (this.lastPressedTime > this.currentPressedTime - KEY_HOLD_DELAY_TIME) &&
    (key === this.lastKeyHeld) && !this.justReleased;

    if (this.keyIsBeingHeld) {
      this.holding = true;
      return;
    }

    this.lastPressedTime = this.currentPressedTime;
    this.lastKeyHeld = key;

    const noteAndOctave = note + this.octave;
    const frequency = noteToFrequency(noteAndOctave);

    if (this.onPressCallbacks) {
      this.onPressCallbacks.forEach(cb => cb(frequency));
    }

    this.justReleased = false;
  }

  /**
   * Trigger all stored `onRelease` callbacks
   * @param {string} key
   * @private
   */
  triggerOnReleaseCallbacks(key) {
    this.holding = false;

    if (key === this.lastKeyHeld) {
      this.justReleased = true;
    }

    this.glidingBetweenKeys = this.keysBeingHeld.length > 1;

    const index = this.keysBeingHeld.indexOf(key);
    this.keysBeingHeld.splice(index, 1);

    // Prevent release from being called if we're switching between notes
    // quickly
    if (this.glidingBetweenKeys) {
      const thisKey = this.keysBeingHeld[this.keysBeingHeld.length - 1];
      const note = KEY_TO_NOTE_MAP[thisKey];
      this.triggerOnPressCallbacks(thisKey, note);

      return;
    }

    if (this.onReleaseCallbacks) {
      this.onReleaseCallbacks.forEach(cb => cb(key));
    }
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
    } else if (octaveChangeDirection === OCTAVE_DOWN) {
      if (this.octave === 1) return;
      this.setOctave(this.octave - 1);
    }
  }
}
