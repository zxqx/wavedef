import test from 'tape';
import nm from 'nodemock';
import Gain from '../src/modules/Gain.js';

test('Set gain', (t) => {
  t.plan(1);

  let ctx = nm.mock('createGain').takes().returns(
  {
    gain: { value: 0 }
  });

  Gain.__Rewire__('ctx', ctx);

  let gain = new Gain();
  gain.setGain(0.5);

  t.strictEquals(0.5, gain.node.gain.value, 'should set gain');
});

test('Get gain', (t) => {
  t.plan(1);

  let ctx = nm.mock('createGain').takes().returns(
  {
    gain: { value: 0 }
  });

  Gain.__Rewire__('ctx', ctx);

  let gain = new Gain();

  t.strictEquals(gain.getGain(), 0, 'should get gain');
});
