import ctx from 'audio-context';
import Gain from './Gain.js';
import 'promise-decode-audio-data';

export default class Convolver
{
  constructor()
  {
    this.node = ctx.createConvolver();
    this.input = new Gain();
    this.output = new Gain();
    this.wet = new Gain();
    this.dry = new Gain();

    this.inputNode = this.input.node;
    this.outputNode = this.output.node;

    let { input, dry, wet, output } = this;

    //Dry Bypass Signal
    this.inputNode.connect(dry.node);
    dry.node.connect(this.outputNode);

    //Wet Signal Chain
    this.inputNode.connect(this.node);
    this.node.connect(wet.node);
    wet.node.connect(this.outputNode);
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

  setWetDryMix(value)
  {
    this.wet.setGain(0 + value);
    this.dry.setGain((1 - value)/2);
  }
}
