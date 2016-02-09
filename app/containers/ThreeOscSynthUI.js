import React from 'react';
import { ThreeOscSynth } from '../../lib';
import AudioControlGroup from '../components/AudioControlGroup.js';
import Slider from '../components/Slider.js';
import Switch from '../components/Switch.js';
import Keyboard from '../components/Keyboard.js';

export default class ThreeOscSynthUI extends React.Component
{
  componentWillMount()
  {
    this.threeOscSynth = new ThreeOscSynth();
  }

  render()
  {
    let { osc1, osc2, osc3, filter, envelope } = this.threeOscSynth;

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
}
