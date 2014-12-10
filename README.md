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

## Test
Run tests via [tape](https://github.com/substack/tape):

```
$ npm test
```

## Watch
Watch for changes on files, rebuild, and reload using [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en):

```
$ npm run watch
```

## Build example
To see an example in the browser, build it:

```
$ npm run example
```

Then open `examples/index.html`.

In the console, run:

```js
osc
  .setFrequency(50)
  .setDetune(4)
  .setWaveformType('square');

osc.node.start();
```

You can reset params by running the set and transition methods exposed by the `Oscillator` class.
