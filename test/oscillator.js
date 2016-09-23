import test from 'tape';
import nm from 'nodemock';
import Oscillator from '../src/modules/Oscillator.js';

test('Start', (t) => {
  t.plan(1);

  let ctx = nm.mock('createOscillator').takes().returns(
  {
    start: () => 'start'
  });

  Oscillator.__Rewire__('ctx', ctx);

  let osc = new Oscillator();
  osc.start();

  t.ok(osc.start(), 'should start');
});

test('Stop', (t) => {
  t.plan(1);

  let ctx = nm.mock('createOscillator').takes().returns(
  {
    stop: () => 'stop'
  });

  Oscillator.__Rewire__('ctx', ctx);

  let osc = new Oscillator();
  osc.stop();

  t.ok(osc.stop(), 'should stop');
});

test('Set frequency', (t) => {
  t.plan(1);

  let ctx = nm.mock('createOscillator').takes().returns({
   frequency: { value: 0 }
  });

  Oscillator.__Rewire__('ctx', ctx);

  let osc = new Oscillator();
  osc.setFrequency(500);

  t.strictEquals(500, osc.node.frequency.value);
});

test('Set detune', (t) => {
  t.plan(1);

  let ctx = nm.mock('createOscillator').takes().returns({
   detune: { value: 0 }
  });

  Oscillator.__Rewire__('ctx', ctx);

  let osc = new Oscillator();
  osc.setDetune(72);

  t.strictEquals(72, osc.node.detune.value);
});

test('Set waveform type', (t) => {
  t.plan(1);

  let ctx = nm.mock('createOscillator').takes().returns({
   type: ''
  });

  Oscillator.__Rewire__('ctx', ctx);

  let osc = new Oscillator();
  osc.setWaveformType('sawtooth');

  t.strictEquals('sawtooth', osc.node.type);
});

test('Get frequency', (t) => {
  t.plan(1);

  let ctx = nm.mock('createOscillator').takes().returns({
   frequency: { value: 1500 }
  });

  Oscillator.__Rewire__('ctx', ctx);

  let osc = new Oscillator();

  t.strictEquals(osc.getFrequency(), 1500);
});

test('Get detune', (t) => {
  t.plan(1);

  let ctx = nm.mock('createOscillator').takes().returns({
   detune: { value: 4 }
  });

  Oscillator.__Rewire__('ctx', ctx);

  let osc = new Oscillator();

  t.strictEquals(osc.getDetune(), 4);
});

test('Get waveform type', (t) => {
  t.plan(1);

  let ctx = nm.mock('createOscillator').takes().returns({
    type: 'sine'
  });

  Oscillator.__Rewire__('ctx', ctx);

  let osc = new Oscillator();

  t.strictEquals(osc.getWaveformType(), 'sine');
});
