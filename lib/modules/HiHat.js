import ctx from 'audio-context';
import WhiteNoise from './WhiteNoise.js';
import Filter from './Filter.js';
import Envelope from './Envelope.js';
import Gain from './Gain.js';

export default class HiHat
  {
    constructor()
    {
      //Create all "modules" needed in this build
      this.whitenoise = new WhiteNoise();
      this.filter = new Filter();
      this.envelope = new Envelope();
      this.gain = new Gain();

      //Set output module for Synth.connect to work properly
      this.node = this.gain.node;

      //Setting Variables
      let whitenoise = this.whitenoise;
      let filter = this.filter;
      let envelope = this.envelope;
      let gain = this.gain;

      //Connecting modules (WNG>Filter>Gain with Env modulating Gain)
      whitenoise.node.connect(filter.node);
      filter.node.connect(gain.node);

      //Setting default modulation and Default settings
      envelope.modulate(gain.node.gain);
      envelope.setAttack(0.000);
      envelope.setDecay(0.5);
      envelope.setSustain(0);

      gain.setGain(0);

      filter.setFreq(900);
      filter.setFilterType('highpass');
      filter.setQ(2);
    }
  }
