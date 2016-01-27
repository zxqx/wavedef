import notesToFrequencies from 'notes-to-frequencies';

const notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default class MIDI
{
  constructor()
  {
    this.midi = null;
    this.inputs = null;
    this.outputs = null;
    this.callback = null;

    navigator.requestMIDIAccess()
      .then(this::this.onMIDISuccess, this::this.onMIDIFailure);
  }

  onMIDISuccess(midiAccess)
  {
    this.midi = midiAccess;
    this.inputs = midiAccess.inputs;
    this.outputs = midiAccess.outputs;

    midiAccess.onstatechange = () => {
      console.log('state changed');
    }

    setTimeout(this::this.testOutputs, 500);
  }

  onMIDIFailure(msg)
  {
    console.log('Failed to get MIDI access - ' + msg);
  }

  trigger(callback)
  {
    this.callback = callback;
  }

  testInputs()
  {
    console.log('Testing MIDI-In ports...');
    this.inputs.forEach(port => {
      console.log('id:', port.id, 'manufacturer:', port.manufacturer, 'name:', port.name, 'version:', port.version);
      port.onmidimessage = this::this.onMidiIn;
    });
    setTimeout(this::this.stopInputs, 5000);
  }

  testOutputs()
  {
    console.log('Testing MIDI-Out ports...');
    this.outputs.forEach(port => {
      console.log('id:', port.id, 'manufacturer:', port.manufacturer, 'name:', port.name, 'version:', port.version);
      port.open();
      port.send([0x90, 60, 0x7f]);
    });
    setTimeout(this::this.stopOutputs, 1000);
  }

  onMidiIn(e)
  {
    let midiDataObject = this.translateMIDIDataToObject(e.data);
    console.log(this.callback);

    if (this.callback) {
      let freq = notesToFrequencies(midiDataObject.note + midiDataObject.octave);
      return this.callback(freq);
    }
  }

  translateMIDIDataToObject(midiData)
  {
    let noteOnOff = midiData[0];
    let notePitch = midiData[1];
    let noteVelocity = midiData[2];

    let midiDataObject = {};

    if (noteOnOff === 147) {
      midiDataObject.on = true;
    }
    else if (noteOnOff === 131) {
      midiDataObject.on = false;
    }

    midiDataObject.octave = Math.floor(notePitch / 12);
    midiDataObject.note = notes[notePitch % 12];
    midiDataObject.velocity = noteVelocity;

    console.log(midiDataObject);

    return midiDataObject;
  }

  stopInputs()
  {
    console.log('stop inputs');
  }

  stopOutputs()
  {
    this.outputs.forEach(function(port){
      port.send([0x80, 60, 0]);
    });

    this.testInputs();
  }
}
