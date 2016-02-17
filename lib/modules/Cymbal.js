import FM from './FM.js';
import Gain from './Gain.js';
import Filter from './Filter.js';
import Envelope from './Envelope.js';

export default class Cymbal
{
  constructor()
  {
    this.node = new Gain();
  }
}
