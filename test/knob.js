import test from 'tape';
import Knob from '../lib/Knob.js';

test('Transition value', (t) => {
  t.plan(1);

  var knob = new Knob();

  knob.transitionValue(0, 100, 1000)
    .then((value) => t.strictEquals(value, 100));
});
