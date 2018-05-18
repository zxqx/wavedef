import 'web-audio-test-api';
import MixerChannel from './MixerChannel';

describe('MixerChannel', () => {
  it('should create input gain instance', () => {
    const mixerChannel = new MixerChannel();

    expect(mixerChannel.input.constructor.name).toEqual('Gain');
  });

  it('should create output gain instance', () => {
    const mixerChannel = new MixerChannel();

    expect(mixerChannel.output.constructor.name).toEqual('Gain');
  });

  it('should expose input node', () => {
    const mixerChannel = new MixerChannel();

    expect(mixerChannel.inputNode.constructor.name).toEqual('GainNode');
  });

  it('should expose output node', () => {
    const mixerChannel = new MixerChannel();

    expect(mixerChannel.outputNode.constructor.name).toEqual('GainNode');
  });

  it('should set gain', () => {
    const mixerChannel = new MixerChannel();

    mixerChannel.setGain(0.51);

    expect(mixerChannel.outputNode.gain.value).toEqual(0.51);
  });

  it('should toggle on', () => {
    const mixerChannel = new MixerChannel();

    mixerChannel.toggleOn();

    expect(mixerChannel.inputNode.gain.value).toEqual(1);
  });

  it('should toggle off', () => {
    const mixerChannel = new MixerChannel();

    mixerChannel.toggleOff();

    expect(mixerChannel.inputNode.gain.value).toEqual(0);
  });

  it('should toggle', () => {
    const mixerChannel = new MixerChannel();

    mixerChannel.toggleOn();

    expect(mixerChannel.inputNode.gain.value).toEqual(1);

    mixerChannel.toggleOff();

    expect(mixerChannel.inputNode.gain.value).toEqual(0);

    mixerChannel.toggleOn();

    expect(mixerChannel.inputNode.gain.value).toEqual(1);
  });
});
