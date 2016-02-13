import Synth from '../modules/Synth.js';
import OscillatorGroup from '../modules/OscillatorGroup.js';

export default class OscillatorGroupSynth
{
  constructor()
  {
    this.synth = new Synth();
    this.oscGroup = new OscillatorGroup(3);

    let { synth, oscGroup } = this;
    let { osc1, osc2, osc3 } = oscGroup;

    synth.addModule(oscGroup);
    synth.connect(oscGroup).output();

    oscGroup.startAll();
    window.oscGroup = oscGroup;
  }
}

