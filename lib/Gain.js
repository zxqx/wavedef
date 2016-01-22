/*Creating a Gain class to use Globally in multiple
applications (such as multi-channel mixer)
*/
export default class Gain 

{
	
	constructor(ctx)
	{
		this.ctx = ctx;
		this.node = this.ctx.createGain();
	}
	
	setGain(volume)
	{
		return this.node.gain.value = volume;
	}
}