import Oscillator from './Oscillator.js';
import Filter from './Filter.js';
import Envelope from './Envelope.js';
import Gain from './Gain.js';
import WhiteNoise from './WhiteNoise.js';

export default class Snare {
  constructor() {
    this.osc1 = new Oscillator();
    this.osc2 = new Oscillator();
    this.amp1 = new Gain();
    this.amp2 = new Gain();
    this.amp3 = new Gain();
    this.amp4 = new Gain();
    this.env1 = new Envelope();
    this.env2 = new Envelope();
    this.env3 = new Envelope();
    this.env4 = new Envelope();
    this.filter1 = new Filter();
    this.filter2 = new Filter();
    this.whitenoise = new WhiteNoise();
    this.ch1 = new Gain();
    this.ch2 = new Gain();
    this.ch3 = new Gain();
    this.ch4 = new Gain();
    this.gain = new Gain();

    const osc1 = this.osc1;
    const osc2 = this.osc2;
    const amp1 = this.amp1;
    const amp2 = this.amp2;
    const amp3 = this.amp3;
    const amp4 = this.amp4;
    const env1 = this.env1;
    const env2 = this.env2;
    const env3 = this.env3;
    const env4 = this.env4;
    const ch1 = this.ch1;
    const ch2 = this.ch2;
    const ch3 = this.ch3;
    const ch4 = this.ch4;

    const filter1 = this.filter1;
    const filter2 = this.filter2;
    const whitenoise = this.whitenoise;
    const gain = this.gain;

    this.node = this.gain.node;

    osc1.node.connect(amp1.node);
    amp1.node.connect(ch1.node);

    osc2.node.connect(amp2.node);
    amp2.node.connect(ch2.node);

    whitenoise.node.connect(filter1.node);
    filter1.node.connect(filter2.node);
    filter1.node.connect(amp3.node);
    filter2.node.connect(amp4.node);
    amp4.node.connect(ch3.node);
    amp3.node.connect(ch4.node);
    ch1.node.connect(gain.node);
    ch2.node.connect(gain.node);
    ch3.node.connect(gain.node);
    ch4.node.connect(gain.node);

    // setup envelope default modulation destinations and sets gain @ 0 until triggered
    env1.modulate(amp1.node.gain);
    env2.modulate(amp2.node.gain);
    env3.modulate(amp3.node.gain);
    env4.modulate(amp4.node.gain);

    amp1.setGain(0);
    amp2.setGain(0);
    amp3.setGain(0);
    amp4.setGain(0);

    // setup default parameters for 909 "type" sound... hopefully
    env1.setAttack(0.0005);
    env1.setDecay(0.055);
    env1.setSustain(0);

    env2.setAttack(0.0005);
    env2.setDecay(0.075);
    env2.setSustain(0);

    env3.setAttack(0.0005);
    env3.setDecay(0.4);
    env3.setSustain(0);

    env4.setAttack(0.0005);
    env4.setDecay(0.283);
    env4.setSustain(0);

    osc1.setWaveformType('triangle');
    osc1.setFrequency(330);
    osc1.start();

    osc2.setWaveformType('triangle');
    osc2.setFrequency(185);
    osc2.start();

    filter1.setFilterType('lowpass');
    filter1.setFrequency(7500);

    filter2.setFilterType('highpass');
    filter2.setFrequency(523);
  }

  trigger() {
    this.env1.triggerADS();
    this.env2.triggerADS();
    this.env3.triggerADS();
    this.env4.triggerADS();
  }
}
