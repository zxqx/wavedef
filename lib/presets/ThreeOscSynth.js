import React from 'react';
import { Synth, Oscillator, Filter, Mixer, Keyboard, Slider, Switch, VCA, Envelope, AudioControlGroup } from '../';
import Gain from '../Gain.js';

export default class ThreeOscSynth extends React.Component
{
  /**
   * Set up synth and its modules and wire up module connections
   */
  componentWillMount()
  {
    this.synth = new Synth();
    this.osc1 = new Oscillator();
    this.osc2 = new Oscillator();
    this.osc3 = new Oscillator();
    this.filter = new Filter();
    this.mixer = new Mixer();
    this.vca = new VCA();
    this.envelope = new Envelope();

    let { synth, osc1, osc2, osc3, filter, mixer, vca, envelope } = this;

    synth.addModule(osc1);
    synth.addModule(osc2);
    synth.addModule(osc3);
    synth.addModule(filter);
    synth.addModule(mixer);
    synth.addModule(vca);

    let gain = new Gain();
    osc2.node.connect(gain.node.gain);
    osc1.node.connect(gain.node);
    gain.node.connect(mixer.ch1.node);

    synth.connect(osc3).to(mixer.ch3);
    synth.connect(mixer).to(vca);
    synth.connect(vca).to(filter);
    synth.connect(filter).output();

    this._setTestVariablesForConsole();

    this.envelope.modulate(vca.node.gain);
  }


  /**
   * Render synth controls and wire them up to their controlling parameters
   */
  render()
  {
    let { osc1, osc2, osc3, filter, envelope } = this;

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
    window.osc1 = this.osc1;
    window.osc2 = this.osc2;
    window.osc3 = this.osc3;
    window.filter = this.filter;
    window.mixer = this.mixer;
    window.vca = this.vca;
    window.envelope = this.envelope;
  }
}
