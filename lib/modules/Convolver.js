import ctx from 'audio-context';
import 'promise-decode-audio-data';

export default class Convolver
{
  constructor()
  {
    this.node = ctx.createConvolver();
  }

  /**
   * Set the buffer to a file
   * @param {string} fileUrl
   */
  async setBufferAsFile(fileUrl)
  {
    let res = await fetch(fileUrl);
    let buffer = await res.arrayBuffer();
    let audioBuffer = await ctx.decodeAudioData(buffer);

    this.setBuffer(audioBuffer);
  }

  /**
   * Set the buffer
   * @param {AudioBuffer} buffer
   */
  setBuffer(buffer)
  {
    this.node.buffer = buffer;
  }

  /**
   * Clear out the current buffer
   */
  clearBuffer()
  {
    this.node.buffer = null;
  }
}
