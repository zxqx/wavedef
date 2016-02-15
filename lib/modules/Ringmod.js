import LFO from './LFO.js';
import Gain from './Gain.js';

export default class Ringmod
{
  constructor()
  {
    //Create
    this.ringmod = new LFO();
    this.lfo = new LFO();
    this.gain = new Gain();

    this.node = this.gain.node;

    //Define
    let ringmod = this.ringmod;
    let gain = this.gain;
    let lfo = this.lfo


    //Bootup Defaults
    gain.setGain(1);
    ringmod.modulate(gain.node.gain);
    lfo.modulate(ringmod.osc.node.frequency);
    lfo.setDepth(0);
    lfo.setFrequency(100);

  }

  setFrequency(frequency)
  {
    this.ringmod.setFrequency(frequency);
  }

  setDepth(depth)
  {
    this.ringmod.setDepth(depth);
  }

  setWaveformType(waveform)
  {
    this.ringmod.setWaveformType(waveform);
  }

  setGain(gain)
  {
    this.gain.setGain(gain);
  }

  lfoRate(rate)
  {
    this.lfo.setFrequency(rate);
  }

  lfoDepth(depth)
  {
    this.lfo.setDepth(depth);
  }

  setLfoWaveformType(waveform)
  {
    this.lfo.setWaveformType(waveform);
  }
}
