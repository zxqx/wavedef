import test from 'tape';
import Knob from '../lib/Knob.js';

test('Transition value up', (t) => {
  t.plan(1);

  var knob = new Knob();
  var node = { value: 0 };

  knob.transitionValue(node, 'value', 100, 1000)
    .then(() => t.strictEquals(node.value, 100));
});

test('Transition value down', (t) => {
  t.plan(1);

  var knob = new Knob();
  var node = { value: 500 };

  knob.transitionValue(node, 'value', 20, 250)
    .then(() => t.strictEquals(node.value, 20));
});

test('Transition to identical value', (t) => {
  t.plan(1);

  var knob = new Knob();
  var node = { value: 200 };

  knob.transitionValue(node, 'value', 200, 500)
    .then(() => t.strictEquals(node.value, 200));
});
