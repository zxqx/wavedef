import 'web-audio-test-api';
import TunaOverdrive from './TunaOverdrive';

describe('TunaOverdrive', () => {
  it('should set default params', () => {
    const overdrive = new TunaOverdrive();

    expect(overdrive.getOutputGain()).toEqual(0.5);
    expect(overdrive.getDrive()).toEqual(0.7);
    expect(overdrive.getCurveAmount()).toEqual(1);
    expect(overdrive.getAlgorithmIndex()).toEqual(0);
    expect(overdrive.getBypass()).toEqual(0);
  });

  it('should override default params', () => {
    const overdrive = new TunaOverdrive({
      outputGain: 0.2,
      drive: 0.9,
      curveAmount: 0.5,
      algorithmIndex: 4,
      bypass: 1,
    });

    expect(overdrive.getOutputGain()).toEqual(0.2);
    expect(overdrive.getDrive()).toEqual(0.9);
    expect(overdrive.getCurveAmount()).toEqual(0.5);
    expect(overdrive.getAlgorithmIndex()).toEqual(4);
    expect(overdrive.getBypass()).toEqual(1);
  });

  it('should set output gain', () => {
    const overdrive = new TunaOverdrive();

    overdrive.setOutputGain(0.666);

    expect(overdrive.node.outputGain.value).toEqual(0.666);
  });

  it('should set drive', () => {
    const overdrive = new TunaOverdrive();

    overdrive.setDrive(86);

    expect(overdrive.node.drive.value).toEqual(86);
  });

  it('should set curve amount', () => {
    const overdrive = new TunaOverdrive();

    overdrive.setCurveAmount(26);

    expect(overdrive.node.curveAmount).toEqual(26);
  });

  it('should set algorithm index', () => {
    const overdrive = new TunaOverdrive();

    overdrive.setAlgorithmIndex(4);

    expect(overdrive.node.algorithmIndex).toEqual(4);
  });

  it('should set bypass', () => {
    const overdrive = new TunaOverdrive();

    overdrive.setBypass(1);

    expect(overdrive.node.bypass).toEqual(1);
  });

  it('should get output gain', () => {
    const overdrive = new TunaOverdrive();

    overdrive.setOutputGain(0.666);

    expect(overdrive.getOutputGain()).toEqual(0.666);
  });

  it('should get drive', () => {
    const overdrive = new TunaOverdrive();

    overdrive.setDrive(86);

    expect(overdrive.getDrive()).toEqual(86);
  });

  it('should get curve amount', () => {
    const overdrive = new TunaOverdrive();

    overdrive.setCurveAmount(26);

    expect(overdrive.getCurveAmount()).toEqual(26);
  });

  it('should get algorithm index', () => {
    const overdrive = new TunaOverdrive();

    overdrive.setAlgorithmIndex(4);

    expect(overdrive.getAlgorithmIndex()).toEqual(4);
  });

  it('should get bypass', () => {
    const overdrive = new TunaOverdrive();

    overdrive.setBypass(1);

    expect(overdrive.getBypass()).toEqual(1);
  });
});
