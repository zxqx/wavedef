import WebAudioTestApi from 'web-audio-test-api';
import LFO from './LFO';
import Filter from './Filter';
import Oscillator from './Oscillator';
import Gain from './Gain';

WebAudioTestAPI.setState({
  'AudioNode#disconnect': 'selective',
});

describe ('LFO', () => {
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

  it('should connect to destination', () => {
    const lfo = new LFO();
    const filter = new Filter();

    const spy = jest.spyOn(lfo.gain.node, 'connect');

    lfo.modulate(filter.node.frequency);

    expect(spy).toHaveBeenCalled();
    expect(lfo.getDestinations()).toEqual([filter.node.frequency]);
  });

  it('should connect to multiple destinations', () => {
    const lfo = new LFO();
    const filter = new Filter();
    const osc = new Oscillator();
    const gain = new Gain();

    const spy = jest.spyOn(lfo.gain.node, 'connect');

    lfo.modulate(filter.node.frequency);
    lfo.modulate(osc.node.frequency);
    lfo.modulate(gain.node.gain);

    expect(spy).toHaveBeenCalledWith(filter.node.frequency);
    expect(spy).toHaveBeenCalledWith(osc.node.frequency);
    expect(spy).toHaveBeenCalledWith(gain.node.gain);
    expect(lfo.destinations).toEqual([
      filter.node.frequency,
      osc.node.frequency,
      gain.node.gain,
    ]);
  });

  it('should disconnect from destination', () => {
    const lfo = new LFO();
    const filter = new Filter();

    const spy = jest.spyOn(lfo.gain.node, 'disconnect');

    lfo.modulate(filter.node.frequency);
    lfo.disconnect(filter.node.frequency);

    expect(spy).toHaveBeenCalledWith(filter.node.frequency);
    expect(lfo.destinations).toEqual([]);
  });

  it('should disconnect from all destinations', () => {
    const lfo = new LFO();
    const filter = new Filter();
    const osc = new Oscillator();
    const gain = new Gain();

    const spy = jest.spyOn(lfo.gain.node, 'disconnect');

    lfo.modulate(filter.node.frequency);
    lfo.modulate(osc.node.frequency);
    lfo.modulate(gain.node.gain);
    lfo.disconnectAll();

    expect(spy).toHaveBeenCalledWith(filter.node.frequency);
    expect(spy).toHaveBeenCalledWith(osc.node.frequency);
    expect(spy).toHaveBeenCalledWith(gain.node.gain);
    expect(lfo.destinations).toEqual([]);
  });
})
