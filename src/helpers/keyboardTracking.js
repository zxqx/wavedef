import noteToFrequency from 'note-to-frequency';

const NOTE_HOLD_DELAY_TIME = 500;

/**
 * Trigger all stored `onPress` callbacks
 * Do some nasty shit to check if key is being held so we don't
 * unnecessarily re-trigger callbacks on key hold
 * @param {string} note
 */
export function triggerOnPressCallbacks(note) {
  if (!note) return;

  if (!Array.isArray(this.notesBeingHeld)) {
    this.notesBeingHeld = [];
  }

  if (!this.notesBeingHeld.includes(note)) {
    this.notesBeingHeld.push(note);
  }

  if (note !== this.lastNoteHeld) {
    this.holding = false;
  }

  if (this.holding) return;

  this.currentPressedTime = Date.parse(new Date());

  this.noteIsBeingHeld = (this.lastPressedTime > this.currentPressedTime - NOTE_HOLD_DELAY_TIME) &&
    note === this.lastNoteHeld &&
    !this.justReleased;

  if (this.noteIsBeingHeld) {
    this.holding = true;
    return;
  }

  this.lastPressedTime = this.currentPressedTime;
  this.lastNoteHeld = note;

  const frequency = noteToFrequency(note);

  if (this.onPressCallbacks) {
    this.onPressCallbacks.forEach(cb => cb(frequency));
  }

  this.justReleased = false;
}

/**
 * Trigger all stored `onRelease` callbacks
 * @param {string} note
 * @private
 */
export function triggerOnReleaseCallbacks(note) {
  this.holding = false;

  if (note === this.lastNoteHeld) {
    this.justReleased = true;
  }

  this.glidingBetweenNotes = this.notesBeingHeld.length > 1;

  const index = this.notesBeingHeld.indexOf(note);
  this.notesBeingHeld.splice(index, 1);

  // Prevent release from being called if we're switching between notes
  // quickly
  if (this.glidingBetweenNotes) {
    const lastNote = this.notesBeingHeld[this.notesBeingHeld.length - 1];
    this.triggerOnPressCallbacks(lastNote);

    return;
  }

  if (this.onReleaseCallbacks) {
    this.onReleaseCallbacks.forEach(cb => cb(note));
  }
}
