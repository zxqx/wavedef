import Oscillator from './Oscillator.js';
import Gain from './Gain.js';

export default class FM
{
  constructor()
  {
    this.carrier = new Oscillator();
    this.modulator = new Oscillator();
    this.gain = new Gain();
    this.output = new Gain();

    this.node = this.output.node;


    this._connect();
    this._bootDefaults();

  }

  _connect()
  {
    let carrier = this.carrier;
    let modulator = this.modulator;
    let gain = this.gain;
    let output = this.output;

    modulator.node.connect(gain.node);
    gain.node.connect(carrier.node.frequency);
    carrier.node.connect(output.node);
  }

  _bootDefaults()
  {
    this.carrier.start()
    this.carrier.setFrequency(200);

    this.modulator.start()
    this.modulator.setFrequency(2);

    this.setBothWaveforms('sine','sine');

    this.gain.setGain(40);
    this.output.setGain(1)
  }

  setCarrierWaveformType(waveform)
  {
    this.carrier.setWaveformType(waveform);
  }

  setModulatorWaveformType(waveform)
  {
    this.modulator.setWaveformType(waveform);
  }

  setModulationDepth(depth)
  {
    this.gain.setGain(depth);
  }

  setCarrierFrequency(frequency)
  {
    this.carrier.setFrequency(frequency);
  }

  setModulatorFrequency(frequency)
  {
    this.modulator.setFrequency(frequency);
  }

}
