import Envelope from './index';
import 'web-audio-test-api';

describe('Envelope', () => {
  it('should modulate', () => {
    const envelope = new Envelope();
    const destination = { node: 'osc' };

    envelope.modulate(destination);

    expect(envelope.destination).toEqual(destination);
  });

  it('should set attack', () => {
    const envelope = new Envelope();

    envelope.setAttack(0.5829127);

    expect(envelope.attack).toEqual(0.5829127);
  });

  it('should set decay', () => {
    const envelope = new Envelope();

    envelope.setDecay(0.2);

    expect(envelope.decay).toEqual(0.2);
  });

  it('should set sustain', () => {
    const envelope = new Envelope();

    envelope.setSustain(0.99);

    expect(envelope.sustain).toEqual(0.99);
  });

  it('should set release', () => {
    const envelope = new Envelope();

    envelope.setRelease(1.57002);

    expect(envelope.release).toEqual(1.57002);
  });

  it('should set depth', () => {
    const envelope = new Envelope();

    envelope.setDepth(162);

    expect(envelope.depth).toEqual(162);
  });

  it('should set start', () => {
    const envelope = new Envelope();

    envelope.setStart(441);

    expect(envelope.start).toEqual(441);
  });

  it('should trigger ADS', () => {
    const ctx = new AudioContext();
    const envelope = new Envelope();
    const node = ctx.createGain();

    envelope
      .setAttack(0.8)
      .setDecay(0.2)
      .setSustain(0.5);

    envelope.modulate(node.gain);
    envelope.triggerADS();

    ctx.$processTo('00:00.000');
    expect(envelope.destination.value).toEqual(0);

    ctx.$processTo('00:00.400');
    expect(envelope.destination.value).toEqual(0.5);

    ctx.$processTo('00:00.800');
    expect(envelope.destination.value).toEqual(1);

    ctx.$processTo('00:00.900');
    expect(envelope.destination.value).toEqual(0.75);

    ctx.$processTo('00:01.000');
    expect(envelope.destination.value).toEqual(0.5);
  });

  it('should trigger release', () => {
    const ctx = new AudioContext();
    const envelope = new Envelope();
    const node = ctx.createGain();

    envelope.setRelease(5.92);

    envelope.modulate(node.gain);
    envelope.triggerRelease();

    ctx.$processTo('00:05.920');
    expect(envelope.destination.value).toEqual(0);
  });
});
