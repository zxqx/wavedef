import SingleOscSynth from './SingleOscSynth.js';

let AudioContext = window.AudioContext || window.webkitAudioContext;
let ctx = new AudioContext();

let synth = new SingleOscSynth(ctx);
synth.on();
