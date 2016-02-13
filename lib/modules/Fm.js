import ctx from 'audio-context';
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


    let carrier = this.carrier;
    let modulator = this.modulator;
    let gain = this.gain;
    let output = this.output;

    this.node = this.output.node;

    modulator.node.connect(gain.node);
    gain.node.connect(carrier.node.frequency);
    carrier.node.connect(output.node);

    //defaults
    carrier.start()
    carrier.setWaveformType('sine');
    carrier.setFrequency(200);

    modulator.start()
    modulator.setWaveformType('sine');
    modulator.setFrequency(2);

    gain.setGain(40);
    output.setGain(1)
  }
}
