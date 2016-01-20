export default class Filter
{

	constructior(ctx)
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

	filterType(type)
	{
		return this.node.type = type;
	}
}