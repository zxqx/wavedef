import test from 'tape';
import Oscillator from '../lib/Oscillator.js';

test('Set frequency', (t) => {
  t.plan(1);

  // Mocked interface
  var ctx = {
    createOscillator: () => { 
      return {};
    }
  };

  var osc = new Oscillator(ctx, 3000, 4, 'square'); 
  
  osc.setFrequency(500);

  t.strictEquals(500, osc.node.frequency);
});

test('Set detune', (t) => {
  t.plan(1);

  // Mocked interface
  var ctx = {
    createOscillator: () => { 
      return {};
    }
  };

  var osc = new Oscillator(ctx, 3000, 4, 'square'); 
  
  osc.setDetune(72);

  t.strictEquals(72, osc.node.detune);
});

test('Set waveform type', (t) => {
  t.plan(1);

  // Mocked interface
  var ctx = {
    createOscillator: () => { 
      return {};
    }
  };

  var osc = new Oscillator(ctx, 3000, 4, 'square'); 
  
  osc.setWaveformType('sawtooth');

  t.strictEquals('sawtooth', osc.node.type);
});

test('Transition frequency', (t) => {
  t.plan(1);

  // Mocked interface
  var ctx = {
    createOscillator: () => { 
      return {};
    }
  };

  var osc = new Oscillator(ctx, 3000, 4, 'square'); 

  osc.transitionFrequency(4000, 1000)
    .then((value) => t.strictEquals(4000, value));
});

test('Transition detune', (t) => {
  t.plan(1);

  // Mocked interface
  var ctx = {
    createOscillator: () => { 
      return {};
    }
  };

  var osc = new Oscillator(ctx, 3000, 4, 'square'); 

  osc.transitionDetune(26, 2000)
    .then((value) => t.strictEquals(26, value));
});
