/**
 * Composable synth for instantiating and
 * connecting audio modules
 */
export default class Synth
{
  constructor(ctx)
  {
    this.ctx = ctx;
    this._modules = [];
    this._connecting = null;
  }

  /**
   * Track added modules
   * @param {instance} module
   * @return {Synth}
   */
  addModule(module)
  {
    this._modules.push(module);

    return this;
  }

  /**
   * Declare a connecting module
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
   * Chain connecting module into a given input
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
   * Hook the synth up to our audio context
   * @return {Synth}
   */
  output()
  {
    this._connecting.node.connect(this.ctx.destination);
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
