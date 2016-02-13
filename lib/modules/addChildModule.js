/**
 * A mixinable method for tracking child modules
 * so they can be added recursively by a synth
 *
 * Implicitly connects child modules to `this.node`
 * @param {string} id
 * @param {object} module
 * @return {instance}
 */
export default function addChildModule(id, module)
{
  if (!Array.isArray(this.children)) {
    this.children = [];
  }

  if (this[id]) {
    throw new Error('Child module id must be unique');
  }

  this[id] = module;

  let inputNode = this.inputNode || this.node;
  let outputNode = this[id].outputNode || this[id].node;

  outputNode.connect(inputNode);
  this.children.push(module);

  return module;
}
