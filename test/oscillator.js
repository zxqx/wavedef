import test from 'tape';
import nm from 'nodemock';
import Oscillator from '../lib/Oscillator.js';

test('Set frequency', (t) => {
  t.plan(1);

  var osc = new Oscillator();
  osc.setFrequency(500);

  t.strictEquals(500, osc.node.frequency.value);
});

test('Set detune', (t) => {
  t.plan(1);

  var osc = new Oscillator();
  osc.setDetune(72);

  t.strictEquals(72, osc.node.detune.value);
});

test('Set waveform type', (t) => {
  t.plan(1);

  var osc = new Oscillator();
  osc.setWaveformType('sawtooth');

  t.strictEquals('sawtooth', osc.node.type);
});

test('Get frequency', (t) => {
  t.plan(1);

  var osc = new Oscillator();

  t.strictEquals(osc.getFrequency(), 1500);
});

test('Get detune', (t) => {
  t.plan(1);

  var osc = new Oscillator();

  t.strictEquals(osc.getDetune(), 4);
});

test('Get waveform type', (t) => {
  t.plan(1);

  var osc = new Oscillator();

  t.strictEquals(osc.getWaveformType(), 'sine');
});
