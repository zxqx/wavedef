import ctx from 'audio-context';
import 'promise-decode-audio-data';

export default class Convolver
{
  constructor()
  {
    this.node = ctx.createConvolver();
  }

  async setBufferFile(file)
  {
    let req = new Request(file);
    let res = await fetch(req);
    let buffer = await res.arrayBuffer();
    let audioBuffer = await ctx.decodeAudioData(buffer);
    this.node.buffer = audioBuffer;
  }
}
