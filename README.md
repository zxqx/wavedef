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

## Build example
To run an example in the browser, build it:

```
$ npm run example
```

Then open `examples/index.html`, and in the console, run:

```js
osc
  .setWaveformType('square')
  .setFrequency(50)
  .setDetune(4);

osc.node.start();
```

You can keep changing oscillator params by running the set and transition methods exposed by the `Oscillator` class, e.g.:

```js
osc.transitionFrequency(600, 3000);
osc.transitionDetune(16, 2000);
```

## Test
Run tests via [tape](https://github.com/substack/tape):

```
$ npm test
```
