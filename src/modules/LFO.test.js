import 'web-audio-test-api';
import LFO from './LFO';
import Filter from './Filter';

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

  it('should add a destination', () => {
    const lfo = new LFO();
    const filter = new Filter();

    lfo.modulate(filter.node.frequency);

    expect(lfo.getDestinations()).toEqual([filter.node.frequency]);
  });

  it('should connect to destination', () => {
    const lfo = new LFO();
    const filter = new Filter();

    const spy = jest.spyOn(lfo.gain.node, 'connect');

    lfo.modulate(filter.node.frequency);

    expect(spy).toHaveBeenCalled();
  });
})
