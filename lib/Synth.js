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
   */
  addModule(module)
  {
    this._modules.push(module);

    return this;
  }

  /**
   * Declare a connecting module
   */
  connect(output)
  {
    this._connecting = output;

    return this;
  }

  /**
   * Chain connecting module into a given input
   */
  to(input)
  {
    this._connecting.node.connect(input.node);
    this._connecting = input;

    return this;
  }

  /**
   * Hook the synth up to our audio context
   */
  output()
  {
    this._connecting.node.connect(this.ctx.destination);
  }
}
