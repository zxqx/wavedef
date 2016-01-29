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
    this.drumEnv = new PercussionEnv();

    let { synth, midi, osc1, osc2, osc3, filter, mixer, vca, envelope, drumEnv } = this;

    synth.addModule(osc1);
    //synth.addModule(osc2);
    //synth.addModule(osc3);
    synth.addModule(filter);
    synth.addModule(mixer);
    synth.addModule(vca);
    synth.addModule(drumEnv);

    synth.connect(osc1).to(mixer.ch1);
    //synth.connect(osc2).to(mixer.ch2);
    //synth.connect(osc3).to(mixer.ch3);
    synth.connect(mixer).to(vca);
    synth.connect(vca).to(filter);
    synth.connect(filter).output();

    envelope.modulate(vca.node.gain);
    drumEnv.modulate(osc1.node.frequency);

    //midi.trigger(osc1::osc1.setFrequency);

    this._setTestVariablesForConsole();
    envelope.setAttack(0);
    envelope.setDecay(1);
    envelope.setSustain(1);
    drumEnv.setAttack(1);
    drumEnv.setDecay(1);
    drumEnv.setDepth(200);
    drumEnv.setStart(500);
  }


  /**
   * Render synth controls and wire them up to their controlling parameters
   */
  render()
  {
    let { osc1, osc2, osc3, filter, envelope, drumEnv } = this;

    return (
      <div>
        <AudioControlGroup label='Osc 1'>
          <Switch label='On/Off'
            onToggleOn={osc1::osc1.start} onToggleOff={osc1::osc1.stop} />
          <Slider label='Frequency'
            min='50' max='1200' step='20' defaultValue='600' onInput={osc1::osc1.setFrequency} />
        </AudioControlGroup>

        <AudioControlGroup label='Sweep'>
          <Slider label='Sweep'
            min={-100} max={100} step={1} defaultValue={0.01} onInput={drumEnv::drumEnv.setDepth} />
        </AudioControlGroup>

        <Keyboard octaves={4} startingOctave={2} onKeypress={[
          osc1::osc1.setFrequency,
          envelope::envelope.triggerADS,
          drumEnv::drumEnv.trigger,
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
