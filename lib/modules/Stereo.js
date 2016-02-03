import ctx from 'audio-context';

export default class Stereo
  {
    constructor()
    {
      this.node = ctx.createChannelSplitter(2);

    }
  }
