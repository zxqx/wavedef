import React from 'react';
import { ThreeOscSynth } from '../../lib';
import AudioControlGroup from '../components/AudioControlGroup.js';
import Slider from '../components/Slider.js';
import ButtonGroup from '../components/ButtonGroup.js';
import Button from '../components/Button.js';
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
    let { oscGroup, mixer, filter, envelope } = this.threeOscSynth;
    let { osc1, osc2, osc3 } = oscGroup;

    return (
      <div className="three-osc-synth">
        <Keyboard octaves={3} startingOctave={2}
          onKeypress={[
            osc1::osc1.setFrequency,
            osc2::osc2.setFrequency,
            osc3::osc3.setFrequency,
            envelope::envelope.triggerADS,
          ]}
          onKeyRelease={[
            envelope::envelope.triggerRelease
          ]}
        />
        <AudioControlGroup label='Osc 1'>
          <Switch label='On/Off'
            onToggleOn={() => mixer.ch1.toggleOn()} onToggleOff={() => mixer.ch1.toggleOff()} state={true} />
          <ButtonGroup label='Waveform' name='osc1-waveform' defaultValue='sawtooth' onChange={osc1::osc1.setWaveformType}>
            <Button label='SN' value='sine' />
            <Button label='SQ' value='square' />
            <Button label='SW' value='sawtooth' />
            <Button label='TR' value='triangle' />
          </ButtonGroup>
          <Slider label='Osc 1 Volume'
            min='0' max='1' step='0.01' defaultValue='1' onInput={(val) => mixer.ch1.setGain(val)} />
        </AudioControlGroup>

        <AudioControlGroup label='Osc 2'>
          <Switch label='On/Off'
            onToggleOn={() => mixer.ch2.toggleOn()} onToggleOff={() => mixer.ch2.toggleOff()} state={true} />
          <ButtonGroup label='Waveform' name='osc2-waveform' defaultValue='triangle' onChange={osc2::osc2.setWaveformType}>
            <Button label='SN' value='sine' />
            <Button label='SQ' value='square' />
            <Button label='SW' value='sawtooth' />
            <Button label='TR' value='triangle' />
          </ButtonGroup>
          <Slider label='Osc 2 Volume'
            min='0' max='1' step='0.01' defaultValue='1' onInput={(val) => mixer.ch2.setGain(val)} />
          <Slider label='Freq Offset'
            min='-1200' max='1200' step='10' defaultValue='400' onInput={osc2::osc2.setDetune} />
        </AudioControlGroup>

        <AudioControlGroup label='Osc 3'>
          <Switch label='On/Off'
            onToggleOn={() => mixer.ch3.toggleOn()} onToggleOff={() => mixer.ch3.toggleOff()} state={true} />
          <ButtonGroup label='Waveform' name='osc3-waveform' defaultValue='square' onChange={osc3::osc3.setWaveformType}>
            <Button label='SN' value='sine' />
            <Button label='SQ' value='square' />
            <Button label='SW' value='sawtooth' />
            <Button label='TR' value='triangle' />
          </ButtonGroup>
          <Slider label='Osc 3 Volume'
            min='0' max='1' step='0.01' defaultValue='1' onInput={(val) => mixer.ch3.setGain(val)} />
          <Slider label='Freq Offset'
            min='-1200' max='1200' step='10' defaultValue='700' onInput={osc3::osc3.setDetune} />
        </AudioControlGroup>

        <AudioControlGroup label='Filter'>
          <Slider label='Cutoff Freq'
            min='50' max='1200' step='5' defaultValue='1200' onInput={filter::filter.setFrequency} />
          <Slider label='Resonance'
            min='1' max = '35' step='1' defaultValue='1' onInput={filter::filter.setQ} />
        </AudioControlGroup>

        <AudioControlGroup label='Volume Envelope'>
          <Slider label='Attack'
            min={0} max={2.25} step={0.1} defaultValue={0.1} onInput={envelope::envelope.setAttack} />
          <Slider label='Decay'
            min={0} max={4.5} step={0.1} defaultValue={0.1} onInput={envelope::envelope.setDecay} />
          <Slider label='Sustain'
            min={0} max={1} step={0.1} defaultValue={1} onInput={envelope::envelope.setSustain} />
          <Slider label='Release'
            min={0} max={3} step={0.1} defaultValue={0.5} onInput={envelope::envelope.setRelease} />
        </AudioControlGroup>

        <AudioControlGroup label='LFO'>
          <Slider label='Depth'
            min={0} max={100} step={0.5} defaultValue={1} onInput={lfo::lfo.setDepth} />
          <Slider label='Speed'
              min={0} max={20} step={0.001} defaultValue={1} onInput={lfo::lfo.setFrequency} />
        </AudioControlGroup>

        <AudioControlGroup label='Delay'>
          <Slider label='Time'
            min={0.001} max={6.4} step={0.01} defaultValue={0.5} onInput={delay::delay.setDelayTime} />
          <Slider label='Feedback'
            min={0} max={1} step={0.01} defaultValue={0.8} onInput={delay::delay.setFeedback} />
          <Slider label='Mix'
            min={0} max={1} step={0.01} defaultValue={0.15} onInput={delay::delay.setWetDryMix} />
        </AudioControlGroup>

        <AudioControlGroup label='EQ'>
          <Slider label='Low Frequency'
            min={50} max={5000} step={1} defaultValue={250} onInput={eq3::eq3.lowFrequency} />
          <Slider label='Low Gain'
            min={-50} max={25} step={0.01} defaultValue={0} onInput={eq3::eq3.lowSetGain} />
          <Slider label='Mid Gain'
            min={-50} max={25} step={0.01} defaultValue={0} onInput={eq3::eq3.midSetGain} />
          <Slider label='High Frequency'
            min={200} max={18000} step={1} defaultValue={2500} onInput={eq3::eq3.highFrequency} />
          <Slider label='High Gain'
            min={-50} max={25} step={0.01} defaultValue={0} onInput={eq3::eq3.highSetGain} />
        </AudioControlGroup>

        <AudioControlGroup label='Reverb'>
          <Slider label='Wet/Dry'
            min={0} max={1} step={0.01} defaultValue={0.5} onInput={convolver::convolver.setWetDryMix} />
        </AudioControlGroup>
      </div>
    )
  }
}
