import FM from './FM.js';
import Gain from './Gain.js';
import Filter from './Filter.js';
import Envelope from './Envelope.js';

export default class Cymbal
{
  constructor()
  {
    //Create the beast!
    this.output = new Gain();
    this.fm1 = new FM();
    this.fm2 = new FM();
    this.fm3 = new FM();
    this.mixer = new Gain();
    this.bpFilter = new Filter();
    this.hpFilter = new Filter();
    this.bpEnv = new Envelope();
    this.hpEnv = new Envelope();
    this.ampEnv = new Envelope();
    this.bpGain = new Gain();
    this.hpGain = new Gain();

    //Define node for synth connect
    this.node = this.output.node;

    this._connect();
    this._bootOscDefaults();
    this._bootFilterDefaults();
    this._bootAmpDefaults();
    this._setupEnvelopeDefaults();
  }

  _connect()
  {

    //Create Shorthand
    let { output, fm1, fm2, fm3, mixer, bpFilter, hpFilter, bpEnv, hpEnv, ampEnv, bpGain, hpGain } = this;

    //Connect the module
    //Audio Route
    fm1.node.connect(mixer.node);
    fm2.node.connect(mixer.node);
    fm3.node.connect(mixer.node);

    mixer.node.connect(bpFilter.node);
    mixer.node.connect(hpFilter.node);

    bpFilter.node.connect(bpGain.node);
    hpFilter.node.connect(hpGain.node);

    bpGain.node.connect(output.node);
    hpGain.node.connect(output.node);


    //Modulation
    bpEnv.modulate(bpFilter.node.frequency);
    hpEnv.modulate(hpFilter.node.frequency);
    ampEnv.modulate(output.node.gain);

  }

  _bootOscDefaults()
  {
    //FM1
    this.fm1.setCarrierFrequency(1481);
    this.fm1.setModulatorFrequency(1047);
    this.fm1.setModulationDepth(1000);
    this.fm1.setCarrierWaveformType('square');
    this.fm1.setModulatorWaveformType('square');


    //FM2
    this.fm2.setCarrierFrequency(1049);
    this.fm2.setModulatorFrequency(1109);
    this.fm2.setModulationDepth(1000);
    this.fm2.setCarrierWaveformType('square');
    this.fm2.setModulatorWaveformType('square');

    //FM3
    this.fm3.setCarrierFrequency(1480);
    this.fm3.setModulatorFrequency(1175);
    this.fm3.setModulationDepth(1000);
    this.fm3.setCarrierWaveformType('sawtooth');
    this.fm3.setModulatorWaveformType('sawtooth');

  }

  _bootFilterDefaults()
  {

    //Bandpass Filter
    this.bpFilter.setFilterType('bandpass');
    this.bpFilter.setFrequency(1050);

    //Highpass Filter
    this.hpFilter.setFilterType('highpass');
    this.hpFilter.setFrequency(2490);

  }

  _bootAmpDefaults()
  {
    //Osc Mixer/Summing
    this.mixer.setGain(1)

    //Filter Levels
    this.bpGain.setGain(0.6);
    this.hpGain.setGain(1);

    //Output Summing
    this.output.setGain(0);


  }

  _setupEnvelopeDefaults()
  {
    //Bandpass Envelope
    this.bpEnv.setStart(1050);
    this.bpEnv.setDepth(-200);
    this.bpEnv.setAttack(0.0005);
    this.bpEnv.setDecay(0.075);


    //Highpass Envelope
    this.hpEnv.setStart(2490);
    this.hpEnv.setDepth(-1000);
    this.hpEnv.setAttack(0.026);
    this.hpEnv.setDecay(3.7);

    //Amp Envelope
    this.ampEnv.setStart(0);
    this.ampEnv.setDepth(1);
    this.ampEnv.setAttack(0.0005);
    this.ampEnv.setDecay(2.3);

  }

  trigger()
  {
    this.bpEnv.trigger();
    this.hpEnv.trigger();
    this.ampEnv.trigger();
  }

  setFm1ModulationDepth(depth)
  {
    this.fm1.setModulationDepth(depth);
  }

  setFm2ModulationDepth(depth)
  {
    this.fm2.setModulationDepth(depth);
  }

  setFm3ModulationDepth(depth)
  {
    this.fm3.setModulationDepth(depth);
  }

  getFm1ModulationDepth()
  {
    return this.fm1.getModulationDepth();
  }

  getFm2ModulationDepth()
  {
    return this.fm2.getModulationDepth();
  }

  getFm3ModulationDepth()
  {
    return this.fm3.getModulationDepth();
  }
}
