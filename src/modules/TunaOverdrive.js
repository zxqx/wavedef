import ctx from 'audio-context';
import Tuna from 'tunajs';

const tuna = new Tuna(ctx());

export default class TunaOverdrive {
  constructor(name = 'Overdrive') {
    this.name = name;
    this.node = new tuna.Overdrive();
  }

  setOutputGain(outputGain) {
    this.node.outputGain.value = outputGain;
  }

  setDrive(drive) {
    this.node.drive.value = drive;
  }

  setCurveAmount(curveAmount) {
    this.node.curveAmount = curveAmount;
  }

  setAlgorithmIndex(algorithmIndex) {
    this.node.algorithmIndex = algorithmIndex;
  }

  setBypass(bypass) {
    this.node.bypass = bypass;
  }
}
