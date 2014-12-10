import Oscillator from '../lib/Oscillator.js';

let AudioContext = window.AudioContext || window.webkitAudioContext;
let ctx = new AudioContext();

let osc = new Oscillator(ctx);
osc.node.connect(ctx.destination);

window.osc = osc;
