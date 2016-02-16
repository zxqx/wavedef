import notesToFrequencies from 'notes-to-frequencies';
import Mousetrap from 'mousetrap';

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
  j: 'B'
};

const KEY_TO_OCTAVE_CHANGE_MAP = {
  KeyZ: OCTAVE_DOWN,
  KeyX: OCTAVE_UP
};

export default class ComputerKeyboard
{
  /**
   * @param {number} octave
   */
  constructor(octave)
  {
    this.octave = octave;

    this._setupKeyBindings();
  }

  /**
   * Set the playable octave
   * @param {number} octave
   */
  setOctave(octave)
  {
    this.octave = octave;
  }

  /**
   * Trigger all `onPress` callbacks
   * @param {Array:function} callbacks
   */
  triggerOnPress(callbacks)
  {
    this._onPressCallbacks = callbacks;
  }

  /**
   * Trigger all `onRelease` callbacks
   * @param {Array:function} callbacks
   */
  triggerOnRelease(callbacks)
  {
    this._onReleaseCallbacks = callbacks;
  }

  /**
   * Listen for `keydown` and `keyup` events and proxy calls
   * to internal methods
   * @private
   */
  _setupKeyBindings()
  {
    Mousetrap.bind(Object.keys(KEY_TO_NOTE_MAP), (event, key) => {
      let note = KEY_TO_NOTE_MAP[key];
      let octaveChange = KEY_TO_OCTAVE_CHANGE_MAP[key];

      if (!note && !octaveChange) return;
      if (note) {
        this._triggerOnPressCallbacks(key);
      }
      else if (octaveChange) {
        this._triggerOctaveChange(key);
      }
    }, 'keydown');

    Mousetrap.bind(Object.keys(KEY_TO_NOTE_MAP), (event, key) => {
      this._holding = false;

      console.log(this._keysBeingHeld);

      this._glidingBetweenKeys = this._keysBeingHeld.length > 1;

      let index = this._keysBeingHeld.indexOf(key);
      this._keysBeingHeld.splice(index, 1);

      if (this._glidingBetweenKeys) {
        return;
      }

      if (this._onReleaseCallbacks) {
        this._onReleaseCallbacks.forEach(cb => cb());
      }
    }, 'keyup');
  }

  /**
   * Trigger all stored callback
   * @param {string} keycode
   * @private
   */
  _triggerOnPressCallbacks(keycode)
  {
    if (!Array.isArray(this._keysBeingHeld)) {
      this._keysBeingHeld = [];
    }

    if (!~this._keysBeingHeld.indexOf(keycode)) {
      this._keysBeingHeld.push(keycode);
    }

    if (keycode !== this._lastKeyHeld) {
      this._holding = false;
    }

    if (this._holding) return;

    this._currentPressedTime = new Date() - 0;

    this.keyIsBeingHeld = (this._lastPressedTime > this._currentPressedTime - 500) && (keycode === this._lastKeyHeld);

    this._lastPressedTime = this._currentPressedTime;
    this._lastKeyHeld = keycode;

    let note = KEY_TO_NOTE_MAP[keycode];
    let noteAndOctave = note + this.octave;
    let frequency = notesToFrequencies(noteAndOctave);

    if (this._onPressCallbacks) {
      this._onPressCallbacks.forEach(cb => cb(frequency));
    }

    if (this.keyIsBeingHeld) {
      this._holding = true;
    }
  }

  /**
   * Update the current octave up or down
   * @param {string} keycode
   * @private
   */
  _triggerOctaveChange(keycode)
  {
    let octaveChangeDirection = KEY_TO_OCTAVE_CHANGE_MAP[keycode];

    if (octaveChangeDirection === OCTAVE_UP) {
      if (this.octave === 9) return;
      this.setOctave(this.octave + 1);
    }
    else if (octaveChangeDirection === OCTAVE_DOWN) {
      if (this.octave === 0) return;
      this.setOctave(this.octave - 1);
    }
  }
}
