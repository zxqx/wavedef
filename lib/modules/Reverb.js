import ctx from 'audio-context';

export default class Reverb
  {
    constructor()
      {
        this.node = ctx.createConvolver();
        let convolver = this.node;

        let soundSource, sethsAmp;

        let ajaxRequest = new XMLHttpRequest();
        ajaxRequest.open('GET', './impulse-responses/Seth_s-Amp.wav', true);
        ajaxRequest.responseType = 'arraybuffer';

        ajaxRequest.onload = function(){
          let audioData = ajaxRequest.response;
          ctx.decodeAudioData(audioData, function(buffer) {
            sethsAmp = buffer;
            soundSource = ctx.createBufferSource();
            soundSource.buffer = sethsAmp;

          }, function(e){"Error with decoding audio data"});
        }
        ajaxRequest.send();

        convolver.normalize = true;
        convolver.buffer = sethsAmp;

      }
  }
