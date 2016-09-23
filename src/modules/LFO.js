import Oscillator from './Oscillator.js';
import Gain from './Gain.js';

export default class LFO
{
  constructor()
  {
    this.osc = new Oscillator();
    this.gain = new Gain();

    let osc = this.osc;
    let gain = this.gain;

    //Set default on creation
    osc.start();
    gain.setGain(1);

    osc.node.connect(gain.node);

  }

  modulate(destination)
  {
    if (!Array.isArray(this.destination)) {
      this.destination = [];
    }

    this.destination.push(destination);
    this.destination.forEach(d => this.gain.node.connect(d));
  }

  setDepth(depth)
  {
    this.gain.setGain(depth);
  }

  setWaveformType(waveform)
  {
    this.osc.setWaveformType(waveform);
  }

  setFrequency(frequency)
  {
    this.osc.setFrequency(frequency);
  }

  getModulate()
  {
    return this.destination;
  }

  bpmSync(bpm, note)
  {
    this.osc.setFrequency(1/((60/bpm)/note));
  }

  getFrequency()
  {
    return this.osc.node.frequency;
  }
}
