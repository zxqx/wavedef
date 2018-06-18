import Gain from './Gain';
import applyParams from '../helpers/applyParams';

export default class VCA extends Gain {
  defaults = {
    gain: 0,
  }

  constructor(params = {}) {
    super();

    this::applyParams(params);
  }
}
