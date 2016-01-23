import test from 'tape';
import nm from 'nodemock';
import arrayIncludes from 'array-includes';
import Synth from '../lib/Synth.js';

Array.prototype.includes = arrayIncludes.shim();

test('Add module', (t) => {
  t.plan(7);

  let synth = new Synth();

  let module = { who: 'datboi' };
  let module2 = { what: 'chuknow' };
  let moduleWithChildren = {
    dis: 'it',
    children: [
      { loch: 'ness' },
      { twinny: 'twins' }
    ]
  };

  let moduleWithGrandchildren = {
    grand: 'don',
    children: [
      { semi: 'tight' },
      { but: 'not',
        children: [
          { 'mac': 'daddy' },
          { 'dennys': 'waffles' }
        ]
      }
    ]
  };

  synth.addModule(module);
  synth.addModule(module2);
  synth.addModule(moduleWithChildren);
  synth.addModule(moduleWithGrandchildren);

  t.strictEquals(synth._modules[0], module);
  t.strictEquals(synth._modules[1], module2);
  t.strictEquals(synth._modules[2], moduleWithChildren);
  t.strictEquals(synth._modules[3], moduleWithChildren.children[0]);
  t.strictEquals(synth._modules[4], moduleWithChildren.children[1]);
  t.strictEquals(synth._modules[8], moduleWithGrandchildren.children[1].children[0]);
  t.strictEquals(synth._modules[9], moduleWithGrandchildren.children[1].children[1]);
});

test('Remove module', (t) => {
  t.plan(1);

  let synth = new Synth();

  let module = { that: 'dude' };
  let module2 = { matt: 'tang' };
  let moduleWithChildren = {
    dis: 'it',
    children: [
      { loch: 'ness' },
      { twinny: 'twins' }
    ]
  };

  synth.addModule(module)
  synth.addModule(module2);
  synth.addModule(moduleWithChildren);

  synth.removeModule(module);
  synth.removeModule(moduleWithChildren);

  t.strictEquals(synth._modules.length, 1);
});

test('Get modules', (t) => {
  t.plan(1);

  let synth = new Synth();

  let module = { some: 'shit' };
  let module2 = { and: 'stuff' };
  let module3 = { ac: 'off' };

  synth._modules = [module, module2, module3];

  t.strictEquals(synth.getModules(), synth._modules);
});

test('Connect from output', (t) => {
  t.plan(2);

  let synth = new Synth();
  let module = { filter: 'mod' };
  let module2 = { flabby: 'ogre' };

  synth.addModule(module);
  synth.connect(module);

  t.strictEquals(synth._connecting, module);
  t.throws(() => synth.connect(module2));
});

test('Connect to input', (t) => {
  t.plan(2);

  let synth = new Synth();

  let input = {
    node: nm.mock('connect')
  };

  let output = {
    node: nm.mock('connect').takes(input.node)
  };

  synth.addModule(output);
  synth.addModule(input);
  synth.connect(output).to(input);

  t.throws(() => synth.to(output));
  t.strictEquals(synth._connecting, input);
});

test('Output', (t) => {
  t.plan(2);

  let synth = new Synth();

  var ctx = { destination: 'home' };

  Synth.__Rewire__('ctx', ctx);

  let module = {
    node: nm.mock('connect').takes(ctx.destination)
  };

  synth.addModule(module);
  synth.connect(module).output();

  t.throws(() => synth.output());
  t.strictEquals(synth._connecting, null);
});
