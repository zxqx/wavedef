import Synth from '../modules/Synth.js';
import MIDI from '../modules/MIDI.js';
import Oscillator from '../modules/Oscillator.js';
import Filter from '../modules/Filter.js';
import Mixer from '../modules/Mixer.js';
import VCA from '../modules/VCA.js';
import Envelope from '../modules/Envelope.js';
import LFO from '../modules/LFO.js';
import Convolver from '../modules/Convolver.js';

export default class ThreeOscSynth
{
  constructor()
  {
    this.synth = new Synth();
    this.midi = new MIDI();
    this.osc1 = new Oscillator();
    this.osc2 = new Oscillator();
    this.osc3 = new Oscillator();
    this.filter = new Filter();
    this.mixer = new Mixer();
    this.vca = new VCA();
    this.envelope = new Envelope();
    this.lfo = new LFO();
    this.convolver = new Convolver();

    let { synth, midi, osc1, osc2, osc3, filter, mixer, vca, envelope, lfo, convolver } = this;

    synth.addModule(osc1);
    synth.addModule(osc2);
    synth.addModule(osc3);
    synth.addModule(filter);
    synth.addModule(mixer);
    synth.addModule(vca);
    synth.addModule(convolver);

    synth.connect(osc1).to(mixer.ch1);
    synth.connect(osc2).to(mixer.ch2);
    synth.connect(osc3).to(mixer.ch3);
    synth.connect(mixer).to(vca).to(filter).to(convolver).output();

    convolver.setBufferFile('./impulse-responses/seths-amp.wav');

    mixer.children.forEach(g => g.setGain(0));
    osc1.start();
    osc2.start();
    osc3.start();

    envelope.modulate(vca.node.gain);
    lfo.modulate(osc1.node.frequency);

    midi.trigger(osc1::osc1.setFrequency);

    this._setTestVariablesForConsole();
  }

  /**
   * Hang our shit off of `window` so we can dick around in console
   * @private
   */
  _setTestVariablesForConsole()
  {
    window.synth = this.synth;
    window.midi = this.midi;
    window.osc1 = this.osc1;
    window.osc2 = this.osc2;
    window.osc3 = this.osc3;
    window.filter = this.filter;
    window.mixer = this.mixer;
    window.vca = this.vca;
    window.envelope = this.envelope;
    window.lfo = this.lfo;
    window.convolver = this.convolver;
  }
}
