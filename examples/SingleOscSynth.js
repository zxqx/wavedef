import { Synth, Oscillator, Filter, Mixer, Slider } from '../lib';

/**
 * Compose a single oscillator synthesizer
 */
export default class SingleOscSynth extends Synth
{
  constructor(props)
  {
    super(props);
  }

  /**
   * Set up audio modules and hook up their controls
   * @return {SingleOscSynth}
   */
  on()
  {
    let osc = new Oscillator(this.ctx);
    let filter = new Filter(this.ctx);
    let mixer = new Mixer(this.ctx);

    this.addModule(osc);
    this.addModule(filter);
    this.addModule(mixer);
    this.connect(osc).to(filter).to(mixer).output();

    let oscFrequencyControl = new Slider(document, 'Osc Freq');

    oscFrequencyControl
      .setMin(200)
      .setMax(1500)
      .setStep(20)
      .control(osc, osc.setFrequency);

    document.body.appendChild(oscFrequencyControl.el);

    // testing
    window.synth = this;
    window.osc = osc;
    window.filter = filter;
    window.mixer = mixer;

    return this;
  }
}
