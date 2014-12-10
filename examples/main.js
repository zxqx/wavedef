import Oscillator from '../lib/Oscillator.js';

var ctx = new AudioContext();

var osc = new Oscillator(ctx);
osc.node.connect(ctx.destination);

window.osc = osc;
