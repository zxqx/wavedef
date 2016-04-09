import test from 'tape';
import nm from 'nodemock';
import Envelope from '../src/lib/modules/Envelope.js';

test('Modulate', (t) => {
  t.plan(1);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  let envelope = new Envelope();
  let audioParam = { gain: 0 };

  envelope.modulate(audioParam);

  t.strictEquals(envelope.destination, audioParam, 'should modulate');
});

test('Set attack', (t) => {
  t.plan(1);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  let envelope = new Envelope();

  envelope.setAttack('21');

  t.strictEquals(envelope.attack, 21, 'should set attack');
});

test('Set decay', (t) => {
  t.plan(1);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  let envelope = new Envelope();

  envelope.setDecay('15.5');

  t.strictEquals(envelope.decay, 15.5, 'should set decay');
});

test('Set sustain', (t) => {
  t.plan(1);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  let envelope = new Envelope();

  envelope.setSustain('28.85');

  t.strictEquals(envelope.sustain, 28.85, 'should set sustain');
});

test('Set release', (t) => {
  t.plan(1);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  let envelope = new Envelope();

  envelope.setRelease('105');

  t.strictEquals(envelope.release, 105, 'should set release');
});

test('Set depth', (t) => {
  t.plan(1);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  let envelope = new Envelope();

  envelope.setDepth('47');

  t.strictEquals(envelope.depth, 47, 'should set depth');
});

test('Set start', (t) => {
  t.plan(1);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  let envelope = new Envelope();

  envelope.setStart('19');

  t.strictEquals(envelope.start, 19, 'should set start');
});

test('Get attack', (t) => {
  t.plan(1);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  let envelope = new Envelope();

  envelope.setAttack('24');

  t.strictEquals(envelope.getAttack(), 24, 'should get attack');
});

test('Get decay', (t) => {
  t.plan(1);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  let envelope = new Envelope();

  envelope.setDecay('70');

  t.strictEquals(envelope.getDecay(), 70, 'should get decay');
});

test('Get sustain', (t) => {
  t.plan(1);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  let envelope = new Envelope();

  envelope.setSustain('10');

  t.strictEquals(envelope.getSustain(), 10, 'should get sustain');
});

test('Get release', (t) => {
  t.plan(1);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  let envelope = new Envelope();

  envelope.setRelease('6');

  t.strictEquals(envelope.getRelease(), 6, 'should get release');
});

test('Get start', (t) => {
  t.plan(1);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  let envelope = new Envelope();

  envelope.setStart('2');

  t.strictEquals(envelope.getStart(), 2, 'should get start');
});

test('Get depth', (t) => {
  t.plan(1);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  let envelope = new Envelope();

  envelope.setDepth('8');

  t.strictEquals(envelope.getDepth(), 8, 'should get depth');
});

test('Trigger', (t) => {
  t.plan(2);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  class AudioParam
  {
    setValueAtTime(val, time) {
      this.val = val;
    }

    linearRampToValueAtTime(val, time) {
      this.val = val;
    }
  }

  let envelope = new Envelope();
  let audioParam = new AudioParam();

  envelope.modulate(audioParam);
  envelope.setStart(3);
  envelope.setDepth(6);
  envelope.setAttack(8);
  envelope.setDecay(12);

  t.doesNotThrow(() => envelope.trigger(), 'should trigger');

  t.strictEquals(audioParam.val, 3);
});

test('Trigger ADS', (t) => {
  t.plan(2);

  let ctx = { currentTime: 0 };
  Envelope.__Rewire__('ctx', ctx);

  class AudioParam
  {
    cancelScheduledValues() {
    }

    setValueAtTime(val, time) {
      this.val = val;
    }

    linearRampToValueAtTime(val, time) {
      this.val = val;
    }
  }

  let envelope = new Envelope();
  let audioParam = new AudioParam();

  envelope.modulate(audioParam);
  envelope.setStart(3);
  envelope.setDepth(6);
  envelope.setAttack(8);
  envelope.setDecay(12);
  envelope.setSustain(85);

  t.doesNotThrow(() => envelope.triggerADS(), 'should trigger ADS');

  t.strictEquals(audioParam.val, 85);
});
