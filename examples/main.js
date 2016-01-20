import Oscillator from '../lib/Oscillator.js';
import Mixer from '../lib/Mixer.js';
import Filter from '../lib/Filter.js';

let AudioContext = window.AudioContext || window.webkitAudioContext;
let ctx = new AudioContext();

let osc = new Oscillator(ctx);
let mixer = new Mixer(ctx);
let filter = new Filter(ctx);

osc.node.connect(filter.node);
filter.node.connect(mixer.node);
mixer.node.connect(ctx.destination);

window.osc = osc;
window.mixer = mixer;
window.filter = filter;