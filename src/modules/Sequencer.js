import Oscillator from './Oscillator';
import Envelope from './Envelope';
import VCA from './VCA';
import param from '../helpers/param';
import applyParams from '../helpers/applyParams';

const ONE_MINUTE = 60;
const ONE_SECOND = 1000;

export default class Sequencer {
  defaults = {
    bpm: 120,
    steps: 16,
  }

  constructor(params = {}) {
    this.steps = 16;
    this.activeStep = 1;
    this.selectedStep = null;
    this.playing = false;
    this.recording = false;
    this.metronomeOn = true;
    this.sequenceTimestamp = null;
    this.stepTriggers = {};
    this.triggerCallbacks = [];
    this.onStepSelectCallbacks = [];
    this.onSetTriggerCallbacks = [];

    this.metronomeSteps = {
      1: 1000,
      5: 500,
      9: 500,
      13: 500,
    };

    this::applyParams(params);
    this.createMetronome();

    this.originalBpm = this.bpm;
  }

  createMetronome() {
    this.metronome = new Oscillator();
    this.metronomeEnvelope = new Envelope({
      sustain: 0.3,
      release: 0.2,
      peakLevel: 0.3,
    });

    this.metronomeVCA = new VCA();

    this.metronome.node.connect(this.metronomeVCA.node);
    this.metronomeEnvelope.modulate(this.metronomeVCA::param('gain'));

    this.metronome.setType('triangle');

    this.node = this.metronomeVCA.node;
  }

  setBpm(bpm) {
    this.bpm = bpm;
  }

  setSteps(steps) {
    this.steps = steps;
  }

  setActiveStep(step) {
    this.activeStep = step;
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

  triggerMetronome() {
    const metronomeFrequency = this.metronomeSteps[this.activeStep % 16];

    if (this.metronomeOn && metronomeFrequency) {
      this.metronome.setFrequency(metronomeFrequency);
      this.metronomeEnvelope.trigger();
    }
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

  quantizeStepTrigger() {
    const interval = this.getStepInterval();
    const needsQuantize = (Date.now() - this.sequenceTimestamp) > (interval / 2);

    if (this.recording && needsQuantize) {
      return this.selectedStep === this.steps ? 1 : this.selectedStep + 1;
    }

    return this.selectedStep;
  }

  triggerAtSelectedStep(callback) {
    const step = this.quantizeStepTrigger();

    this.triggerAtStep(step, callback);

    if (!this.recording) {
      this.selectedStep = null;
    }
  }

  onSetTrigger(callback) {
    this.onSetTriggerCallbacks.push(callback);
  }

  start() {
    const { activeStep } = this;
    const interval = this.getStepInterval();
    this.playing = true;

    if (this.recording) {
      this.triggerMetronome();
    }

    this.triggerStep();

    this.sequenceTimestamp = Date.now();

    this.sequence = setTimeout(() => {
      this.activeStep = activeStep === this.steps ? 1 : activeStep + 1;

      if (this.recording) {
        this.selectedStep = this.activeStep;
      }

      this.start();
    }, interval);
  }

  stop() {
    this.playing = false;
    this.activeStep = 1;
    clearInterval(this.sequence);
  }

  record() {
    this.recording = true;
  }

  stopRecord() {
    this.recording = false;
    this.selectedStep = null;
  }

  clearPattern() {
    this.stepTriggers = {};
    this.selectedStep = null;
  }

  setMetronomeStatus(status) {
    this.metronomeOn = status;
  }

  reset() {
    this.bpm = this.originalBpm;
    this.activeStep = 1;
    this.selectedStep = null;
    this.stepTriggers = {};
    this.triggerCallbacks = [];
    this.onStepSelectCallbacks = [];
    this.onSetTriggerCallbacks = [];

    this.stop();
    this.stopRecord();
  }
}
