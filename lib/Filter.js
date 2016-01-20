export default class Filter
{

	constructor(ctx)
	{
		this.ctx = ctx;
		this.node = this.ctx.createBiquadFilter();
	}

	setFreq(frequency)
	{
		return this.node.frequency.value = frequency;
	}

	setQ(resonance)
	{
		return this.node.Q.value = resonance;
	}

	setFilterType(type)
	{
		return this.node.type = type;
	}
}