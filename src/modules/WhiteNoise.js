import ctx from 'audio-context';

export default class WhiteNoise {
  constructor(name = 'Noise') {
    this.name = name;

    const bufferSize = 2 * ctx().sampleRate;
    const myArrayBuffer = ctx().createBuffer(1, bufferSize, ctx().sampleRate);
    const nowBuffering = myArrayBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      nowBuffering[i] = (Math.random() * 2) - 1;
    }

    this.node = ctx().createBufferSource();

    this.node.buffer = myArrayBuffer;
    this.node.loop = true;
    this.node.start();
  }
}
