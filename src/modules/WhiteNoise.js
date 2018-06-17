import ctx from 'audio-context';

export default class WhiteNoise {
  constructor() {
    const bufferSize = 2 * ctx().sampleRate;
    const buffer = ctx().createBuffer(1, bufferSize, ctx().sampleRate);

    for (let i = 0; i < bufferSize; i++) {
      buffer.getChannelData(0)[i] = (Math.random() * 2) - 1;
    }

    this.node = ctx().createBufferSource();
    this.node.buffer = buffer;
    this.node.loop = true;

    this.node.start();
  }
}
