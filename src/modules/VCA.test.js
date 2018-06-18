import 'web-audio-test-api';
import VCA from './VCA';

describe('VCA', () => {
  it('should set default params', () => {
    const vca = new VCA();

    expect(vca.getGain()).toEqual(0);
  });

  it('should override default params', () => {
    const vca = new VCA({
      gain: 0.3,
    });

    expect(vca.getGain()).toEqual(0.3);
  });

  it('should create gain node', () => {
    const vca = new VCA();

    expect(vca.node.constructor.name).toEqual('GainNode');
  });

  it('should set default gain value', () => {
    const vca = new VCA();

    expect(vca.getGain()).toEqual(0);
  });
});
