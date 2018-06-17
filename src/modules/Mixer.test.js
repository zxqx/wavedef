import 'web-audio-test-api';
import Mixer from './Mixer';

describe('Mixer', () => {
  it('should set default channel count', () => {
    const mixer = new Mixer();

    expect(mixer.channels).toEqual(2);
  });

  it('should set channel count', () => {
    const mixer = new Mixer(8);

    expect(mixer.channels).toEqual(8);
  });

  it('should create gain instance', () => {
    const mixer = new Mixer();

    expect(mixer.gain.constructor.name).toEqual('Gain');
  });

  it('should expose gain node', () => {
    const mixer = new Mixer();

    expect(mixer.node.constructor.name).toEqual('GainNode');
  });

  it('should create channels', () => {
    const mixer = new Mixer(4);

    expect(mixer.children.length).toEqual(4);

    expect(mixer.children.every(channel =>
      channel.constructor.name === 'MixerChannel'
    )).toBe(true);
  });

  it('should get channel', () => {
    const mixer = new Mixer(6);

    expect(mixer.channel(5)).toEqual(mixer.children[4]);
  });
});
