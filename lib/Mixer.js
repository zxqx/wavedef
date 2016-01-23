import ctx from 'audio-context';
import Gain from './Gain.js';

// Creating a multi-channel mixer to use in synth
export default class Mixer
{
  constructor()
  {
    this.node = ctx.createChannelMerger(3);

    this.addChildModule('ch1', new Gain());
    this.addChildModule('ch2', new Gain());
    this.addChildModule('ch3', new Gain());
  }

  addChildModule(id, module)
  {
    if (!Array.isArray(this.children)) {
      this.children = [];
    }

    if (this[id]) {
      throw new Error('Child module id must be unique');
    }

    this[id] = module;
    this[id].node.connect(this.node);
    this.children.push(module);
  }
}
