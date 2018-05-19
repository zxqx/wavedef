import 'web-audio-test-api';
import Ringmod from './Ringmod';

describe ('Ringmod', () => {
  it('should set default name', () => {
    const ringmod = new Ringmod();

    expect(ringmod.name).toEqual('Ringmod');
  });

  it('should set name', () => {
    const ringmod = new Ringmod('Fooler');

    expect(ringmod.name).toEqual('Fooler');
  });

  it('should set frequency', () => {
    const ringmod = new Ringmod();

    ringmod.setFrequency(525);

    expect(ringmod.lfo.getFrequency()).toEqual(525);
  });
})
