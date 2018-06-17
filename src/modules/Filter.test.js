import 'web-audio-test-api';
import Filter from './Filter';

describe('Filter', () => {
  it('should set default params', () => {
    const filter = new Filter();

    expect(filter.getCutoff()).toEqual(350);
    expect(filter.getResonance()).toEqual(1);
    expect(filter.getType()).toEqual('lowpass');
  });

  it('should override default params', () => {
    const filter = new Filter({
      type: 'highpass',
      cutoff: 860,
      resonance: 3.5,
    });

    expect(filter.getCutoff()).toEqual(860);
    expect(filter.getResonance()).toEqual(3.5);
    expect(filter.getType()).toEqual('highpass');
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

  it('should set cutoff', () => {
    const filter = new Filter();

    filter.setCutoff(842);

    expect(filter.node.frequency.value).toEqual(842);
  });

  it('should set resonance', () => {
    const filter = new Filter();

    filter.setResonance(5);

    expect(filter.node.Q.value).toEqual(5);
  });

  it('should set filter type', () => {
    const filter = new Filter();

    filter.setType('notch');

    expect(filter.node.type).toEqual('notch');
  });

  it('should set gain', () => {
    const filter = new Filter();

    filter.setGain(0.8);

    expect(filter.node.gain.value).toEqual(0.8);
  });

  it('should get cutoff', () => {
    const filter = new Filter();

    filter.setCutoff(702);

    expect(filter.getCutoff()).toEqual(702);
  });

  it('should get resonance', () => {
    const filter = new Filter();

    filter.setResonance(12);

    expect(filter.getResonance()).toEqual(12);
  });

  it('should get type', () => {
    const filter = new Filter();

    filter.setType('highpass');

    expect(filter.getType()).toEqual('highpass');
  });

  it('should get gain', () => {
    const filter = new Filter();

    filter.setGain(0.44);

    expect(filter.getGain()).toEqual(0.44);
  });
});
