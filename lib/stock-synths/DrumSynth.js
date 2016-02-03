import React from 'react';
import Synth from '../modules/Synth.js';
import AudioControlGroup from '../modules/AudioControlGroup.js';
import Slider from '../ui/Slider.js';
import Kick from '../modules/Kick.js';
import HiHat from '../modules/HiHat.js';
import Mixer from'../modules/Mixer.js';

export default class DrumSynth extends React.Component
{
  /**
   * Set up synth and its modules and wire up module connections
   */
  componentWillMount()
  {
    this.kick = new Kick();
    this.synth = new Synth();
    this.hihat = new HiHat();
    this.mixer = new Mixer();

    let { synth, kick, hihat, mixer } = this;

    synth.addModule(kick);
    synth.addModule(hihat);
    synth.addModule(mixer);

    synth.connect(kick).to(mixer.ch1);
    synth.connect(hihat).to(mixer.ch2);
    synth.connect(mixer).output();

    this._setTestVariablesForConsole();

    setInterval(() => {
      kick.envelope.triggerADS()
      kick.pitchenv.trigger()
    }, 1000);

    setInterval(() => {
      hihat.envelope.triggerADS()
    }, 500);

    mixer.ch2.setGain(0.1);

  }

  /**
   * Render synth controls and wire them up to their controlling parameters
   */
  render()
  {
    let { kick } = this;

    return (
      <div>

        <AudioControlGroup label='Kick Envelope'>
          <Slider label='Decay'
            min={0.0001} max={1} step={0.0001} defaultValue={0.5} onInput={kick.envelope::kick.envelope.setDecay} />
        </AudioControlGroup>

        <AudioControlGroup label='Pitch Envelope'>
          <Slider label ='Tune'
          min={50} max={120} step={1} defaultValue={70} onInput={kick.pitchenv::kick.pitchenv.setStart} />
          <Slider label='Attack'
            min={0.0015} max={0.5} step={0.001} defaultValue={0.001} onInput={kick.pitchenv::kick.pitchenv.setAttack} />
          <Slider label='Decay'
            min={0.0015} max={1} step={0.0001} defaultValue={0.5} onInput={kick.pitchenv::kick.pitchenv.setDecay} />
          <Slider label ='Depth -/+'
            min={-50} max={50} step={0.5} defaultValue={0} onInput={kick.pitchenv::kick.pitchenv.setDepth} />
        </AudioControlGroup>


        <AudioControlGroup label='Hi-Hat'>
          <Slider label = 'Volume'
            min={0} max={1} step={0.01} defaultValue={0.1} onInput={mixer.ch2::mixer.ch2.setGain} />
          <Slider label = 'Decay'
            min={0.001} max={0.5} step={0.001} defaultValue={0.05} onInput={hihat.envelope::hihat.envelope.setDecay} />
          <Slider label = 'Filter'
            min={500} max={2000} step={1} defaultValue={900} onInput={hihat.filter::hihat.filter.setFreq} />
          <Slider label = 'Resonance'
            min={0} max={5} step={0.01} defaultValue={0} onInput={hihat.filter::hihat.filter.setQ} />
        </AudioControlGroup>
      </div>
    )
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
  }
}
