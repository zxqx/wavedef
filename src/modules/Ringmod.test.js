import 'web-audio-test-api';
import Ringmod from './Ringmod';

describe('Ringmod', () => {
  it('should set default params', () => {
    const ringmod = new Ringmod();

    expect(ringmod.getType()).toEqual('sine');
    expect(ringmod.getFrequency()).toEqual(100);
    expect(ringmod.getDepth()).toEqual(1);
    expect(ringmod.post.getGain()).toEqual(0);
    expect(ringmod.dry.getGain()).toEqual(1);
  });

  it('should override default params', () => {
    const ringmod = new Ringmod({
      type: 'square',
      frequency: 450,
      depth: 0.4,
      mix: 0.3,
    });

    expect(ringmod.getType()).toEqual('square');
    expect(ringmod.getFrequency()).toEqual(450);
    expect(ringmod.getDepth()).toEqual(0.4);
    expect(ringmod.post.getGain()).toEqual(0.3);
    expect(ringmod.dry.getGain()).toEqual(0.7);
  });

  it('should set frequency', () => {
    const ringmod = new Ringmod();

    ringmod.setFrequency(525);

    expect(ringmod.lfo.getRate()).toEqual(525);
  });

  it('should set depth', () => {
    const ringmod = new Ringmod();

    ringmod.setDepth(0.53);

    expect(ringmod.lfo.gain.getGain()).toEqual(0.53);
  });

  it('should set gain', () => {
    const ringmod = new Ringmod();

    ringmod.setGain(0.25);

    expect(ringmod.gain.getGain()).toEqual(0.25);
  });

  it('should set mix', () => {
    const ringmod = new Ringmod();

    ringmod.setMix(0.35);

    expect(ringmod.post.getGain()).toEqual(0.35);
    expect(ringmod.dry.getGain()).toEqual(0.65);
  });

  it('should set type', () => {
    const ringmod = new Ringmod();

    ringmod.setType('sine');

    expect(ringmod.lfo.osc.getType()).toEqual('sine');
  });

  it('should get frequency', () => {
    const ringmod = new Ringmod();

    ringmod.setFrequency(525);

    expect(ringmod.getFrequency()).toEqual(525);
  });

  it('should get depth', () => {
    const ringmod = new Ringmod();

    ringmod.setDepth(0.53);

    expect(ringmod.getDepth()).toEqual(0.53);
  });

  it('should get gain', () => {
    const ringmod = new Ringmod();

    ringmod.setGain(0.25);

    expect(ringmod.getGain()).toEqual(0.25);
  });

  it('should get type', () => {
    const ringmod = new Ringmod();

    ringmod.setType('triangle');

    expect(ringmod.getType()).toEqual('triangle');
  });
});
