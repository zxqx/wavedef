import React from 'react';
import { OscillatorGroupSynth } from '../../lib';
import AudioControlGroup from '../components/AudioControlGroup.js';
import Keyboard from '../components/Keyboard.js';
import Slider from '../components/Slider.js';

export default class OscillatorGroupSynthUI extends React.Component
{
  componentWillMount()
  {
    this.oscillatorGroupSynth = new OscillatorGroupSynth();
  }

  render()
  {
    let { osc1, osc2, osc3 } = this.oscillatorGroupSynth.oscGroup;

    return (
      <div>
        <AudioControlGroup label='Osc 1'>
          <Slider label='Frequency'
            min='50' max='1200' step='20' defaultValue='400' onInput={osc1::osc1.setFrequency} />
        </AudioControlGroup>

        <AudioControlGroup label='Osc 2'>
          <Slider label='Frequency Offset'
            min='-1200' max='1200' step='1' defaultValue='400' onInput={osc2::osc2.setDetune} />
        </AudioControlGroup>

        <AudioControlGroup label='Osc 3'>
          <Slider label='Frequency Offset'
            min='-1200' max='1200' step='1' defaultValue='700' onInput={osc3::osc3.setDetune} />
        </AudioControlGroup>

        <Keyboard octaves={4} startingOctave={2} onKeypress={[
          osc1::osc1.setFrequency
        ]} />
      </div>
    )
  }
}
