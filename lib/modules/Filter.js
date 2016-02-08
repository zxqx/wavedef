import ctx from 'audio-context';

export default class Filter
{
  constructor()
  {
    this.node = ctx.createBiquadFilter();
  }

  setFreq(frequency)
  {
    this.node.frequency.value = frequency;
  }

  setQ(resonance)
  {
    this.node.Q.value = resonance;
  }

  setFilterType(type)
  {
    this.node.type = type;
  }

  getFreq()
  {
    return this.node.frequency.value;
  }

  getQ()
  {
    return this.node.Q.value;
  }

  getFilterType()
  {
    return this.node.type;
  }
}
