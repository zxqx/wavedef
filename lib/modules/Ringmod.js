import LFO from './LFO.js';
import Gain from './Gain.js';

export default class Ringmod
{
  constructor()
  {
    //Create
    this.lfo = new LFO();
    this.gain = new Gain();
    this.node = this.gain.node;

    //Define
    let lfo = this.lfo;
    let gain = this.gain;


    //Bootup Defaults
    gain.setGain(1);
    lfo.modulate(gain.node.gain);

  }

  setFrequency(frequency)
  {
    this.lfo.setFrequency(frequency);
  }

  setDepth(depth)
  {
    this.lfo.setDepth(depth);
  }

  setWaveformType(waveform)
  {
    this.lfo.setWaveformType(waveform);
  }

  setGain(gain)
  {
    this.gain.setGain(gain);
  }

}
