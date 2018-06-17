import WebAudioTestApi from 'web-audio-test-api';
import LFO from './LFO';
import Filter from './Filter';
import Oscillator from './Oscillator';
import Gain from './Gain';
import param from '../helpers/param';

WebAudioTestApi.setState({
  'AudioNode#disconnect': 'selective',
});

describe('LFO', () => {
  it('should set default params', () => {
    const lfo = new LFO();

    expect(lfo.getType()).toEqual('sine');
    expect(lfo.getDepth()).toEqual(100);
    expect(lfo.getRate()).toEqual(1);
  });

  it('should override default params', () => {
    const lfo = new LFO({
      type: 'sawtooth',
      depth: 180,
      rate: 36,
    });

    expect(lfo.getType()).toEqual('sawtooth');
    expect(lfo.getDepth()).toEqual(180);
    expect(lfo.getRate()).toEqual(36);
  });

  it('should set depth', () => {
    const lfo = new LFO();

    lfo.setDepth(0.5);

    expect(lfo.getDepth()).toEqual(0.5);
  });

  it('should set type', () => {
    const lfo = new LFO();

    lfo.setType('sawtooth');

    expect(lfo.getType()).toEqual('sawtooth');
  });

  it('should set rate', () => {
    const lfo = new LFO();

    lfo.setRate(777);

    expect(lfo.getRate()).toEqual(777);
  });

  it('should set calculate bpm sync', () => {
    const lfo = new LFO();

    lfo.bpmSync(120, 0.5);

    expect(lfo.getRate()).toEqual(1);
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
});
