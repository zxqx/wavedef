import Oscillator from './Oscillator';
import Envelope from './Envelope';
import VCA from './VCA';
import param from '../helpers/param';

const ONE_MINUTE = 60;
const ONE_SECOND = 1000;

export default class Sequencer {
  constructor(bpm = 120) {
    this.bpm = bpm;
    this.originalBpm = bpm;
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

    this.createMetronome();
  }

  createMetronome() {
    this.metronome = new Oscillator();
    this.metronomeEnvelope = new Envelope();
    this.metronomeVCA = new VCA();

    this.metronome.node.connect(this.metronomeVCA.node);
    this.metronomeEnvelope.modulate(this.metronomeVCA::param('gain'));

    this.metronomeEnvelope
      .setAttack(0)
      .setDecay(0.1)
      .setSustain(1)
      .setRelease(0.2)
      .setPeakLevel(1);

    this.metronome.setWaveformType('triangle');

    this.node = this.metronomeVCA.node;
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

  triggerMetronome() {
    const metronomeFrequency = this.metronomeSteps[this.activeStep];

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
      return this.selectedStep === 16 ? 1 : this.selectedStep + 1;
    }

    return this.selectedStep;
  }

  triggerAtSelectedStep(callback) {
    const step = this.quantizeStepTrigger();

    this.triggerAtStep(step, callback);

    this.selectedStep = null;
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
      this.activeStep = activeStep === 16 ? 1 : activeStep + 1;

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
    this.steps = 16;
    this.activeStep = 1;
    this.selectedStep = null;
    this.stepTriggers = {};
    this.triggerCallbacks = [];
    this.onStepSelectCallbacks = [];
    this.onSetTriggerCallbacks = [];
  }
}
