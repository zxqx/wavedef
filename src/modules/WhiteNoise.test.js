import 'web-audio-test-api';
import WhiteNoise from './WhiteNoise';

describe('White Noise', () => {
  it('should create white noise node', () => {
    const whiteNoise = new WhiteNoise();

    expect(whiteNoise.node.constructor.name).toEqual('AudioBufferSourceNode');
  });

  it('should loop node', () => {
    const whiteNoise = new WhiteNoise();

    expect(whiteNoise.node.loop).toEqual(true);
  });
});
