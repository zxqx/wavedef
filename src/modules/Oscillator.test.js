import 'web-audio-test-api';
import Oscillator from './Oscillator';

describe('Oscillator', () => {
  it('should set default params', () => {
    const osc = new Oscillator();

    expect(osc.getType()).toEqual('sine');
    expect(osc.getFrequency()).toEqual(440);
    expect(osc.getDetune()).toEqual(0);
  });

  it('should override default params', () => {
    const osc = new Oscillator({
      type: 'triangle',
      frequency: 800,
      detune: 12,
    });

    expect(osc.getType()).toEqual('triangle');
    expect(osc.getFrequency()).toEqual(800);
    expect(osc.getDetune()).toEqual(12);
  });

  it('should create oscillator node', () => {
    const osc = new Oscillator();

    expect(osc.node.constructor.name).toEqual('OscillatorNode');
  });

  it('should start oscillator on instantiation', () => {
    const spy = jest.spyOn(Oscillator.prototype, 'start');
    new Oscillator();

    expect(spy).toHaveBeenCalled();

    spy.mockReset();
    spy.mockRestore();
  });

  it('should start oscillator node', () => {
    const spy = jest.spyOn(OscillatorNode.prototype, 'start');
    new Oscillator();

    expect(spy).toHaveBeenCalled();

    spy.mockReset();
    spy.mockRestore();
  });

  it('should stop oscillator node', () => {
    const spy = jest.spyOn(OscillatorNode.prototype, 'stop');
    const osc = new Oscillator();

    osc.stop();

    expect(spy).toHaveBeenCalled();

    spy.mockReset();
    spy.mockRestore();
  });

  it('should set frequency', () => {
    const osc = new Oscillator();

    osc.setFrequency(700);

    expect(osc.node.frequency.value).toEqual(700);
  });

  it('should set detune', () => {
    const osc = new Oscillator();

    osc.setDetune(12);

    expect(osc.node.detune.value).toEqual(12);
  });

  it('should set type', () => {
    const osc = new Oscillator();

    osc.setType('sawtooth');

    expect(osc.node.type).toEqual('sawtooth');
  });

  it('should get frequency', () => {
    const osc = new Oscillator();

    osc.setFrequency(552);

    expect(osc.getFrequency()).toEqual(552);
  });

  it('should get detune', () => {
    const osc = new Oscillator();

    osc.setDetune(16);

    expect(osc.getDetune()).toEqual(16);
  });

  it('should get type', () => {
    const osc = new Oscillator();

    osc.setType('triangle');

    expect(osc.getType()).toEqual('triangle');
  });
});
