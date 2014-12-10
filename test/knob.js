import test from 'tape';
import Knob from '../lib/Knob.js';

test('Transition value', (t) => {
  t.plan(1);

  var knob = new Knob();
  var node = { value: 0 };

  knob.transitionValue(node, 'value', 100, 1000)
    .then(() => t.strictEquals(node.value, 100));
});
