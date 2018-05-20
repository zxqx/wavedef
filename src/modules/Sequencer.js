const ONE_MINUTE = 60;
const ONE_SECOND = 1000;

export default class Sequencer {
  constructor(bpm = 120) {
    this.bpm = bpm;
    this.steps = 16;
    this.activeStep = 1;
    this.selectedStep = null;
    this.stepTriggers = {};
    this.triggerCallbacks = [];
    this.onStepSelectCallbacks = [];
    this.onSetTriggerCallbacks = [];
  }

  setBpm(bpm) {
    this.bpm = bpm;
  }

  setSelectedStep(step) {
    this.selectedStep = step;

    this.onStepSelectCallbacks.forEach(cb => cb());
  }

  onStepSelect(callback) {
    this.onStepSelectCallbacks.push(callback);
  }

  getStepInterval() {
    return ((ONE_MINUTE / this.bpm) / 4) * ONE_SECOND;
  }

  trigger(callback) {
    this.triggerCallbacks.push(callback);
  }

  triggerStep() {
    const stepTrigger = this.stepTriggers[this.activeStep];

    if (stepTrigger) {
      stepTrigger();
    }

    this.triggerCallbacks.forEach(cb => cb());
  }

  triggerAtStep(step, callback) {
    if (step) {
      this.stepTriggers[step] = callback;
      this.onSetTriggerCallbacks.forEach(cb => cb());
    }
  }

  clearTriggerAtStep(step) {
    this.stepTriggers[step] = null;
  }

  triggerAtSelectedStep(callback) {
    this.triggerAtStep(this.selectedStep, callback);

    this.selectedStep = null;
  }

  onSetTrigger(callback) {
    this.onSetTriggerCallbacks.push(callback);
  }

  start() {
    const { activeStep } = this;
    const interval = this.getStepInterval();

    this.triggerStep();

    this.sequence = setTimeout(() => {
      this.activeStep = activeStep === 16 ? 1 : activeStep + 1;
      this.start();
    }, interval);
  }

  stop() {
    this.activeStep = 1;
    clearInterval(this.sequence);
  }

  clearPattern() {
    this.stepTriggers = {};
    this.selectedStep = null;
  }

  reset() {
    this.steps = 16;
    this.activeStep = 1;
    this.selectedStep = null;
    this.stepTriggers = {};
    this.triggerCallbacks = [];
    this.onStepSelectCallbacks = [];
    this.onSetTriggerCallbacks = [];
  }
}
