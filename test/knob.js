var test = require('tape');
var Knob = require('../lib/Knob.js');

test('knob', function(t) {
  t.plan(1);

  var knob = new Knob();

  knob.transitionValue(0, 100, 1000)
  .then(function(value) {
    t.strictEquals(100, 100);
  });
});
