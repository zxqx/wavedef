import test from 'tape';
import nm from 'nodemock';
import Filter from '../src/lib/modules/Filter.js';

test('Set frequency', (t) => {
  t.plan(1);

  let ctx = nm.mock('createBiquadFilter').takes().returns({
    frequency: { value: 0 },
    Q: { value: 7 },
    type: ''
  });

  Filter.__Rewire__('ctx', ctx);

  let filter = new Filter();
  filter.setFrequency(88);

  t.strictEquals(filter.node.frequency.value, 88, 'should set frequency');
});

test('Set Q', (t) => {
  t.plan(1);

  let ctx = nm.mock('createBiquadFilter').takes().returns({
    frequency: { value: 0 },
    Q: { value: 7 },
    type: ''
  });

  Filter.__Rewire__('ctx', ctx);

  let filter = new Filter();
  filter.setQ(109);

  t.strictEquals(filter.node.Q.value, 109, 'should set Q');
});

test('Set filter type', (t) => {
  t.plan(1);

  let ctx = nm.mock('createBiquadFilter').takes().returns({
    frequency: { value: 0 },
    Q: { value: 7 },
    type: ''
  });

  Filter.__Rewire__('ctx', ctx);

  let filter = new Filter();
  filter.setFilterType('lowpass');

  t.strictEquals(filter.node.type, 'lowpass', 'should set filter type');
});

test('Get frequency', (t) => {
  t.plan(1);

  let ctx = nm.mock('createBiquadFilter').takes().returns({
    frequency: { value: 62 }
  });

  Filter.__Rewire__('ctx', ctx);

  let filter = new Filter();

  t.strictEquals(filter.getFrequency(), 62, 'should get frequency');
});

test('Get Q', (t) => {
  t.plan(1);

  let ctx = nm.mock('createBiquadFilter').takes().returns({
    Q: { value: 18 }
  });

  Filter.__Rewire__('ctx', ctx);

  let filter = new Filter();

  t.strictEquals(filter.getQ(), 18, 'should get Q');
});

test('Get filter type', (t) => {
  t.plan(1);

  let ctx = nm.mock('createBiquadFilter').takes().returns({
    type: 'highpass'
  });

  Filter.__Rewire__('ctx', ctx);

  let filter = new Filter();

  t.strictEquals(filter.getFilterType(), 'highpass', 'should get filter type');
});
