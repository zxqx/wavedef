import ctx from 'audio-context';
import 'promise-decode-audio-data';

export default class Convolver
{
  constructor()
  {
    this.node = ctx.createConvolver();
  }

  async setBufferAsFile(fileUrl)
  {
    let res = await fetch(fileUrl);
    let buffer = await res.arrayBuffer();
    let audioBuffer = await ctx.decodeAudioData(buffer);

    this.node.buffer = audioBuffer;
  }
}
