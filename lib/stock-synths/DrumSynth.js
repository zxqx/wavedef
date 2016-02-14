import Synth from '../modules/Synth.js';
import Kick from '../modules/Kick.js';
import HiHat from '../modules/HiHat.js';
import Mixer from'../modules/Mixer.js';
import Stereo from '../modules/Stereo.js';
import Snare from '../modules/Snare.js';

export default class DrumSynth
{
  /**
   * Set up synth and its modules and wire up module connections
   */
  constructor()
  {
    this.kick = new Kick();
    this.synth = new Synth();
    this.hihat = new HiHat();
    this.mixer = new Mixer(3);
    this.snare = new Snare();

    let { synth, kick, hihat, mixer, stereo, snare } = this;

    synth.addModule(kick);
    synth.addModule(hihat);
    synth.addModule(mixer);
    synth.addModule(snare);

    synth.connect(kick).to(mixer.ch1);
    synth.connect(hihat).to(mixer.ch2);
    synth.connect(snare).to(mixer.ch3);
    synth.connect(mixer).output();

    mixer.ch1.toggleOn();
    mixer.ch2.toggleOn();
    mixer.ch3.toggleOn();

    this._setTestVariablesForConsole();

    setInterval(() => {
      kick.envelope.triggerADS();
      kick.pitchenv.trigger();
    }, 1000);

    setInterval(() => {
      hihat.envelope.triggerADS();
    }, 250);

    setInterval(() => {
      snare.trigger();
    }, 1500);
  }

  /**
   * Hang our shit off of `window` so we can dick around in console
   * @private
   */
  _setTestVariablesForConsole()
  {
    window.synth = this.synth;
    window.kick = this.kick;
    window.hihat = this.hihat;
    window.mixer = this.mixer;
    window.stereo = this.stereo;
    window.snare = this.snare;
  }
}
