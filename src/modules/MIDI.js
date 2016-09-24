import notesToFrequencies from 'notes-to-frequencies';

const notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default class MIDI {
  constructor() {
    this.midi = null;
    this.inputs = null;
    this.outputs = null;
    this.callback = null;

    navigator.requestMIDIAccess()
      .then(this::this.onMIDISuccess, this::this.onMIDIFailure);
  }

  onMIDISuccess(midiAccess) {
    this.midi = midiAccess;
    this.inputs = midiAccess.inputs;
    this.outputs = midiAccess.outputs;

    midiAccess.onstatechange = () => {
      // handle state change
    };

    setTimeout(this::this.testOutputs, 500);
  }

  onMIDIFailure() {
    // handle midi failure
  }

  trigger(callback) {
    this.callback = callback;
  }

  testInputs() {
    this.inputs.forEach(port => {
      port.onmidimessage = this::this.onMidiIn;
    });
    setTimeout(this::this.stopInputs, 5000);
  }

  testOutputs() {
    this.outputs.forEach(port => {
      port.open();
      port.send([0x90, 60, 0x7f]);
    });
    setTimeout(this::this.stopOutputs, 1000);
  }

  onMidiIn(e) {
    const midiDataObject = this.translateMIDIDataToObject(e.data);

    if (this.callback) {
      const freq = notesToFrequencies(midiDataObject.note + midiDataObject.octave);
      return this.callback(freq);
    }
  }

  translateMIDIDataToObject(midiData) {
    const noteOnOff = midiData[0];
    const notePitch = midiData[1];
    const noteVelocity = midiData[2];

    const midiDataObject = {};

    if (noteOnOff === 147) {
      midiDataObject.on = true;
    }
    else if (noteOnOff === 131) {
      midiDataObject.on = false;
    }

    midiDataObject.octave = Math.floor(notePitch / 12);
    midiDataObject.note = notes[notePitch % 12];
    midiDataObject.velocity = noteVelocity;

    return midiDataObject;
  }

  stopInputs() {
    // handle stop inputs
  }

  stopOutputs() {
    this.outputs.forEach(port => {
      port.send([0x80, 60, 0]);
    });

    this.testInputs();
  }
}
