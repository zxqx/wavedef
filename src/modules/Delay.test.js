import 'web-audio-test-api';
import Delay from './Delay';

describe('Delay', () => {
  it('should create delay', () => {
    const delay = new Delay();

    expect(delay.delay.constructor.name).toEqual('DelayNode');
  });

  it('should create feedback node', () => {
    const delay = new Delay();

    expect(delay.feedback.constructor.name).toEqual('Gain');
  });

  it('should create dry/wet nodes', () => {
    const delay = new Delay();

    expect(delay.dry.constructor.name).toEqual('Gain');
    expect(delay.wet.constructor.name).toEqual('Gain');
  });

  it('should set up input/output nodes', () => {
    const delay = new Delay();

    expect(delay.input.constructor.name).toEqual('Gain');
    expect(delay.output.constructor.name).toEqual('Gain');

    expect(delay.inputNode.constructor.name).toEqual('GainNode');
    expect(delay.outputNode.constructor.name).toEqual('GainNode');
  });

  it('should set feedback', () => {
    const delay = new Delay();

    delay.setFeedback(40);

    expect(delay.feedback.getGain()).toEqual(40);
  });

  it('should set delay time', () => {
    const delay = new Delay();

    delay.setDelayTime(79);

    expect(delay.delay.delayTime.value).toEqual(79);
  });

  it('should set bpm sync', () => {
    const delay = new Delay();

    delay.setBpmSync(30, 4);

    expect(delay.getDelayTime()).toEqual(0.5);

    delay.setBpmSync(120, 10);

    expect(delay.getDelayTime()).toEqual(0.05);
  });

  it('should set wet/dry mix', () => {
    const delay = new Delay();

    delay.setWetDryMix(0.75);

    expect(delay.wet.getGain()).toEqual(0.75);
    expect(delay.dry.getGain()).toEqual(0.25);

    delay.setWetDryMix(1);

    expect(delay.wet.getGain()).toEqual(1);
    expect(delay.dry.getGain()).toEqual(0);

    delay.setWetDryMix(0);

    expect(delay.wet.getGain()).toEqual(0);
    expect(delay.dry.getGain()).toEqual(1);
  });

  it('should get feedback', () => {
    const delay = new Delay();

    delay.setFeedback(6);

    expect(delay.getFeedback()).toEqual(6);
  });

  it('should get delay time', () => {
    const delay = new Delay();

    delay.setDelayTime(38);

    expect(delay.getDelayTime()).toEqual(38);
  });
});
