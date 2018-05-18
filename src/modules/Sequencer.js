const ONE_MINUTE = 60;
const ONE_SECOND = 1000;

export default class Sequencer {
  constructor(bpm = 120) {
    this.bpm = bpm;
    this.steps = 16;
    this.activeStep = 1;
    this.stepTriggers = {};
    this.callbacks = [];
  }

  setBpm(bpm) {
    this.bpm = bpm;
  }

  getStepInterval() {
    return ((ONE_MINUTE / this.bpm) / 4) * ONE_SECOND;
  }

  trigger(callback) {
    this.callbacks.push(callback);
  }

  triggerStep() {
    const stepTrigger = this.stepTriggers[this.activeStep];

    if (stepTrigger) {
      stepTrigger();
    }

    this.callbacks.forEach(cb => cb());
  }

  triggerAtStep(step, callback) {
    this.stepTriggers[step] = callback;
  }

  stop() {
    this.activeStep = 1;
    clearInterval(this.sequence);
  }

  start() {
    const interval = this.getStepInterval();

    this.triggerStep();

    this.sequence = setTimeout(() => {
      if (this.activeStep === 16) {
        this.activeStep = 1;
      } else {
        this.activeStep = this.activeStep + 1;
      }

      this.start();
    }, interval);
  }
}
