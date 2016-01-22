// Creating a multi-channel mixer to use in synth
import Gain from './Gain.js';
export default class Mixer
{

	constructor(ctx)
	{
		this.ctx = ctx;
		this.node = this.ctx.createChannelMerger(3);
		this.children = [];

		this.addChildModule('ch1', new Gain(ctx));
		this.addChildModule('ch2', new Gain(ctx));
		this.addChildModule('ch3', new Gain(ctx));

		this.ch1.node.connect(this.node);
		this.ch2.node.connect(this.node);
		this.ch3.node.connect(this.node);
	}

  addChildModule(id, module)
  {
    if (this[id]) {
      throw new Error('Child module id must be unique');
    }

    this[id] = module;
    this.children.push(module);
  }
}
