import 'web-audio-test-api';
import TunaPhaser from './TunaPhaser';

describe('TunaPhaser', () => {
  it('should set rate', () => {
    const phaser = new TunaPhaser();

    phaser.setRate(0.24);

    expect(phaser.node.rate).toEqual(0.24);
  });

  it('should set depth', () => {
    const phaser = new TunaPhaser();

    phaser.setDepth(60);

    expect(phaser.node.depth).toEqual(60);
  });

  it('should set feedback', () => {
    const phaser = new TunaPhaser();

    phaser.setFeedback(17);

    expect(phaser.node.feedback).toEqual(17);
  });

  it('should set stereo phase', () => {
    const phaser = new TunaPhaser();

    phaser.setStereoPhase(13);

    expect(phaser.node.stereoPhase).toEqual(13);
  });

  it('should set base modulation frequency', () => {
    const phaser = new TunaPhaser();

    phaser.setBaseModulationFrequency(432);

    expect(phaser.node.baseModulationFrequency).toEqual(432);
  });

  it('should set bypass', () => {
    const phaser = new TunaPhaser();

    phaser.setBypass(1);

    expect(phaser.node.bypass).toEqual(1);
  });
});
