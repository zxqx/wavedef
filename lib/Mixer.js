// Creating a multi-channel mixer to use in synth
import Gain from './Gain.js';
export default class Mixer 
{
	
	constructor(ctx)
	{
		this.ch1 = new Gain(ctx);	//create channels 1-3
		this.ch2 = new Gain(ctx);
		this.ch3 = new Gain(ctx);
		this.ctx = ctx;
		this.node = this.ctx.createChannelMerger(6);
		this.ch1.node.connect(this.node);
		this.ch1.node.connect(this.node);
		this.ch2.node.connect(this.node);
		this.ch2.node.connect(this.node);
		this.ch3.node.connect(this.node);
	}
	
}
