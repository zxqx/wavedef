import applyParams from './applyParams';

describe('Apply params helper', () => {
  it('should apply params', () => {
    const envelope = {
      defaults: {
        attack: 0,
        decay: 0.1,
        sustain: 1,
        release: 0.5,
      },
      setAttack: (attack) => {
        envelope.attack = attack;
      },
      setDecay: (decay) => {
        envelope.decay = decay;
      },
      setSustain: (sustain) => {
        envelope.sustain = sustain;
      },
      setRelease: (release) => {
        envelope.release = release;
      },
    };

    envelope::applyParams({
      attack: 1,
      sustain: 0.6,
    });

    expect(envelope.attack).toEqual(1);
    expect(envelope.decay).toEqual(0.1);
    expect(envelope.sustain).toEqual(0.6);
    expect(envelope.release).toEqual(0.5);
  });
});
