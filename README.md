# Synth

A synthesizer built on the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

[![Circle CI](https://circleci.com/gh/zakangelle/synth/tree/master.svg?style=svg)](https://circleci.com/gh/zakangelle/synth/tree/master)

## Requirements
+ NodeJS

## Setup
Clone the repo:

```
$ git clone https://github.com/zakangelle/synth.git
```

Install dependencies:

```
$ npm install
```

## Run
To run an example in the browser at [http://localhost:8080](http://localhost:8080), do:

```
$ npm start
```

You can test the synth in the console:

```js
osc
  .setWaveformType('square')
  .setFrequency(50)
  .setDetune(4);

osc.start();
```

You can experiment with changing oscillator parameters by running the set and transition methods exposed by the `Oscillator`, e.g.:

```js
osc.setFrequency(1200);
// immediately set the frequency to 1.2kHz

osc.transitionFrequency(600, 3);
// transition the frequency setting to 600Hz over 3 seconds

osc.transitionDetune(86, 2);
// transition the detune setting to 86 over 2 seconds
```

## Roadmap
+ Mixer
+ Filter
+ LFO
+ Keys
+ Polyphony mode

## Test
To run tests, do:

```
$ npm test
```
