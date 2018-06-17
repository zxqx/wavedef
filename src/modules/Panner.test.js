import WebAudioTestApi from 'web-audio-test-api';
import Panner from './Panner';

WebAudioTestApi.setState({
  'AudioContext#createStereoPanner': 'enabled',
});

describe('Panner', () => {
  it('should set default params', () => {
    const panner = new Panner();

    expect(panner.getPan()).toEqual(0);
  });

  it('should override default params', () => {
    const panner = new Panner({
      pan: 0.4,
    });

    expect(panner.getPan()).toEqual(0.4);
  });

  it('should create panner node', () => {
    const panner = new Panner();

    expect(panner.node.constructor.name).toEqual('StereoPannerNode');
  });

  it('should set pan position', () => {
    const panner = new Panner();

    panner.setPan(0.2);

    expect(panner.node.pan.value).toEqual(0.2);
  });

  it('should get pan position', () => {
    const panner = new Panner();

    panner.setPan(0.72);

    expect(panner.getPan()).toEqual(0.72);
  });
});
