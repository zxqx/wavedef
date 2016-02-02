import React from 'react';
import Synth from '../modules/Synth.js';
import Kick from '../modules/KickDrum.js';
import AudioControlGroup from '../modules/AudioControlGroup.js';
import Slider from '../ui/Slider.js';

export default class DrumSynth extends React.Component
{
  /**
   * Set up synth and its modules and wire up module connections
   */
  componentWillMount()
  {
    this.synth = new Synth();
    this.kick = new Kick();

    let { synth, kick} = this;

    synth.addModule(kick);
    synth.connect(kick).output();

    this._setTestVariablesForConsole();

    // fake sequencer
    setInterval(() => kick.envelope.triggerADS(), 1000);
  }

  /**
   * Render synth controls and wire them up to their controlling parameters
   */
  render()
  {
    let { kick } = this;

    return (
      <AudioControlGroup label='Kick Envelope'>
        <Slider label='Attack'
          min={0.0001} max={0.5} step={0.001} defaultValue={0.001} onInput={kick.envelope::kick.envelope.setAttack} />
        <Slider label='Decay'
          min={0.0001} max={1} step={0.0001} defaultValue={0.5} onInput={kick.envelope::kick.envelope.setDecay} />
      </AudioControlGroup>
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
  }
}
