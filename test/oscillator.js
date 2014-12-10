import test from 'tape';
import nm from 'nodemock';
import Oscillator from '../lib/Oscillator.js';

test('Set frequency', (t) => {
  t.plan(1);

  var ctx = nm.mock('createOscillator').takes().returns({
   frequency: { value: 0 }
  });

  var osc = new Oscillator(ctx);

  osc.setFrequency(500);

  t.strictEquals(500, osc.node.frequency.value);
});

test('Set detune', (t) => {
  t.plan(1);

  var ctx = nm.mock('createOscillator').takes().returns({
   detune: { value: 0 }
  });

  var osc = new Oscillator(ctx);
  
  osc.node.detune.value = 0;
  osc.setDetune(72);

  t.strictEquals(72, osc.node.detune.value);
});

test('Set waveform type', (t) => {
  t.plan(1);

  var ctx = nm.mock('createOscillator').takes().returns({
   type: ''
  });

  var osc = new Oscillator(ctx);
  
  osc.setWaveformType('sawtooth');

  t.strictEquals('sawtooth', osc.node.type);
});

test('Transition frequency', (t) => {
  t.plan(1);

  var ctx = nm.mock('createOscillator').takes().returns({
   frequency: { value: 3000 }
  });

  var osc = new Oscillator(ctx);

  osc.transitionFrequency(4000, 1000)
    .then(() => t.strictEquals(4000, osc.node.frequency.value));
});

test('Transition detune', (t) => {
  t.plan(1);

  var ctx = nm.mock('createOscillator').takes().returns({
   detune: { value: 4 }
  });

  var osc = new Oscillator(ctx);

  osc.transitionDetune(26, 2000)
    .then(() => t.strictEquals(26, osc.node.detune.value));
});
