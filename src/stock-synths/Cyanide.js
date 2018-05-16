import Synth from '../modules/Synth';
import Mixer from '../modules/Mixer';
import Oscillator from '../modules/Oscillator';
import VCA from '../modules/VCA';
import Envelope from '../modules/Envelope';
import Filter from '../modules/Filter';
import LFO from '../modules/LFO';
import Phaser from '../modules/TunaPhaser';
import Overdrive from '../modules/TunaOverdrive';
import Delay from '../modules/Delay';
import ComputerKeyboard from '../modules/ComputerKeyboard';
import MIDIController from '../modules/MIDIController';
import param from '../helpers/param';

export default class Cyanide {
  constructor() {
    this.synth = new Synth();
    this.mixer = new Mixer(1);
    this.osc = new Oscillator('OSC 1');
    this.vca = new VCA();
    this.volumeEnvelope = new Envelope();
    this.filter = new Filter();
    this.lfo1 = new LFO('LFO 1');
    this.lfo2 = new LFO('LFO 2');
    this.overdrive = new Overdrive();
    this.phaser = new Phaser();
    this.delay = new Delay();

    this.computerKeyboard = new ComputerKeyboard(2);
    this.midiController = new MIDIController();

    const {
      synth,
      mixer,
      osc,
      vca,
      volumeEnvelope,
      filter,
      lfo1,
      lfo2,
      overdrive,
      phaser,
      delay,
      computerKeyboard,
      midiController,
    } = this;

    synth.connect(osc).to(mixer.channel(1));

    synth
      .connect(mixer)
      .to(vca)
      .to(filter)
      .to(overdrive)
      .to(phaser)
      .to(delay)
      .output();

    synth.addModule(lfo1);
    synth.addModule(lfo2);

    volumeEnvelope.modulate(vca::param('gain'));

    computerKeyboard.triggerOnPress([
      osc::osc.setFrequency,
      volumeEnvelope::volumeEnvelope.triggerADS,
    ]);

    computerKeyboard.triggerOnRelease([
      volumeEnvelope::volumeEnvelope.triggerRelease,
    ]);

    midiController.triggerOnPress([
      osc::osc.setFrequency,
      volumeEnvelope::volumeEnvelope.triggerADS,
    ]);

    midiController.triggerOnRelease([
      volumeEnvelope::volumeEnvelope.triggerRelease,
    ]);
  }
}
