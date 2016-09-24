import ctx from 'audio-context';

/**
 * Composable synth container for connecting audio modules
 */
export default class Synth {
  constructor() {
    this._modules = [];
    this._connecting = null;
  }

  /**
   * Recursively add modules and their children to the synth
   * @param {instance} module
   * @return {Synth}
   */
  addModule(module) {
    if (!this._modules.includes(module)) {
      this._modules.push(module);
    }

    if (Array.isArray(module.children)) {
      for (const child of module.children) {
        this.addModule(child);
      }
    }

    return this;
  }

  /**
   * Recursively remove modules and their children from the synth
   * @param {instance} module
   * @return {Synth}
   */
  removeModule(module) {
    if (this._modules.includes(module)) {
      const index = this._modules.indexOf(module);
      this._modules.splice(index, 1);
    }

    if (Array.isArray(module.children)) {
      for (const child of module.children) {
        this.removeModule(child);
      }
    }

    return this;
  }

  /**
   * Get a list of added modules
   * @return {Array}
   */
  getModules() {
    return this._modules;
  }

  /**
   * Start a output->input connection chain
   * @param {instance} param
   * @return {Synth}
   */
  connect(output) {
    this._ensureModuleIsAdded(output);
    this._connecting = output;

    return this;
  }

  /**
   * Chain current output module into a given input
   * Check for `inputNode` and `outputNode` and use `node` otherwise
   * @param {instance} input
   * @return {Synth}
   */
  to(input) {
    if (!this._connecting) {
      throw new Error('connect() must be called with a module before calling to()');
    }

    const inputNode = input.inputNode || input.node;
    const outputNode = this._connecting.outputNode || this._connecting.node;

    this._ensureModuleIsAdded(input);
    outputNode.connect(inputNode);
    this._connecting = input;

    return this;
  }

  /**
   * Hook the last piece of our chain to our audio context
   * @return {Synth}
   */
  output() {
    if (!this._connecting) {
      throw new Error('connect() must be called with a module before calling output()');
    }

    const outputNode = this._connecting.outputNode || this._connecting.node;

    outputNode.connect(ctx.destination);
    this._connecting = null;

    return this;
  }

  /**
   * Given a module, throw an error if it wasn't added with addModule()
   * @param {instance} module
   * @private
   */
  _ensureModuleIsAdded(module) {
    if (!this._modules.includes(module)) {
      throw new Error('Module must be added using addModule() before being connected');
    }
  }
}
