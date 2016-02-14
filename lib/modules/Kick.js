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
      this.pitchenv = new Envelope();

      this.node = this.gain.node;


      //Setting Variables
      let osc = this.osc;
      let filter = this.filter;
      let gain = this.gain;
      let envelope = this.envelope;
      let pitchenv = this.pitchenv;

      //Connect all modules

      osc.node.connect(filter.node);
      filter.node.connect(gain.node);

      //Set envelope destination == Amp Envelope
      envelope.modulate(gain.node.gain);
      pitchenv.modulate(osc.node.frequency);

      //Settin Defaults on startup
      osc.setFrequency(80);
      osc.start();

      filter.setFrequency(100);
      filter.setQ(2);
      filter.setFilterType('lowpass');

      gain.setGain(0);

      envelope.setAttack(0.018);
      envelope.setDecay(1);
      envelope.setSustain(0);

      pitchenv.setStart(65);
      pitchenv.setDepth(50);
      pitchenv.setAttack(0.015);
      pitchenv.setDecay(0.25);
      pitchenv.setSustain(65);

    }

  }
