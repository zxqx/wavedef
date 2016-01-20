// Creating a mixer to use in synth
export default class Mixer 
{
	
	constructor(ctx)
	{
		this.ctx = ctx;
		this.node = this.ctx.createGain();
	}
	
	setGain(volume)
	{
		return this.node.value = volume;
	}
}
