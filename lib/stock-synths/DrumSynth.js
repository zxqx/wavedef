import React from 'react';
import Synth from '../modules/Synth.js';
import AudioControlGroup from '../modules/AudioControlGroup.js';
import Slider from '../ui/Slider.js';
import Kick from '../modules/Kick.js';
import WhiteNoise from '../modules/WhiteNoise.js';
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
    this.whitenoise = new WhiteNoise();
    this.mixer = new Mixer();

    let { synth, kick, whitenoise, mixer } = this;

    synth.addModule(kick);
    synth.addModule(whitenoise);
    synth.addModule(mixer);

    synth.connect(kick).to(mixer.ch1);
    synth.connect(whitenoise).to(mixer.ch2);
    synth.connect(mixer).output();

    this._setTestVariablesForConsole();

    setInterval(() => {
      kick.envelope.triggerADS()
      kick.pitchenv.trigger()
    }, 1000);

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
    window.whitenoise = this.whitenoise
  }
}
