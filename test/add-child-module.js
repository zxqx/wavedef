import test from 'tape';
import addChildModule from '../src/modules/addChildModule.js';

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
  t.throws(() => parentModule::addChildModule('toast', module));
});
