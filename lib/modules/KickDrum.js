import ctx from 'audio-context';
import Oscillator from './Oscillator.js';
import Filter from './Filter.js';
import Envelope from './Envelope.js';
import Gain from './Gain.js';

export default class Kick
  {
    constructor()
    {

      this.osc = new Oscillator();
      this.filter = new Filter();
      this.gain = new Gain();
      this.envelope = new Envelope();

      this.node = this.gain.node;


      //setting variables
      let osc = this.osc;
      let filter = this.filter;
      let gain = this.gain;
      let envelope = this.envelope;

      //Connect all modules

      osc.node.connect(filter.node);
      filter.node.connect(gain.node);


      envelope.modulate(gain.node.gain);

      osc.setFrequency(80);
      osc.start();
      filter.setFreq(100);
      filter.setFilterType('lowpass');
      gain.setGain(0);
      envelope.setAttack(0.5);
      envelope.setDecay(1);
      envelope.setSustain(0);

    }
  }
