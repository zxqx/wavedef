import ctx from 'audio-context';

/**
 * Composable synth container for connecting
 * audio modules
 */
export default class Synth
{
  constructor()
  {
    this._modules = [];
    this._connecting = null;
  }

  /**
   * Recursively add modules to the synth
   * @param {instance} module
   * @return {Synth}
   */
  addModule(module)
  {
    if (!this._modules.includes(module)) {
      this._modules.push(module);
    }

    if (module.children && module.children.length) {
      for (let child of module.children) {
        this.addModule(child);
      }
    }

    return this;
  }

  /**
   * @param {instance} module
   * @return {Synth}
   */
  removeModule(module)
  {
    if (this._modules.includes(module)) {
      let index = this._modules.indexOf(module);
      this._modules.splice(index, 1);
    }

    return this;
  }

  /**
   * Get a list of added modules
   * @return {Array}
   */
  getModules()
  {
    return this._modules;
  }

  /**
   * Start a output->input connection chain
   * @param {instance} param
   * @return {Synth}
   */
  connect(output)
  {
    this._ensureModuleIsAdded(output);
    this._connecting = output;

    return this;
  }

  /**
   * Chain current output module into a given input
   * @param {instance} input
   * @return {Synth}
   */
  to(input)
  {
    this._ensureModuleIsAdded(input);
    this._connecting.node.connect(input.node);
    this._connecting = input;

    return this;
  }

  /**
   * Hook the last piece of our chain to our audio context
   * @return {Synth}
   */
  output()
  {
    this._connecting.node.connect(ctx.destination);
    this._connecting = null;

    return this;
  }

  /**
   * Given a module, throw an error if it wasn't added with
   * addModule()
   * @param {instance} module
   * @private
   */
  _ensureModuleIsAdded(module)
  {
    if (!this._modules.includes(module)) {
      throw new Error('Module must be added using addModule() before being connected');
    }
  }
}
