import Synth from '../modules/Synth.js';
import MIDI from '../modules/MIDI.js';
import OscillatorGroup from '../modules/OscillatorGroup.js';
import Filter from '../modules/Filter.js';
import Mixer from '../modules/Mixer.js';
import VCA from '../modules/VCA.js';
import Envelope from '../modules/Envelope.js';
import LFO from '../modules/LFO.js';
import Convolver from '../modules/Convolver.js';
import Delay from '../modules/Delay.js';
import EQ3 from '../modules/EQ3.js';
import ComputerKeyboard from '../modules/ComputerKeyboard.js';
import FrequencyAnalyzer from '../modules/FrequencyAnalyzer.js';
import Ringmod from '../modules/Ringmod.js';
import Chorus from '../modules/Chorus.js';
import Panner from '../modules/Panner.js';

export default class ThreeOscSynth
{
  constructor()
  {
    this.synth = new Synth();
    this.midi = new MIDI();
    this.oscGroup = new OscillatorGroup(3);
    this.filter = new Filter();
    this.mixer = new Mixer(3);
    this.vca = new VCA();
    this.envelope = new Envelope();
    this.lfo = new LFO();
    this.convolver = new Convolver();
    this.delay = new Delay();
    this.eq3 = new EQ3();
    this.computerKeyboard = new ComputerKeyboard(3);
    this.frequencyAnalyzer = new FrequencyAnalyzer();
    this.ringmod = new Ringmod();
    this.chorus = new Chorus();
    this.panner = new Panner();

    let { synth, midi, oscGroup, filter, mixer, vca, envelope, lfo, convolver, delay, eq3, computerKeyboard, frequencyAnalyzer, ringmod, chorus, panner } = this;
    let { osc1, osc2, osc3 } = oscGroup;

    synth.addModule(oscGroup);
    synth.addModule(filter);
    synth.addModule(mixer);
    synth.addModule(vca);
    synth.addModule(convolver);
    synth.addModule(delay);
    synth.addModule(eq3);
    synth.addModule(ringmod);
    synth.addModule(frequencyAnalyzer);
    synth.addModule(chorus);
    synth.addModule(panner);

    synth.connect(osc1).to(mixer.ch1);
    synth.connect(osc2).to(mixer.ch2);
    synth.connect(osc3).to(mixer.ch3);
    synth.connect(mixer).to(vca).to(filter).to(ringmod).to(delay).to(convolver).to(eq3).to(chorus).to(panner).to(frequencyAnalyzer).output();

    convolver.setBufferAsFile('./impulse-responses/seths-amp.wav');

    oscGroup.startAll();

    envelope.modulate(vca.node.gain);

    //lfo.modulate(osc1.getFrequencyParam());
    //lfo.modulate(osc2.getFrequencyParam());
    //lfo.modulate(osc3.getFrequencyParam());
    //lfo.modulate(filter.node.frequency);

    computerKeyboard.triggerOnPress([
      osc1::osc1.setFrequency,
      envelope::envelope.triggerADS
    ]);

    computerKeyboard.triggerOnRelease([
      envelope::envelope.triggerRelease
    ]);

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
    window.oscGroup = this.oscGroup;
    window.filter = this.filter;
    window.mixer = this.mixer;
    window.vca = this.vca;
    window.envelope = this.envelope;
    window.lfo = this.lfo;
    window.convolver = this.convolver;
    window.delay = this.delay;
    window.eq3 = this.eq3;
    window.ringmod = this.ringmod;
    window.chorus = this.chorus;
    window.panner = this.panner;
  }
}
