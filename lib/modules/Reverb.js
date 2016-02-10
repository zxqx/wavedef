import ctx from 'audio-context';

export default class Reverb
{
  constructor()
  {
    this.node = ctx.createConvolver();
  }

  async setup()
  {
    let req = new Request('/impulse-responses/s1.wav');
    return fetch(req)
    .then((res) => {
      return res.arrayBuffer();
    })
    .then((buffer) => {
      return new Promise((resolve, reject) => {
        ctx.decodeAudioData(buffer, function(decodedData) {
          resolve(decodedData);
        });
      });
    })
    .then((decodedData) => {
      this.node.buffer = decodedData;
    });
  }
}
