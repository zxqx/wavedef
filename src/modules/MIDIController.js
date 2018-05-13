import noteToFrequency from 'note-to-frequency';

const notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function translateMIDIDataToObject(midiData) {
  const noteOnOff = midiData[0];
  const notePitch = midiData[1];
  const noteVelocity = midiData[2];

  const midiDataObject = {};

  if (noteOnOff === 147) {
    midiDataObject.on = true;
  } else if (noteOnOff === 131) {
    midiDataObject.on = false;
  }

  midiDataObject.octave = Math.floor(notePitch / 12);
  midiDataObject.note = notes[notePitch % 12];
  midiDataObject.velocity = noteVelocity;

  return midiDataObject;
}

export default class MIDI {
  constructor() {
    this.midi = null;
    this.inputs = null;
    this.outputs = null;
    this.onPressCallbacks = null;
    this.onReleaseCallbacks = null;

    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess()
        .then(this::this.onMIDISuccess, this::this.onMIDIFailure);
    }
  }

  onMIDISuccess(midiAccess) {
    this.midi = midiAccess;
    this.inputs = midiAccess.inputs;
    this.outputs = midiAccess.outputs;

    midiAccess.onstatechange = () => {
      // handle state change
      console.log('MIDI success'); // eslint-disable-line
    };

    setTimeout(this::this.testOutputs, 500);
  }

  onMIDIFailure() {
    console.log(this, 'handle midi failure'); // eslint-disable-line
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

  stopInputs() {
    console.log(this, 'handle stop inputs'); // eslint-disable-line
  }

  stopOutputs() {
    this.outputs.forEach((port) => {
      port.send([0x80, 60, 0]);
    });

    this.testInputs();
  }
}
