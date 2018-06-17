import ctx from 'audio-context';
import stereoPannerNode from 'stereo-panner-node';

stereoPannerNode.polyfill();

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
