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
  }

  /**
   * Add a module to the synth so it's
   * ready to go when we boot up
   */
  addModule(module)
  {
    this._modules.push(module);
  }

  connectToMaster(module)
  {
    module.node.connect(this.ctx.destination);
  }

  /**
   * Connect one module to another
   */
  connect(output, input)
  {
    output.node.connect(input.node);
  }

  /**
   * Boot up the synth
   */
  on()
  {
    console.log('on');
  }
}
