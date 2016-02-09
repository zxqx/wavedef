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
import LFO from '../modules/LFO.js';

export default class ThreeOscSynth extends React.Component
{
  /**
   * Set up synth and its modules and wire up module connections
   */
  componentWillMount()
  {
    this.synth = new Synth();
    this.midi = new MIDI();
    this.osc1 = new Oscillator();
    this.osc2 = new Oscillator();
    this.osc3 = new Oscillator();
    this.filter = new Filter();
    this.mixer = new Mixer();
    this.vca = new VCA();
    this.envelope = new Envelope();
    this.lfo = new LFO();

    let { synth, midi, osc1, osc2, osc3, filter, mixer, vca, envelope, lfo } = this;

    synth.addModule(osc1);
    synth.addModule(osc2);
    synth.addModule(osc3);
    synth.addModule(filter);
    synth.addModule(mixer);
    synth.addModule(vca);

    synth.connect(osc1).to(mixer.ch1);
    synth.connect(osc2).to(mixer.ch2);
    synth.connect(osc3).to(mixer.ch3);
    synth.connect(mixer).to(vca);
    synth.connect(vca).to(filter);
    synth.connect(filter).output();

    envelope.modulate(vca.node.gain);

    midi.trigger(osc1::osc1.setFrequency);

    this._setTestVariablesForConsole();
  }


  /**
   * Render synth controls and wire them up to their controlling parameters
   */
  render()
  {
    let { osc1, osc2, osc3, filter, envelope, lfo } = this;

    return (
      <div>
        <AudioControlGroup label='Osc 1'>
          <Switch label='On/Off'
            onToggleOn={osc1::osc1.start} onToggleOff={osc1::osc1.stop} />
          <Slider label='Frequency'
            min='50' max='1200' step='20' defaultValue='600' onInput={osc1::osc1.setFrequency} />
        </AudioControlGroup>

        <AudioControlGroup label='Osc 2'>
          <Switch label='On/Off'
            onToggleOn={osc2::osc2.start} onToggleOff={osc2::osc2.stop} />
          <Slider label='Frequency'
            min='50' max='1200' step='20' defaultValue='950' onInput={osc2::osc2.setFrequency} />
        </AudioControlGroup>

        <AudioControlGroup label='Osc 3'>
          <Switch label='On/Off'
            onToggleOn={osc3::osc3.start} onToggleOff={osc3::osc3.stop} />
          <Slider label='Frequency'
            min='50' max='1200' step='20' defaultValue='300' onInput={osc3::osc3.setFrequency} />
        </AudioControlGroup>

        <AudioControlGroup label='Filter'>
          <Slider label='Cutoff Freq'
            min='50' max='1200' step='5' defaultValue='1200' onInput={filter::filter.setFreq} />
          <Slider label='Resonance'
            min='1' max = '35' step='1' defaultValue='1' onInput={filter::filter.setQ} />
        </AudioControlGroup>

        <AudioControlGroup label='Envelope'>
          <Slider label='Attack'
            min={0} max={2.25} step={0.1} defaultValue={0.1} onInput={envelope::envelope.setAttack} />
          <Slider label='Decay'
            min={0} max={4.5} step={0.1} defaultValue={0.1} onInput={envelope::envelope.setDecay} />
          <Slider label='Sustain'
            min={0} max={1} step={0.1} defaultValue={1} onInput={envelope::envelope.setSustain} />
        </AudioControlGroup>

        <AudioControlGroup label='LFO'>
          <Slider label='Depth'
            min={0} max={100} step={0.5} defaultValue={1} onInput={lfo::lfo.setDepth} />
          <Slider label='Speed'
              min={0} max={100} step={0.5} defaultValue={1} onInput={lfo::lfo.setFrequency} />
        </AudioControlGroup>

        <Keyboard octaves={4} startingOctave={2} onKeypress={[
          osc1::osc1.setFrequency,
          osc2::osc2.setFrequency,
          osc3::osc3.setFrequency,
          envelope::envelope.triggerADS,
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
    window.midi = this.midi;
    window.osc1 = this.osc1;
    window.osc2 = this.osc2;
    window.osc3 = this.osc3;
    window.filter = this.filter;
    window.mixer = this.mixer;
    window.vca = this.vca;
    window.envelope = this.envelope;
    window.lfo = this.lfo;
  }
}
