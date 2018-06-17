import ctx from 'audio-context';
import stereoPannerNode from 'stereo-panner-node';
import applyParams from '../helpers/applyParams';

stereoPannerNode.polyfill();

export default class Panner {
  defaults = {
    pan: 0,
  }

  constructor(params = {}) {
    this.node = ctx().createStereoPanner();

    this::applyParams(params);
  }

  setPan(pan) {
    this.node.pan.value = pan;
  }

  getPan() {
    return this.node.pan.value;
  }
}
