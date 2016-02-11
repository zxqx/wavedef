import ctx from 'audio-context';

export default class Filter
{
  constructor()
  {
    this.node = ctx.createBiquadFilter();
  }

  setFrequency(frequency)
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
  
  setFilterGain(gain)
  {
    this.node.gain.value = gain;

  getFrequency()
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
  
  getFilterGain()
  {
    return this.node.gain.value;
  }
  
}
