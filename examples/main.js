import Synth from '../lib/Synth.js';
import Oscillator from '../lib/Oscillator.js';
import Mixer from '../lib/Mixer.js';

let AudioContext = window.AudioContext || window.webkitAudioContext;
let ctx = new AudioContext();

let osc = new Oscillator(ctx);
let mixer = new Mixer(ctx);
let synth = new Synth(ctx);

synth.addModule(osc);
synth.addModule(mixer);
synth.connect(osc, mixer);
synth.connectToMaster(mixer);
synth.on();

window.osc = osc;
window.mixer = mixer;
window.synth = synth;
window.ctx = ctx;

