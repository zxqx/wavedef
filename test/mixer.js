import test from 'tape';
import nm from 'nodemock';
import Mixer from '../lib/modules/Mixer.js';
import Gain from '../lib/modules/Gain.js';

test('Mixer', (t) => {
  t.plan(6);

  let ctx = nm.mock('createGain').takes().returns(
  {
    gain: 'node',
    connect: (node) => node
  }).times(7);

  Mixer.__Rewire__('ctx', ctx);
  Gain.__Rewire__('ctx', ctx);

  let mixer = new Mixer();

  t.ok(mixer.ch1);
  t.ok(mixer.ch2);
  t.ok(mixer.ch3);
  t.ok(mixer.ch4);
  t.ok(mixer.ch5);
  t.ok(mixer.ch6);
});
