import React from 'react';
import { DrumSynth } from '../../lib';
import AudioControlGroup from '../components/AudioControlGroup.js';
import Slider from '../components/Slider.js';

export default class DrumSynthUI extends React.Component
{
  componentWillMount()
  {
    this.drumSynth = new DrumSynth();
  }

  render()
  {
    let { kick, hihat, snare } = this.drumSynth;

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

          <Slider label = 'Decay'
            min={0.001} max={0.5} step={0.001} defaultValue={0.05} onInput={hihat.envelope::hihat.envelope.setDecay} />
          <Slider label = 'Filter'
            min={500} max={2000} step={1} defaultValue={900} onInput={hihat.filter::hihat.filter.setFreq} />
          <Slider label = 'Resonance'
            min={0} max={10} step={0.01} defaultValue={0} onInput={hihat.filter::hihat.filter.setQ} />
        </AudioControlGroup>

        <AudioControlGroup label='Mixer'>
          <Slider label = 'Kick'
            min={0} max={1} step={0.01} defaultValue={1} onInput={mixer.ch1::mixer.ch1.setGain} />
          <Slider label = 'Snare'
            min={0} max={1} step={0.01} defaultValue={0.1} onInput={snare.gain::snare.gain.setGain} />
          <Slider label = 'Hi-Hat'
            min={0} max={1} step={0.01} defaultValue={0.1} onInput={mixer.ch2::mixer.ch2.setGain} />
        </AudioControlGroup>
      </div>
    )
  }
}
