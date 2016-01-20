import { Synth, Oscillator, Filter, Mixer } from '../lib';

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

// testing
window.osc = osc;
window.synth = synth;
window.filter = filter;
window.mixer = mixer;
