import notesToFrequencies from 'notes-to-frequencies';

const OCTAVE_UP = 'octaveUp';
const OCTAVE_DOWN = 'octaveDown';

const KEY_TO_NOTE_MAP = {
  KeyA: 'C',
  KeyW: 'C#',
  KeyS: 'D',
  KeyE: 'D#',
  KeyD: 'E',
  KeyF: 'F',
  KeyT: 'F#',
  KeyG: 'G',
  KeyY: 'G#',
  KeyH: 'A',
  KeyU: 'A#',
  KeyJ: 'B'
}

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
    this.callback = null;
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
    this.onPressCallbacks = callbacks;
  }

  /**
   * Trigger all `onRelease` callbacks
   * @param {Array:function} callbacks
   */
  triggerOnRelease(callbacks)
  {
    this.onReleaseCallbacks = callbacks;
  }

  /**
   * Listen for `keydown` and `keyup` events and proxy calls
   * to internal methods
   * @private
   */
  _setupKeyBindings()
  {
    document.body.addEventListener('keydown', (event) => {
      let note = KEY_TO_NOTE_MAP[event.code];
      let octaveChange = KEY_TO_OCTAVE_CHANGE_MAP[event.code];

      if (!note && !octaveChange) return;
      if (note) {
        this._triggerOnPressCallbacks(event.code);
      }
      else if (octaveChange) {
        this._triggerOctaveChange(event.code);
      }
    });

    document.body.addEventListener('keyup', (event) => {
      this._holding = false;
      this._lastPressedTime = null;

      if (this.onReleaseCallbacks) {
        this.onReleaseCallbacks.forEach(cb => cb());
      }
    });
  }

  /**
   * Trigger all stored callback
   * @param {string} keycode
   * @private
   */
  _triggerOnPressCallbacks(keycode)
  {
    if (keycode !== this._lastKeyHeld) {
      this._holding = false;
    }

    if (this._holding) return;

    this._currentPressedTime = new Date() - 0;

    let keyIsBeingHeld = (this._lastPressedTime > this._currentPressedTime - 500) && (keycode === this._lastKeyHeld);

    this._lastPressedTime = this._currentPressedTime;
    this._lastKeyHeld = keycode;

    if (keyIsBeingHeld) {
      this._holding = true;
      return;
    }

    let note = KEY_TO_NOTE_MAP[keycode];
    let noteAndOctave = note + this.octave;
    let frequency = notesToFrequencies(noteAndOctave);

    if (this.onPressCallbacks) {
      this.onPressCallbacks.forEach(cb => cb(frequency));
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
