import ctx from 'audio-context';
import flatten from 'lodash.flatten';

const startEvents = [
  'load',
  'keydown',
  'keyup',
  'keypress',
  'mousemove',
  'mousedown',
  'mouseup',
];

/**
 * Composable synth container for connecting audio modules
 */
export default class Synth {
  constructor() {
    this.modules = [];
    this.connecting = null;

    startEvents.forEach(event => document.addEventListener(event, () => ctx().resume()));
  }

  getParams() {
    return flatten(this.modules.map((module) => {
      const params = module.getParams ? module.getParams() : [];
      return params;
    }));
  }

  /**
   * Recursively add modules and their children to the synth
   * @param {instance} module
   * @return {Synth}
   */
  addModule(module) {
    if (!this.modules.includes(module)) {
      this.modules.push(module);
    }

    if (Array.isArray(module.children)) {
      module.children.forEach(child => this.addModule(child));
    }

    return this;
  }

  /**
   * Recursively remove modules and their children from the synth
   * @param {instance} module
   * @return {Synth}
   */
  removeModule(module) {
    if (this.modules.includes(module)) {
      const index = this.modules.indexOf(module);
      this.modules.splice(index, 1);
    }

    if (Array.isArray(module.children)) {
      module.children.forEach(child => this.removeModule(child));
    }

    return this;
  }

  /**
   * Get a list of added modules
   * @return {Array}
   */
  getModules() {
    return this.modules;
  }

  /**
   * Start a output->input connection chain
   * @param {instance} param
   * @return {Synth}
   */
  connect(output) {
    this.ensureModuleIsAdded(output);
    this.connecting = output;

    return this;
  }

  /**
   * Chain current output module into a given input
   * Check for `inputNode` and `outputNode` and use `node` otherwise
   * @param {instance} input
   * @return {Synth}
   */
  to(input) {
    if (!this.connecting) {
      throw new Error('connect() must be called with a module before calling to()');
    }

    const inputNode = input.inputNode || input.node;
    const outputNode = this.connecting.outputNode || this.connecting.node;

    this.ensureModuleIsAdded(input);
    outputNode.connect(inputNode);
    this.connecting = input;

    return this;
  }

  /**
   * Hook the last piece of our chain to our audio context
   * @return {Synth}
   */
  output() {
    if (!this.connecting) {
      throw new Error('connect() must be called with a module before calling output()');
    }

    const outputNode = this.connecting.outputNode || this.connecting.node;

    outputNode.connect(ctx().destination);
    this.connecting = null;

    return this;
  }

  ensureModuleIsAdded(module) {
    if (!this.modules.includes(module)) {
      this.addModule(module);
    }
  }
}
