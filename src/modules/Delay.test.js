import 'web-audio-test-api';
import Delay from './Delay';

describe('Delay', () => {
  it('should set default params', () => {
    const delay = new Delay();

    expect(delay.getTime()).toEqual(0.5);
    expect(delay.getFeedback()).toEqual(0.25);
    expect(delay.wet.getGain()).toEqual(0);
    expect(delay.dry.getGain()).toEqual(1);
  });

  it('should override default params', () => {
    const delay = new Delay({
      time: 0.2,
      feedback: 0.64,
      mix: 0.86,
    });

    expect(delay.getTime()).toEqual(0.2);
    expect(delay.getFeedback()).toEqual(0.64);
    expect(delay.wet.getGain()).toEqual(0.86);
    expect(delay.dry.getGain()).toEqual(0.14);
  });

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

    delay.setTime(79);

    expect(delay.delay.delayTime.value).toEqual(79);
  });

  it('should set bpm sync', () => {
    const delay = new Delay();

    delay.setBpmSync(30, 4);

    expect(delay.getTime()).toEqual(0.5);

    delay.setBpmSync(120, 10);

    expect(delay.getTime()).toEqual(0.05);
  });

  it('should set mix', () => {
    const delay = new Delay();

    delay.setMix(0.75);

    expect(delay.wet.getGain()).toEqual(0.75);
    expect(delay.dry.getGain()).toEqual(0.25);

    delay.setMix(1);

    expect(delay.wet.getGain()).toEqual(1);
    expect(delay.dry.getGain()).toEqual(0);

    delay.setMix(0);

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

    delay.setTime(38);

    expect(delay.getTime()).toEqual(38);
  });
});
