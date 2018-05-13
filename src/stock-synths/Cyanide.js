import Synth from '../modules/Synth';
import Mixer from '../modules/Mixer';
import Oscillator from '../modules/Oscillator';
import VCA from '../modules/VCA';
import Envelope from '../modules/Envelope';
import Filter from '../modules/Filter';
import LFO from '../modules/LFO';
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
    this.lfo = new LFO();

    this.computerKeyboard = new ComputerKeyboard(3);
    this.midiController = new MIDIController();

    const {
      synth,
      mixer,
      osc,
      vca,
      volumeEnvelope,
      filter,
      computerKeyboard,
      midiController,
    } = this;

    synth.connect(osc).to(mixer.channel(1));
    synth.connect(mixer).to(vca).to(filter).output();

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
