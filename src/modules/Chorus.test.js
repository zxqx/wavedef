import WebAudioTestApi from 'web-audio-test-api';
import Chorus from './Chorus';

WebAudioTestApi.setState({
  'AudioContext#createStereoPanner': 'enabled',
});

describe('Chorus', () => {
  it('should set default params', () => {
    const chorus = new Chorus();

    expect(chorus.getOffset1Time()).toEqual(0.006);
    expect(chorus.getOffset2Time()).toEqual(0.02);
    expect(chorus.getMovement()).toEqual(0.005);
    expect(chorus.offset1pan.getPanPosition()).toEqual(-0.2);
    expect(chorus.offset2pan.getPanPosition()).toEqual(0.2);
    expect(chorus.direct.getGain()).toEqual(0);
    expect(chorus.mix.getGain()).toEqual(0.5);
  });

  it('should override default params', () => {
    const chorus = new Chorus({
      offset1Time: 0.3,
      offset2Time: 0.22,
      movement: 0.308,
      width: 0.4,
      mix: 0.5,
    });

    expect(chorus.getOffset1Time()).toEqual(0.3);
    expect(chorus.getOffset2Time()).toEqual(0.22);
    expect(chorus.getMovement()).toEqual(0.308);
    expect(chorus.offset1pan.getPanPosition()).toEqual(-0.4);
    expect(chorus.offset2pan.getPanPosition()).toEqual(0.4);
    expect(chorus.direct.getGain()).toEqual(0.5);
    expect(chorus.mix.getGain()).toEqual(0.25);
  });

  it('should set up direct and mix nodes', () => {
    const chorus = new Chorus();

    expect(chorus.direct.constructor.name).toEqual('Gain');
    expect(chorus.mix.constructor.name).toEqual('Gain');
  });

  it('should set up offset nodes', () => {
    const chorus = new Chorus();

    expect(chorus.offset1.constructor.name).toEqual('Delay');
    expect(chorus.offset2.constructor.name).toEqual('Delay');
    expect(chorus.offset1pan.constructor.name).toEqual('Panner');
    expect(chorus.offset2pan.constructor.name).toEqual('Panner');
  });

  it('should set up lfo node', () => {
    const chorus = new Chorus();

    expect(chorus.lfo.constructor.name).toEqual('LFO');
  });

  it('should set up input/output nodes', () => {
    const chorus = new Chorus();

    expect(chorus.input.constructor.name).toEqual('Gain');
    expect(chorus.output.constructor.name).toEqual('Gain');

    expect(chorus.inputNode.constructor.name).toEqual('GainNode');
    expect(chorus.outputNode.constructor.name).toEqual('GainNode');
  });

  it('should set default internal values', () => {
    const chorus = new Chorus();

    expect(chorus.offset1.getFeedback()).toEqual(0);
    expect(chorus.offset2.getFeedback()).toEqual(0);
    expect(chorus.offset1.wet.getGain()).toEqual(1);
    expect(chorus.offset1.dry.getGain()).toEqual(0);
    expect(chorus.offset2.wet.getGain()).toEqual(1);
    expect(chorus.offset2.dry.getGain()).toEqual(0);
    expect(chorus.lfo.getDepth()).toEqual(0.01);
  });

  it('should modulate offset nodes', () => {
    const chorus = new Chorus();

    expect(chorus.lfo.destinations).toEqual([
      chorus.offset1.delay.delayTime,
      chorus.offset2.delay.delayTime,
    ]);
  });

  it('should set offset 1 delay time', () => {
    const chorus = new Chorus();
    chorus.setOffset1Time(0.24);

    expect(chorus.offset1.getTime()).toEqual(0.24);
  });

  it('should set offset 2 delay time', () => {
    const chorus = new Chorus();
    chorus.setOffset2Time(0.37);

    expect(chorus.offset2.getTime()).toEqual(0.37);
  });

  it('should set offset 1 wet/dry mix', () => {
    const chorus = new Chorus();
    chorus.setOffset1WetDryMix(0.75);

    expect(chorus.offset1.wet.getGain()).toEqual(0.75);
    expect(chorus.offset1.dry.getGain()).toEqual(0.25);
  });

  it('should set offset 2 wet/dry mix', () => {
    const chorus = new Chorus();
    chorus.setOffset2WetDryMix(0.38);

    expect(chorus.offset2.wet.getGain()).toEqual(0.38);
    expect(chorus.offset2.dry.getGain()).toEqual(0.62);
  });

  it('should set movement', () => {
    const chorus = new Chorus();
    chorus.setMovement(30);

    expect(chorus.lfo.getFrequency()).toEqual(30);
  });

  it('should set width', () => {
    const chorus = new Chorus();
    chorus.setWidth(0.8);

    expect(chorus.offset1pan.getPanPosition()).toEqual(-0.8);
    expect(chorus.offset2pan.getPanPosition()).toEqual(0.8);
  });

  it('should set wet/dry mix', () => {
    const chorus = new Chorus();
    chorus.setMix(0.2);

    expect(chorus.direct.getGain()).toEqual(0.8);
    expect(chorus.mix.getGain()).toEqual(0.1);
  });

  it('should get offset 1 delay time', () => {
    const chorus = new Chorus();
    chorus.setOffset1Time(0.7);

    expect(chorus.getOffset1Time()).toEqual(0.7);
  });

  it('should get offset 2 delay time', () => {
    const chorus = new Chorus();
    chorus.setOffset2Time(0.12);

    expect(chorus.getOffset2Time()).toEqual(0.12);
  });

  it('should get movement', () => {
    const chorus = new Chorus();
    chorus.setMovement(48);

    expect(chorus.getMovement()).toEqual(48);
  });
});
