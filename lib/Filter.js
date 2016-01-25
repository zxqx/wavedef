import ctx from 'audio-context';

export default class Filter
{
  constructor()
  {
    this.node = ctx.createBiquadFilter();
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

  getFreq(frequency)
  {
    return this.node.frequency.value;
  }

  getQ(resonance)
  {
    return this.node.Q.value;
  }

  getFilterType(type)
  {
    return this.node.type;
  }
}
