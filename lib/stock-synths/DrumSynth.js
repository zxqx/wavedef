import React from 'react';
import Synth from '../modules/Synth.js';
import MIDI from '../modules/MIDI.js';
import Oscillator from '../modules/Oscillator.js';
import Filter from '../modules/Filter.js';
import Mixer from '../modules/Mixer.js';
import VCA from '../modules/VCA.js';
import Envelope from '../modules/Envelope.js';
import AudioControlGroup from '../modules/AudioControlGroup.js';
import Slider from '../ui/Slider.js';
import Switch from '../ui/Switch.js';
import Keyboard from '../ui/Keyboard.js';
import Kick from '../modules/KickDrum.js';

export default class DrumSynth extends React.Component
{
  /**
   * Set up synth and its modules and wire up module connections
   */
  componentWillMount()
  {
    this.synth = new Synth();
    this.osc1 = new Oscillator();
    this.filter = new Filter();
    this.mixer = new Mixer();
    this.vca = new VCA();
    this.envelope = new Envelope();
    this.filterEnv = new Envelope();
    this.drumEnv = new Envelope();
    this.kick = new Kick();

    let { synth, midi, osc1, osc2, osc3, filter, mixer, vca, envelope, drumEnv, filterEnv, kick} = this;

    //synth.addModule(osc1);
    //synth.addModule(filter);
    //synth.addModule(mixer);
    //synth.addModule(vca);
    synth.addModule(kick);


    //synth.connect(osc1).to(mixer.ch1);
    //synth.connect(mixer).to(vca);
    //synth.connect(vca).to(filter);
    //synth.connect(filter).output();
    synth.connect(kick).output();


    //midi.trigger(osc1::osc1.setFrequency);

    this._setTestVariablesForConsole();



setInterval(() => kick.envelope.triggerADS(), 1000);

// 1000 = milliseconds between triggers
  }


  /**
   * Render synth controls and wire them up to their controlling parameters
   */
  render()
  {
    let { osc1, osc2, osc3, filter, envelope, drumEnv, filterEnv } = this;

    return (
      <div>
        <AudioControlGroup label='Kick Envelope'>
          <Slider label='Attack'
            min={0.0001} max={0.5} step={0.001} defaultValue={0.001} onInput={kick.envelope::kick.envelope.setAttack} />
          <Slider label='Decay'
            min={0.0001} max={1} step={0.0001} defaultValue={0.5} onInput={kick.envelope::kick.envelope.setDecay} />
        </AudioControlGroup>


        <Keyboard octaves={4} startingOctave={2} onKeypress={[
          kick.envelope::kick.envelope.triggerADS,
        ]} />

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
    //window.midi = this.midi;
    window.osc1 = this.osc1;
    window.filter = this.filter;
    window.mixer = this.mixer;
    window.vca = this.vca;
    window.envelope = this.envelope;
    window.drumEnv = this.drumEnv;
    window.kick = this.kick;
  }
}
