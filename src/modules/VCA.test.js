import 'web-audio-test-api';
import VCA from './VCA';

describe('VCA', () => {
  it('should create gain node', () => {
    const vca = new VCA();

    expect(vca.node.constructor.name).toEqual('GainNode');
  });

  it('should set default gain value', () => {
    const vca = new VCA();

    expect(vca.getGain()).toEqual(0);
  });
});
