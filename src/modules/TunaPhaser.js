import ctx from 'audio-context';
import Tuna from 'tunajs';

const tuna = new Tuna(ctx());

export default class TunaPhaser {
  constructor() {
    this.node = new tuna.Phaser();
  }

  setRate(rate) {
    this.node.rate = rate;
  }

  setDepth(depth) {
    this.node.depth = depth;
  }

  setFeedback(feedback) {
    this.node.feedback = feedback;
  }

  setStereoPhase(stereoPhase) {
    this.node.stereoPhase = stereoPhase;
  }

  setBaseModulationFrequency(baseModulationFrequency) {
    this.node.baseModulationFrequency = baseModulationFrequency;
  }

  setBypass(bypass) {
    this.node.bypass = bypass ? 1 : 0;
  }
}
