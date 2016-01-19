# Synth

A synthesizer built on the Web Audio API.

## Requirements
+ NodeJS

## Setup
Clone via Bitbucket:

```
$ git clone https://zakangelle@bitbucket.org/zakangelle/synth.git
```

Install dependencies:

```
$ npm install
```

## Run
To run an example in the browser at http://localhost:8080, do:

```
$ npm start
```

You can test the synth in the console:

```js
osc
  .setWaveformType('square')
  .setFrequency(50)
  .setDetune(4);

osc.node.start();
```

You can keep changing oscillator params by running the set and transition methods exposed by the `Oscillator` class, e.g.:

```js
osc.transitionFrequency(600, 3);
osc.transitionDetune(86, 2);
```

## Test
Run tests via [tape](https://github.com/substack/tape):

```
$ npm test
```
