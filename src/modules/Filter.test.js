import 'web-audio-test-api';
import Filter from './Filter';

describe('Filter', () => {
  it('should set default name', () => {
    const filter = new Filter();

    expect(filter.name).toEqual('Filter');
  });

  it('should set name', () => {
    const filter = new Filter('Filter 2');

    expect(filter.name).toEqual('Filter 2');
  });

  it('should create filter node', () => {
    const filter = new Filter();

    expect(filter.node.constructor.name).toEqual('BiquadFilterNode');
  });

  it('should expose types', () => {
    const filter = new Filter();

    expect(filter.types).toEqual([
      'lowpass',
      'highpass',
      'bandpass',
      'notch',
      'allpass',
    ]);
  });

  it('should set frequency', () => {
    const filter = new Filter();

    filter.setFrequency(842);

    expect(filter.node.frequency.value).toEqual(842);
  });

  it('should set resonance', () => {
    const filter = new Filter();

    filter.setResonance(5);

    expect(filter.node.Q.value).toEqual(5);
  });

  it('should set filter type', () => {
    const filter = new Filter();

    filter.setFilterType('notch');

    expect(filter.node.type).toEqual('notch');
  });

  it('should set gain', () => {
    const filter = new Filter();

    filter.setGain(0.8);

    expect(filter.node.gain.value).toEqual(0.8);
  });

  it('should get frequency', () => {
    const filter = new Filter();

    filter.setFrequency(702);

    expect(filter.getFrequency()).toEqual(702);
  });

  it('should get resonance', () => {
    const filter = new Filter();

    filter.setResonance(12);

    expect(filter.getResonance()).toEqual(12);
  });

  it('should get filter type', () => {
    const filter = new Filter();

    filter.setFilterType('highpass');

    expect(filter.getFilterType()).toEqual('highpass');
  });

  it('should get gain', () => {
    const filter = new Filter();

    filter.setGain(0.44);

    expect(filter.getGain()).toEqual(0.44);
  });
});

