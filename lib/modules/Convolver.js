import ctx from 'audio-context';
import Gain from './Gain.js';
import Mixer from './Mixer.js';
import 'promise-decode-audio-data';

export default class Convolver
{
  constructor()
  {
    this.node = ctx.createConvolver();
    this.input = new Gain();
    this.output = new Gain();
    this.mixer = new Mixer();
    this.wet = this.mixer.ch2;
    this.dry = this.mixer.ch1;

    this.inputNode = this.input.node;
    this.outputNode = this.output.node;

    let input = this.input;
    let dry = this.dry;
    let wet = this.wet;
    let output = this.output;
    let mixer = this.mixer;
    let convolver = this.node;

    //Dry Bypass Signal
    input.node.connect(dry.node);

    //Wet Signal Chain
    input.node.connect(convolver);
    convolver.connect(wet.node);

    //Mixer Route to Output
    mixer.node.connect(output.node);

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

  wetDryMix(value)
  {
    this.wet.setGain(0 + value);
    this.dry.setGain(1 - value);
  }
}
