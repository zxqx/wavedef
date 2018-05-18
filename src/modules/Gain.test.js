import 'web-audio-test-api';
import Gain from './Gain';

describe('Gain', () => {
  it('should create gain node', () => {
    const gain = new Gain();

    expect(gain.node.constructor.name).toEqual('GainNode');
  });

  it('should set gain', () => {
    const gain = new Gain();

    gain.setGain(0.74);

    expect(gain.node.gain.value).toEqual(0.74);
  });

  it('should get gain', () => {
    const gain = new Gain();

    gain.setGain(0.98);

    expect(gain.getGain()).toEqual(0.98);
  });
});
