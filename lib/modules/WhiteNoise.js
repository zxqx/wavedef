import ctx from 'audio-context';
import Gain from './Gain.js';

export default class WhiteNoise
  {
    constructor()
    {
      let bufferSize = 2 * ctx.sampleRate;
      let myArrayBuffer = ctx.createBuffer(1, bufferSize,ctx.sampleRate);
      let nowBuffering = myArrayBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++)
        {
          nowBuffering[i] = Math.random() * 2 - 1;
        }


      this.node = ctx.createBufferSource();

      this.node.buffer = myArrayBuffer;
      this.node.loop = true;
      this.node.start();


    }
  }
