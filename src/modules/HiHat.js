import WhiteNoise from './WhiteNoise.js';
import Filter from './Filter.js';
import Envelope from './Envelope.js';
import Gain from './Gain.js';

export default class HiHat {
  constructor() {
    this.whitenoise = new WhiteNoise();
    this.filter = new Filter();
    this.envelope = new Envelope();
    this.gain = new Gain();

    this.node = this.gain.node;

    const whitenoise = this.whitenoise;
    const filter = this.filter;
    const envelope = this.envelope;
    const gain = this.gain;

    whitenoise.node.connect(filter.node);
    filter.node.connect(gain.node);

    envelope.modulate(gain.node.gain);
    envelope.setAttack(0.000);
    envelope.setDecay(0.5);
    envelope.setSustain(0);

    gain.setGain(0);

    filter.setFrequency(900);
    filter.setFilterType('highpass');
    filter.setQ(2);
  }
}
