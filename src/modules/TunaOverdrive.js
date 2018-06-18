import ctx from 'audio-context';
import Tuna from 'tunajs';
import applyParams from '../helpers/applyParams';

const tuna = new Tuna(ctx());

export default class TunaOverdrive {
  defaults = {
    outputGain: 0.5,
    drive: 0.7,
    curveAmount: 1,
    algorithmIndex: 0,
    bypass: 0,
  }

  constructor(params = {}) {
    this.node = new tuna.Overdrive();

    this::applyParams(params);
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

  getOutputGain() {
    return this.node.outputGain.value;
  }

  getDrive() {
    return this.node.drive.value;
  }

  getCurveAmount() {
    return this.node.curveAmount;
  }

  getAlgorithmIndex() {
    return this.node.algorithmIndex;
  }

  getBypass() {
    return this.node.bypass;
  }
}
