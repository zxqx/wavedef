import Gain from './Gain';

export default class VCA extends Gain {
  constructor(ctx) {
    super(ctx);

    this.setGain(0);
  }
}
