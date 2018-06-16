import ctx from 'audio-context';

export default class Panner {
  constructor() {
    this.node = ctx().createStereoPanner();
  }

  setPanPosition(pan) {
    this.node.pan.value = pan;
  }

  getPanPosition() {
    return this.node.pan.value;
  }
}
