import WebAudioTestApi from 'web-audio-test-api';
import LFO from './LFO';
import Filter from './Filter';
import Oscillator from './Oscillator';
import Gain from './Gain';
import param from '../helpers/param';

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

    lfo.modulate(filter::param('frequency'));

    expect(spy).toHaveBeenCalled();
    expect(lfo.getDestinations()).toEqual([filter::param('frequency')]);
  });

  it('should connect to multiple destinations', () => {
    const lfo = new LFO();
    const filter = new Filter();
    const osc = new Oscillator();
    const gain = new Gain();

    const spy = jest.spyOn(lfo.gain.node, 'connect');

    lfo.modulate(filter::param('frequency'));
    lfo.modulate(osc::param('frequency'));
    lfo.modulate(gain::param('gain'));

    expect(spy).toHaveBeenCalledWith(filter::param('frequency'));
    expect(spy).toHaveBeenCalledWith(osc::param('frequency'));
    expect(spy).toHaveBeenCalledWith(gain::param('gain'));
    expect(lfo.destinations).toEqual([
      filter::param('frequency'),
      osc::param('frequency'),
      gain::param('gain'),
    ]);
  });

  it('should disconnect from destination', () => {
    const lfo = new LFO();
    const filter = new Filter();

    const spy = jest.spyOn(lfo.gain.node, 'disconnect');

    lfo.modulate(filter::param('frequency'));
    lfo.disconnect(filter::param('frequency'));

    expect(spy).toHaveBeenCalledWith(filter::param('frequency'));
    expect(lfo.destinations).toEqual([]);
  });

  it('should disconnect from all destinations', () => {
    const lfo = new LFO();
    const filter = new Filter();
    const osc = new Oscillator();
    const gain = new Gain();

    const spy = jest.spyOn(lfo.gain.node, 'disconnect');

    lfo.modulate(filter::param('frequency'));
    lfo.modulate(osc::param('frequency'));
    lfo.modulate(gain::param('gain'));
    lfo.disconnectAll();

    expect(spy).toHaveBeenCalledWith(filter::param('frequency'));
    expect(spy).toHaveBeenCalledWith(osc::param('frequency'));
    expect(spy).toHaveBeenCalledWith(gain::param('gain'));
    expect(lfo.destinations).toEqual([]);
  });
})
