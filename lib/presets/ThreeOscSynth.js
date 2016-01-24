import React from 'react';
import { Synth, Oscillator, Filter, Mixer, Slider } from '../';

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

    let { synth, osc1, osc2, osc3, filter, mixer } = this;

    synth.addModule(osc1);
    synth.addModule(osc2);
    synth.addModule(osc3);
    synth.addModule(filter);
    synth.addModule(mixer);

    synth.connect(osc1).to(mixer.ch1);
    synth.connect(osc2).to(mixer.ch2);
    synth.connect(osc3).to(mixer.ch3);
    synth.connect(mixer).to(filter).output();

    this._setTestVariablesForConsole();
  }

  /**
   * Render synth controls and wire them up to their controlling parameters
   */
  render()
  {
    let { osc1, osc2, osc3 } = this;

    return (
      <div>
        <Slider label='Osc 1 Freq' min='50' max='1200' step='20'
          onInput={osc1::osc1.setFrequency} />
        <Slider label='Osc 2 Freq' min='50' max='1200' step='20'
          onInput={osc2::osc2.setFrequency} />
        <Slider label='Osc 3 Freq' min='50' max='1200' step='20'
          onInput={osc3::osc3.setFrequency} />
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
  }
}
