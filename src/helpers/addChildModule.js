/**
 * A mixinable method for tracking child modules
 * so they can be added recursively by a synth
 *
 * Implicitly connects child modules to `this.node`
 * @param {object} module
 * @return {instance}
 */
export default function addChildModule(module) {
  if (!Array.isArray(this.children)) {
    this.children = [];
  }

  const inputNode = this.inputNode || this.node;
  const outputNode = module.outputNode || module.node;

  outputNode.connect(inputNode);
  this.children.push(module);

  return module;
}
