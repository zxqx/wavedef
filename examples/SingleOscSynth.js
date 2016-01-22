import { Synth, Oscillator, Filter, Mixer, Slider } from '../lib';

export default class SingleOscSynth extends Synth
{
  constructor(props)
  {
    super(props);
  }

  on()
  {
    let osc1 = new Oscillator(this.ctx);
    let osc2 = new Oscillator(this.ctx);
    let osc3 = new Oscillator(this.ctx);
    let filter = new Filter(this.ctx);
    let mixer = new Mixer(this.ctx);

    this.addModule(osc1);
    this.addModule(osc2);
    this.addModule(osc3);
    this.addModule(filter);
    this.addModule(mixer);
    this.addModule(mixer.ch1);
    this.addModule(mixer.ch2);
    this.addModule(mixer.ch3);
    this.connect(osc1).to(mixer.ch1);
    this.connect(osc2).to(mixer.ch2);
    this.connect(osc3).to(mixer.ch3);
    this.connect(mixer).to(filter).output();

    let oscFrequencyControl1 = new Slider(document, 'Osc Freq');

    oscFrequencyControl1
      .setMin(200)
      .setMax(1500)
      .setStep(20)
      .control(osc1, osc1.setFrequency);

    document.body.appendChild(oscFrequencyControl1.el);

    let oscFrequencyControl2 = new Slider(document, 'Osc Freq');

    oscFrequencyControl2
      .setMin(200)
      .setMax(1500)
      .setStep(20)
      .control(osc1, osc2.setFrequency);

    document.body.appendChild(oscFrequencyControl2.el);


let oscFrequencyControl3 = new Slider(document, 'Osc Freq');

    oscFrequencyControl3
      .setMin(200)
      .setMax(1500)
      .setStep(20)
      .control(osc1, osc3.setFrequency);

    document.body.appendChild(oscFrequencyControl3.el);


    // testing
    window.synth = this;
    window.osc1 = osc1;
    window.osc2 = osc2;
    window.osc3 = osc3;
    window.filter = filter;
    window.mixer = mixer;
  }
}
