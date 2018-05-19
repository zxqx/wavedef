import 'web-audio-test-api';
import Ringmod from './Ringmod';

describe ('Ringmod', () => {
  it('should set default name', () => {
    const ringmod = new Ringmod();

    expect(ringmod.name).toEqual('Ringmod');
  });

  it('should set name', () => {
    const ringmod = new Ringmod('Fooler');

    expect(ringmod.name).toEqual('Fooler');
  });

  it('should set frequency', () => {
    const ringmod = new Ringmod();

    ringmod.setFrequency(525);

    expect(ringmod.lfo.getFrequency()).toEqual(525);
  });

  it('should set depth', () => {
    const ringmod = new Ringmod();

    ringmod.setDepth(0.53);

    expect(ringmod.lfo.gain.getGain()).toEqual(0.53)
  });

  it('should set gain', () => {
    const ringmod = new Ringmod();

    ringmod.setGain(0.25);

    expect(ringmod.gain.getGain()).toEqual(0.25)
  });

  it('should set wet/dry mix', () => {
    const ringmod = new Ringmod();

    ringmod.setWetDryMix(0.35);

    expect(ringmod.post.getGain()).toEqual(0.35);
    expect(ringmod.dry.getGain()).toEqual(0.65);
  });

  it('should set waveform', () => {
    const ringmod = new Ringmod();

    ringmod.setWaveformType('sine');

    expect(ringmod.lfo.osc.node.type).toEqual('sine');
  })
})
