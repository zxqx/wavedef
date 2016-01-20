import Synth from '../lib/Synth.js';
import Oscillator from '../lib/Oscillator.js';
import Mixer from '../lib/Mixer.js';
import Filter from '../lib/Filter.js';

let AudioContext = window.AudioContext || window.webkitAudioContext;
let ctx = new AudioContext();

let osc = new Oscillator(ctx);
let mixer = new Mixer(ctx);
let synth = new Synth(ctx);
let filter = new Filter(ctx);

synth.addModule(osc);
synth.addModule(mixer);
synth.connect(osc).to(filter).to(mixer).output();

window.osc = osc;
window.synth = synth;
window.filter = filter;
window.mixer = mixer;
