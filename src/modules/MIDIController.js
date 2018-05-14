import noteToFrequency from 'note-to-frequency';

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
  }

  async requestMIDIAccess() {
    if (navigator.requestMIDIAccess) {
      try {
        const midiAccess = await navigator.requestMIDIAccess();
        this.onMIDISuccess(midiAccess);
      } catch (e) {
        this.onMIDIFailure(e);
      }
    }
  }

  onMIDISuccess(midiAccess) {
    this.midi = midiAccess;
    this.inputs = midiAccess.inputs;
    this.outputs = midiAccess.outputs;

    // TODO - communicate state change to user
    midiAccess.onstatechange = () => {};

    setTimeout(this::this.testOutputs, 500);
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

    setTimeout(this::this.stopInputs, 5000);
  }

  testOutputs() {
    this.outputs.forEach((port) => {
      port.open();
      port.send([0x90, 60, 0x7f]);
    });

    setTimeout(this::this.stopOutputs, 1000);
  }

  onMidiIn(e) {
    const midiDataObject = translateMIDIDataToObject(e.data);

    if (midiDataObject.on && this.onPressCallbacks) {
      const freq = noteToFrequency(midiDataObject.note + midiDataObject.octave);
      return this.onPressCallbacks.forEach(callback => callback(freq));
    }

    if (!midiDataObject.on && this.onReleaseCallbacks) {
      const freq = noteToFrequency(midiDataObject.note + midiDataObject.octave);
      return this.onReleaseCallbacks.forEach(callback => callback(freq));
    }

    return false;
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
