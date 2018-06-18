import 'web-audio-test-api';
import Synth from './Synth';

jest.mock('startaudiocontext');

describe('Synth', () => {
  it('should add module', () => {
    const synth = new Synth();
    const osc = { node: 'osc' };

    synth.addModule(osc);

    expect(synth.modules).toHaveLength(1);
    expect(synth.modules[0]).toEqual(osc);
  });

  it('should recursively add modules', () => {
    const synth = new Synth();
    const mixer = {
      node: 'mixer',
      children: [
        { node: 'ch1' },
        { node: 'ch2' },
        { node: 'ch3' },
        { node: 'ch4' },
      ],
    };

    synth.addModule(mixer);

    expect(synth.modules).toHaveLength(5);
    expect(synth.modules[0]).toEqual(mixer);
    expect([
      synth.modules[1],
      synth.modules[2],
      synth.modules[3],
      synth.modules[4],
    ]).toEqual(mixer.children);
  });

  it('should prevent adding more than once', () => {
    const synth = new Synth();
    const osc = { node: 'osc' };

    synth.addModule(osc);
    synth.addModule(osc);
    synth.addModule(osc);

    expect(synth.modules).toHaveLength(1);
  });

  it('should remove module', () => {
    const synth = new Synth();
    const osc = { node: 'osc' };

    synth.addModule(osc);
    synth.removeModule(osc);

    expect(synth.modules).toHaveLength(0);
  });

  it('should recursively remove modules', () => {
    const synth = new Synth();
    const mixer = {
      node: 'mixer',
      children: [
        { node: 'ch1' },
        { node: 'ch2' },
        { node: 'ch3' },
        { node: 'ch4' },
      ],
    };

    synth.addModule(mixer);
    synth.removeModule(mixer);

    expect(synth.modules).toHaveLength(0);
  });

  it('should prevent removing more than once', () => {
    const synth = new Synth();
    const osc = { node: 'osc' };

    synth.addModule(osc);
    synth.removeModule(osc);
    synth.removeModule(osc);

    expect(synth.modules).toHaveLength(0);
  });

  it('should get modules', () => {
    const synth = new Synth();
    const osc1 = { node: 'osc1' };
    const osc2 = { node: 'osc2' };

    synth.addModule(osc1);
    synth.addModule(osc2);

    expect(synth.getModules()).toEqual([osc1, osc2]);
  });

  it('should start connection chain', () => {
    const synth = new Synth();
    const osc = { node: 'osc' };

    synth.connect(osc);

    expect(synth.modules).toHaveLength(1);
    expect(synth.modules).toEqual([osc]);
    expect(synth.connecting).toEqual(osc);
  });

  it('should connect module node to module node', () => {
    const synth = new Synth();

    const module1 = {
      node: {
        connect: jest.fn(),
      },
    };

    const module2 = {
      node: 'parent input',
    };

    synth.connect(module1).to(module2);

    expect(module1.node.connect).toHaveBeenCalledWith(module2.node);
  });

  it('should connect module node to module input node', () => {
    const synth = new Synth();

    const module1 = {
      node: {
        connect: jest.fn(),
      },
    };

    const module2 = {
      inputNode: 'parent input',
    };

    synth.connect(module1).to(module2);

    expect(module1.node.connect).toHaveBeenCalledWith(module2.inputNode);
  });

  it('should connect module output node to module input node', () => {
    const synth = new Synth();

    const module1 = {
      outputNode: {
        connect: jest.fn(),
      },
    };

    const module2 = {
      inputNode: 'parent input',
    };

    synth.connect(module1).to(module2);

    expect(module1.outputNode.connect).toHaveBeenCalledWith(module2.inputNode);
  });

  it('should throw if no connection chain is started', () => {
    const synth = new Synth();

    const module1 = {
      outputNode: {
        connect: jest.fn(),
      },
    };

    expect(() => synth.to(module1)).toThrow();
  });

  it('should connect node to audio context', () => {
    const ctx = new AudioContext();
    const synth = new Synth();

    const module = {
      node: {
        connect: jest.fn(),
      },
    };

    synth.connect(module).output();

    expect(module.node.connect).toHaveBeenCalledWith(ctx.destination);
  });

  it('should connect output node to audio context', () => {
    const ctx = new AudioContext();
    const synth = new Synth();

    const module = {
      outputNode: {
        connect: jest.fn(),
      },
    };

    synth.connect(module).output();

    expect(module.outputNode.connect).toHaveBeenCalledWith(ctx.destination);
  });

  it('should throw if no connection chain is active', () => {
    const synth = new Synth();

    expect(() => synth.output()).toThrow();
  });

  it('should ensure module is added', () => {
    const synth = new Synth();

    const osc = { node: 'osc' };

    synth.ensureModuleIsAdded(osc);

    expect(synth.modules).toHaveLength(1);
    expect(synth.modules[0]).toEqual(osc);

    synth.ensureModuleIsAdded(osc);
    expect(synth.modules).toHaveLength(1);
    expect(synth.modules[0]).toEqual(osc);
  });
});
