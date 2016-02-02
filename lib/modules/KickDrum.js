import ctx from 'audio-context';
import React from 'react';
import addChildModule from './addChildModule.js';
import Oscillator from './Oscillator.js';
import Filter from './Filter.js';
import Envelope from './Envelope.js';
import Gain from './Gain.js';

export default class Kick
  {
    constructor()
    {
      this.osc = new Oscillator();
      this.filter = new Filter();
      this.gain = new Gain();
      this.envelope = new Envelope();
    }
  }
