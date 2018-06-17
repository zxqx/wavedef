import Synth from '../modules/Synth';
import Mixer from '../modules/Mixer';
import Oscillator from '../modules/Oscillator';
import VCA from '../modules/VCA';
import Envelope from '../modules/Envelope';
import Filter from '../modules/Filter';
import LFO from '../modules/LFO';
import Overdrive from '../modules/TunaOverdrive';
import Delay from '../modules/Delay';
import Sequencer from '../modules/Sequencer';
import WhiteNoise from '../modules/WhiteNoise';
import ComputerKeyboard from '../modules/ComputerKeyboard';
import MIDIController from '../modules/MIDIController';
import param from '../helpers/param';
import Ringmod from '../modules/Ringmod';
import Chorus from '../modules/Chorus';
import FrequencyAnalyzer from '../modules/FrequencyAnalyzer';

export default class Cyanide {
  constructor() {
    this.synth = new Synth();
    this.mixer = new Mixer(2);
    this.osc = new Oscillator('OSC 1');
    this.vca = new VCA();
    this.volumeEnvelope = new Envelope();
    this.filterEnvelope = new Envelope();
    this.filter = new Filter();
    this.lfo1 = new LFO('LFO 1');
    this.lfo2 = new LFO('LFO 2');
    this.ringmod = new Ringmod();
    this.overdrive = new Overdrive();
    this.delay = new Delay();
    this.chorus = new Chorus();
    this.noise = new WhiteNoise();
    this.sequencer = new Sequencer();
    this.frequencyAnalyzer = new FrequencyAnalyzer();

    this.computerKeyboard = new ComputerKeyboard(2);
    this.midiController = new MIDIController();

    const {
      synth,
      mixer,
      osc,
      vca,
      volumeEnvelope,
      filterEnvelope,
      filter,
      lfo1,
      lfo2,
      overdrive,
      delay,
      sequencer,
      ringmod,
      chorus,
      noise,
      frequencyAnalyzer,
    } = this;

    synth.connect(osc).to(mixer.channel(1));
    synth.connect(noise).to(mixer.channel(2));
    synth
      .connect(mixer)
      .to(vca)
      .to(filter)
      .to(overdrive)
      .to(ringmod)
      .to(delay)
      .to(chorus)
      .to(frequencyAnalyzer)
      .output();

    synth.connect(sequencer).output();

    synth.addModule(lfo1);
    synth.addModule(lfo2);
    synth.addModule(volumeEnvelope);
    synth.addModule(filterEnvelope);

    volumeEnvelope.modulate(vca::param('gain'));
    filterEnvelope.modulate(filter::param('frequency'));
  }

  connectControllers() {
    const {
      computerKeyboard,
      midiController,
      sequencer,
      osc,
      volumeEnvelope,
      filterEnvelope,
    } = this;

    computerKeyboard.triggerOnPress([
      osc::osc.setFrequency,
      volumeEnvelope::volumeEnvelope.triggerADS,
      filterEnvelope::filterEnvelope.triggerADS,
      freq => sequencer.triggerAtSelectedStep(() => {
        osc.setFrequency(freq);
        volumeEnvelope.trigger();
        filterEnvelope.trigger();
      }),
    ]);

    computerKeyboard.triggerOnRelease([
      volumeEnvelope::volumeEnvelope.triggerRelease,
      filterEnvelope::filterEnvelope.triggerRelease,
    ]);

    midiController.triggerOnPress([
      osc::osc.setFrequency,
      volumeEnvelope::volumeEnvelope.triggerADS,
      filterEnvelope::filterEnvelope.triggerADS,
      freq => sequencer.triggerAtSelectedStep(() => {
        osc.setFrequency(freq);
        volumeEnvelope.trigger();
        filterEnvelope.trigger();
      }),
    ]);

    midiController.triggerOnRelease([
      volumeEnvelope::volumeEnvelope.triggerRelease,
      filterEnvelope::filterEnvelope.triggerRelease,
    ]);
  }

  disconnectControllers() {
    this.computerKeyboard.triggerOnPress([]);
    this.midiController.triggerOnPress([]);
    this.sequencer.reset();
    this.sequencer.stop();
  }
}
