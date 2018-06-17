import addChildModule from './addChildModule';

describe('Add child module helper', () => {
  it('should add child module', () => {
    const parent = {
      node: 'parent input',
    };

    const module = {
      name: 'module',
      node: {
        connect: jest.fn(),
      },
    };

    const module2 = {
      name: 'module 2',
      node: {
        connect: jest.fn(),
      },
    };

    parent::addChildModule(module);

    expect(parent.children).toHaveLength(1);
    expect(parent.children[0]).toEqual(module);

    parent::addChildModule(module2);

    expect(parent.children).toHaveLength(2);
    expect(parent.children[1]).toEqual(module2);
  });

  it('should connect child node to parent node', () => {
    const parent = {
      node: 'parent input',
    };

    const module = {
      node: {
        connect: jest.fn(),
      },
    };

    parent::addChildModule(module);

    expect(module.node.connect).toHaveBeenCalledWith(parent.node);
  });

  it('should connect child node to parent input node', () => {
    const parent = {
      inputNode: 'parent input',
    };

    const module = {
      node: {
        connect: jest.fn(),
      },
    };

    parent::addChildModule(module);

    expect(module.node.connect).toHaveBeenCalledWith(parent.inputNode);
  });

  it('should connect child output node to parent input node', () => {
    const parent = {
      inputNode: 'parent input',
    };

    const module = {
      outputNode: {
        connect: jest.fn(),
      },
    };

    parent::addChildModule(module);

    expect(module.outputNode.connect).toHaveBeenCalledWith(parent.inputNode);
  });
});
