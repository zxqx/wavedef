import { Synth, Oscillator, Filter, Mixer, Slider } from '../lib';

let AudioContext = window.AudioContext || window.webkitAudioContext;
let ctx = new AudioContext();

let synth = new Synth(ctx);
let osc = new Oscillator(ctx);
let filter = new Filter(ctx);
let mixer = new Mixer(ctx);

synth.addModule(osc);
synth.addModule(filter);
synth.addModule(mixer);
synth.connect(osc).to(filter).to(mixer).output();

let oscFrequencyControl = new Slider(document, 'Osc Freq');

oscFrequencyControl
  .setMin(200)
  .setMax(1500)
  .setStep(20)
  .control(osc, osc.setFrequency);

document.body.appendChild(oscFrequencyControl.el);

// testing
window.osc = osc;
window.synth = synth;
window.filter = filter;
window.mixer = mixer;
