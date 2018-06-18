import {
  triggerOnPressCallbacks,
  triggerOnReleaseCallbacks,
} from '../helpers/keyboardTracking';

const notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function translateMIDIDataToObject([onOff, pitch, velocity]) {
  return {
    on: onOff >= 144 && onOff <= 159,
    octave: Math.floor(pitch / 12),
    note: notes[pitch % 12],
    velocity,
  };
}

export default class MIDI {
  constructor() {
    this.midi = null;
    this.inputs = null;
    this.outputs = null;
    this.onPressCallbacks = null;
    this.onReleaseCallbacks = null;

    this.requestMIDIAccess();

    this.triggerOnPressCallbacks = this::triggerOnPressCallbacks;
    this.triggerOnReleaseCallbacks = this::triggerOnReleaseCallbacks;
  }

  async requestMIDIAccess() {
    if (navigator.requestMIDIAccess) {
      try {
        const midiAccess = await navigator.requestMIDIAccess();
        return this.onMIDISuccess(midiAccess);
      } catch (e) {
        return this.onMIDIFailure(e);
      }
    }

    return false;
  }

  onMIDISuccess(midiAccess) {
    this.midi = midiAccess;
    this.inputs = midiAccess.inputs;
    this.outputs = midiAccess.outputs;

    // TODO - communicate state change to user
    midiAccess.onstatechange = () => {};

    setTimeout(this::this.testOutputs, 0);
  }

  // eslint-disable-next-line
  onMIDIFailure(error) {
    // TODO - handle midi failure
  }

  triggerOnPress(callbacks) {
    this.onPressCallbacks = callbacks;
  }

  triggerOnRelease(callbacks) {
    this.onReleaseCallbacks = callbacks;
  }

  testInputs() {
    this.inputs.forEach((port) => {
      port.onmidimessage = this::this.onMidiIn;
    });

    setTimeout(this::this.stopInputs, 0);
  }

  testOutputs() {
    this.outputs.forEach((port) => {
      port.open();
      port.send([0x90, 60, 0x7f]);
    });

    setTimeout(this::this.stopOutputs, 0);
  }

  onMidiIn(e) {
    const { note, octave, on } = translateMIDIDataToObject(e.data);

    if (on) {
      this.triggerOnPressCallbacks(`${note}${octave}`);
    } else {
      this.triggerOnReleaseCallbacks(`${note}${octave}`);
    }
  }

  // eslint-disable-next-line
  stopInputs() {
    // TODO - Handle stop inputs
  }

  stopOutputs() {
    this.outputs.forEach((port) => {
      port.send([0x80, 60, 0]);
    });

    this.testInputs();
  }
}
