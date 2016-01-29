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
import PercussionEnv from '../modules/PercussionEnv.js'

export default class DrumSynth extends React.Component
{
  /**
   * Set up synth and its modules and wire up module connections
   */
  componentWillMount()
  {
    this.synth = new Synth();
    //this.midi = new MIDI();
    this.osc1 = new Oscillator();
    //this.osc2 = new Oscillator();
    //this.osc3 = new Oscillator();
    this.filter = new Filter();
    this.mixer = new Mixer();
    this.vca = new VCA();
    this.envelope = new Envelope();
    this.filterEnv = new PercussionEnv();
    this.drumEnv = new PercussionEnv();

    let { synth, midi, osc1, osc2, osc3, filter, mixer, vca, envelope, drumEnv, filterEnv } = this;

    synth.addModule(osc1);
    //synth.addModule(osc2);
    //synth.addModule(osc3);
    synth.addModule(filter);
    synth.addModule(mixer);
    synth.addModule(vca);


    synth.connect(osc1).to(mixer.ch1);
    //synth.connect(osc2).to(mixer.ch2);
    //synth.connect(osc3).to(mixer.ch3);
    synth.connect(mixer).to(vca);
    synth.connect(vca).to(filter);
    synth.connect(filter).output();

    envelope.modulate(vca.node.gain);
    drumEnv.modulate(osc1.node.frequency);
    filterEnv.modulate(filter.node.frequency);

    //midi.trigger(osc1::osc1.setFrequency);

    this._setTestVariablesForConsole();
    vca.setGain(0);
    envelope.setAttack(0);
    envelope.setDecay(1);
    envelope.setSustain(0);
    drumEnv.setStart(150);
    filterEnv.setStart(200);
    filterEnv.setDepth(20);
  }


  /**
   * Render synth controls and wire them up to their controlling parameters
   */
  render()
  {
    let { osc1, osc2, osc3, filter, envelope, drumEnv, filterEnv } = this;

    return (
      <div>
        <AudioControlGroup label='Kick'>
          <Switch label='On/Off'
            onToggleOn={osc1::osc1.start} onToggleOff={osc1::osc1.stop} />
        </AudioControlGroup>

        <AudioControlGroup label='Sweep'>
          <Slider label='Tune -/+'
          min={60} max={200} step={1} defaultValue={110} onInput={drumEnv::drumEnv.setStart} />
          <Slider label='Depth -/+'
            min={-50} max={150} step={1} defaultValue={0.01} onInput={drumEnv::drumEnv.setDepth} />
          <Slider label='Attack'
            min={0.0001} max={1} step={0.0001} defaultValue={0.0001} onInput={drumEnv::drumEnv.setAttack} />
          <Slider label='Decay'
            min={0.0001} max={1} step={0.0001} defaultValue={0.0471} onInput={drumEnv::drumEnv.setDecay} />
        </AudioControlGroup>

        <AudioControlGroup label='Kick Env'>
          <Slider label='Attack'
            min={0.0001} max={1} step={0.0001} defaultValue={0.0001} onInput={envelope::envelope.setAttack} />
          <Slider label='Decay'
            min={0.0001} max={1} step={0.0001} defaultValue={0.07} onInput={envelope::envelope.setDecay} />
        </AudioControlGroup>

        <AudioControlGroup label='Filter'>
          <Slider label='Cutoff'
            min={0.0001} max={500} step={0.1} defaultValue={500} onInput={filter::filter.setFreq} />
          <Slider label='Res'
            min={0.0001} max={50} step={0.1} defaultValue={0} onInput={filter::filter.setQ} />
        </AudioControlGroup>

        <AudioControlGroup label='Filter Env'>
          <Slider label='Attack'
            min={0.0001} max={1} step={0.0001} defaultValue={0.0001} onInput={filterEnv::filterEnv.setAttack} />
          <Slider label='Decay'
            min={0.0001} max={1} step={0.0001} defaultValue={0.07} onInput={filterEnv::filterEnv.setDecay} />
        </AudioControlGroup>

        <Keyboard octaves={4} startingOctave={2} onKeypress={[
          envelope::envelope.triggerADS,
          drumEnv::drumEnv.trigger,
          filterEnv::filterEnv.trigger,
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
    //window.osc2 = this.osc2;
    //window.osc3 = this.osc3;
    window.filter = this.filter;
    window.mixer = this.mixer;
    window.vca = this.vca;
    window.envelope = this.envelope;
    window.drumEnv = this.drumEnv;
  }
}
