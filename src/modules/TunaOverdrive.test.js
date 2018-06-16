import 'web-audio-test-api';
import TunaOverdrive from './TunaOverdrive';

describe('TunaOverdrive', () => {
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
});
