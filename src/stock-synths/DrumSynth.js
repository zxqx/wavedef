import Synth from '../modules/Synth.js';
import Kick from '../modules/Kick.js';
import HiHat from '../modules/HiHat.js';
import Mixer from'../modules/Mixer.js';
import Snare from '../modules/Snare.js';
import Cymbal from '../modules/Cymbal.js';

export default class DrumSynth {
  /**
   * Set up synth and its modules and wire up module connections
   */
  constructor() {
    this.kick = new Kick();
    this.synth = new Synth();
    this.hihat = new HiHat();
    this.mixer = new Mixer(3);
    this.snare = new Snare();
    this.cymbal = new Cymbal();

    const { synth, kick, hihat, mixer, snare, cymbal } = this;

    synth.addModule(kick);
    synth.addModule(hihat);
    synth.addModule(mixer);
    synth.addModule(snare);
    synth.addModule(cymbal);

    synth.connect(kick).to(mixer.ch1);
    synth.connect(hihat).to(mixer.ch2);
    synth.connect(snare).to(mixer.ch3);
    synth.connect(mixer).output();

    mixer.ch1.toggleOn();
    mixer.ch2.toggleOn();
    mixer.ch3.toggleOn();

    setInterval(() => {
      kick.envelope.triggerADS();
      kick.pitchenv.trigger();
    }, 1000);

    setInterval(() => {
      hihat.envelope.triggerADS();
    }, 250);

    setInterval(() => {
      cymbal.trigger();
    }, 1500);
  }
}
