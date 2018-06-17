import WebAudioTestApi from 'web-audio-test-api';
import Panner from './Panner';

WebAudioTestApi.setState({
  'AudioContext#createStereoPanner': 'enabled',
});

describe('Panner', () => {
  it('should create panner node', () => {
    const panner = new Panner();

    expect(panner.node.constructor.name).toEqual('StereoPannerNode');
  });

  it('should set pan position', () => {
    const panner = new Panner();

    panner.setPanPosition(0.2);

    expect(panner.node.pan.value).toEqual(0.2);
  });

  it('should get pan position', () => {
    const panner = new Panner();

    panner.setPanPosition(0.72);

    expect(panner.getPanPosition()).toEqual(0.72);
  });
});
