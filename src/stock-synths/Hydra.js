import Synth from '../modules/Synth';
import Mixer from '../modules/Mixer';
import Oscillator from '../modules/Oscillator';
import Filter from '../modules/Filter';
import LFO from '../modules/LFO';
import WhiteNoise from '../modules/WhiteNoise';
import FrequencyAnalyzer from '../modules/FrequencyAnalyzer';

export default class Hydra {
  constructor() {
    this.synth = new Synth();
    this.mixer = new Mixer(6);
    this.osc1 = new Oscillator('OSC 1');
    this.osc2 = new Oscillator('OSC 2');
    this.osc3 = new Oscillator('OSC 3');
    this.osc4 = new Oscillator('OSC 4');
    this.noise = new WhiteNoise();
    this.lfo1 = new LFO('LFO 1');
    this.lfo2 = new LFO('LFO 2');
    this.lfo3 = new LFO('LFO 3');
    this.lfo4 = new LFO('LFO 4');
    this.filter = new Filter();
    this.frequencyAnalyzer = new FrequencyAnalyzer();

    const {
      synth,
      mixer,
      osc1,
      osc2,
      osc3,
      osc4,
      noise,
      lfo1,
      lfo2,
      lfo3,
      lfo4,
      filter,
      frequencyAnalyzer,
    } = this;

    synth.connect(osc1).to(mixer.channel(1));
    synth.connect(osc2).to(mixer.channel(2));
    synth.connect(osc3).to(mixer.channel(3));
    synth.connect(osc4).to(mixer.channel(4));

    synth.connect(noise).to(mixer.channel(5));

    synth
      .connect(mixer)
      .to(filter)
      .to(frequencyAnalyzer)
      .output();

    synth.addModule(lfo1);
    synth.addModule(lfo2);
    synth.addModule(lfo3);
    synth.addModule(lfo4);

    this.turnOffMixer();
  }

  turnOnMixer() {
    this.mixer.gain.setGain(1);
  }

  turnOffMixer() {
    this.mixer.gain.setGain(0);
  }
}
