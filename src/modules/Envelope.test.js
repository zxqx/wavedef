import 'web-audio-test-api';
import Envelope from './Envelope';

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

  it('should get attack', () => {
    const envelope = new Envelope();

    envelope.setAttack(0.2);

    expect(envelope.getAttack()).toEqual(0.2);
  });

  it('should get decay', () => {
    const envelope = new Envelope();

    envelope.setDecay(0.1);

    expect(envelope.getDecay()).toEqual(0.1);
  });

  it('should get sustain', () => {
    const envelope = new Envelope();

    envelope.setSustain(0.8);

    expect(envelope.getSustain()).toEqual(0.8);
  });

  it('should get release', () => {
    const envelope = new Envelope();

    envelope.setRelease(1.6);

    expect(envelope.getRelease()).toEqual(1.6);
  });

  it('should get start', () => {
    const envelope = new Envelope();

    envelope.setStart(1.5);

    expect(envelope.getStart()).toEqual(1.5);
  });

  it('should get depth', () => {
    const envelope = new Envelope();

    envelope.setDepth(420);

    expect(envelope.getDepth()).toEqual(420);
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

  it('should trigger ADSR', () => {
    const ctx = new AudioContext();
    const envelope = new Envelope();
    const node = ctx.createGain();

    envelope
      .setAttack(0.8)
      .setDecay(0.2)
      .setSustain(0.5)
      .setRelease(4);

    envelope.modulate(node.gain);
    envelope.trigger();

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

    ctx.$processTo('00:02.000');
    expect(envelope.destination.value).toEqual(0.375);

    ctx.$processTo('00:04.000');
    expect(envelope.destination.value).toEqual(0.125);

    ctx.$processTo('00:05.000');
    expect(envelope.destination.value).toEqual(0);
  });
});
