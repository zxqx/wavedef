import 'web-audio-test-api';
import LFO from './LFO';

describe ('LFO', () => {
  it('should set default name', () => {
    const lfo = new LFO();

    expect(lfo.name).toEqual('LFO');
  });

  it('should set name', () => {
    const lfo = new LFO('Woobles');

    expect(lfo.name).toEqual('Woobles');
  });

  it('should set depth', () => {
    const lfo = new LFO();

    lfo.setDepth(0.5);

    expect(lfo.getDepth()).toEqual(0.5);
  });

  it('should set waveform type', () => {
    const lfo = new LFO();

    lfo.setWaveformType('sawtooth');

    expect(lfo.getWaveformType()).toEqual('sawtooth');
  });

  it('should set frequency', () => {
    const lfo = new LFO();

    lfo.setFrequency(777);

    expect(lfo.getFrequency()).toEqual(777);
  });

  it('should set calculate bpm sync', () => {
    const lfo = new LFO();

    lfo.bpmSync(120,0.5);

    expect(lfo.getFrequency()).toEqual(1);
  });

})
