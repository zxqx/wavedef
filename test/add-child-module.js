import test from 'tape';
import addChildModule from '../lib/addChildModule.js';

test('Add child module', (t) => {
  t.plan(3);

  let module = {
    breakfast: 'isgood',
    node: {
      connect: (node) => 'node'
    }
  };

  let parentModule = { node: 'node' };

  parentModule::addChildModule('toast', module);

  t.strictEquals(parentModule.children.length, 1);
  t.strictEquals(parentModule.toast, module);
  t.throws(() => addChildModule('toast', module));
});
