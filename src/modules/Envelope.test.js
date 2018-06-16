import 'web-audio-test-api';
import Envelope from './Envelope';

describe('Envelope', () => {
  it('should set default params', () => {
    const envelope = new Envelope();

    expect(envelope.getAttack()).toEqual(0);
    expect(envelope.getDecay()).toEqual(0.1);
    expect(envelope.getSustain()).toEqual(1);
    expect(envelope.getRelease()).toEqual(0.1);
    expect(envelope.getPeakLevel()).toEqual(1);
    expect(envelope.getStart()).toEqual(0);
  });

  it('should override default params', () => {
    const envelope = new Envelope({
      attack: 0.2,
      decay: 1.5,
      sustain: 0.5,
      release: 3,
      peakLevel: 2.4,
      start: 0.1,
    });

    expect(envelope.getAttack()).toEqual(0.2);
    expect(envelope.getDecay()).toEqual(1.5);
    expect(envelope.getSustain()).toEqual(0.5);
    expect(envelope.getRelease()).toEqual(3);
    expect(envelope.getPeakLevel()).toEqual(2.4);
    expect(envelope.getStart()).toEqual(0.1);
  });


  it('should modulate', () => {
    const envelope = new Envelope();
    const destination = { node: 'osc' };

    envelope.modulate(destination);

    expect(envelope.destination).toEqual(destination);
  });

  it('should set start time to destination value', () => {
    const envelope = new Envelope();
    const destination = { value: 72 };

    envelope.modulate(destination);

    expect(envelope.getStart()).toEqual(72);
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

  it('should set peak level', () => {
    const envelope = new Envelope();

    envelope.setPeakLevel(224);

    expect(envelope.peakLevel).toEqual(224);
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

  it('should get peak level', () => {
    const envelope = new Envelope();

    envelope.setPeakLevel(360);

    expect(envelope.getPeakLevel()).toEqual(360);
  });

  it('should get start', () => {
    const envelope = new Envelope();

    envelope.setStart(1.5);

    expect(envelope.getStart()).toEqual(1.5);
  });

  it('should trigger attack', () => {
    const ctx = new AudioContext();
    const envelope = new Envelope();
    const node = ctx.createGain();
    node.gain.value = 0;

    envelope
      .setAttack(2)
      .setPeakLevel(600);

    envelope.modulate(node.gain);
    envelope.triggerAttack();

    ctx.$processTo('00:00.000');
    expect(envelope.destination.value).toEqual(0);

    ctx.$processTo('00:02.000');
    expect(envelope.destination.value).toEqual(600);
  });

  it('should trigger decay', () => {
    const ctx = new AudioContext();
    const envelope = new Envelope();
    const node = ctx.createGain();
    node.gain.value = 0;

    envelope
      .setAttack(2)
      .setDecay(1)
      .setSustain(0.5)
      .setPeakLevel(1000);

    envelope.modulate(node.gain);
    envelope.triggerAttack();
    envelope.triggerDecay();

    ctx.$processTo('00:03.000');
    expect(envelope.destination.value).toEqual(500);
  });

  it('should trigger release', () => {
    const ctx = new AudioContext();
    const envelope = new Envelope();
    const node = ctx.createGain();
    node.gain.value = 0;

    envelope.setRelease(5.92);

    envelope.modulate(node.gain);
    envelope.triggerRelease();

    ctx.$processTo('00:05.920');
    expect(envelope.destination.value).toEqual(0);
  });

  it('should trigger ADS', () => {
    const ctx = new AudioContext();
    const envelope = new Envelope();
    const node = ctx.createGain();
    node.gain.value = 0;

    envelope
      .setAttack(0.8)
      .setDecay(0.2)
      .setSustain(0.5)
      .setPeakLevel(1);

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

  it('should trigger ADSR', () => {
    const ctx = new AudioContext();
    const envelope = new Envelope();
    const node = ctx.createGain();
    node.gain.value = 0;

    envelope
      .setAttack(0.8)
      .setDecay(0.2)
      .setSustain(0.5)
      .setRelease(4)
      .setPeakLevel(1);

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

  it('should trigger release properly if attack phase is not completed', () => {
    const ctx = new AudioContext();
    const envelope = new Envelope();
    const node = ctx.createGain();
    node.gain.value = 0;

    envelope
      .setAttack(2)
      .setDecay(0.2)
      .setSustain(0.5)
      .setRelease(5)
      .setPeakLevel(1);

    envelope.modulate(node.gain);
    envelope.trigger();

    ctx.$processTo('00:00.000');
    expect(envelope.destination.value).toEqual(0);

    ctx.$processTo('00:00.500');
    expect(envelope.destination.value).toEqual(0.25);

    envelope.triggerRelease();

    ctx.$processTo('00:01.000');
    expect(envelope.destination.value).toEqual(0.2);

    ctx.$processTo('00:03.000');
    expect(envelope.destination.value).toEqual(0.1);

    ctx.$processTo('00:05.000');
    expect(envelope.destination.value).toEqual(0);
  });
});
