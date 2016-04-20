# wavedef

A synthesizer library built on the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

[![Circle CI](https://circleci.com/gh/zakangelle/wavedef/tree/master.svg?style=shield)](https://circleci.com/gh/zakangelle/wavedef/tree/master) [![Coverage Status](https://img.shields.io/coveralls/zakangelle/wavedef.svg)](https://coveralls.io/github/zakangelle/wavedef?branch=master) [![See Demo](https://img.shields.io/badge/see-demo-8500ff.svg)](http://dz-synth.herokuapp.com/)

<a href="http://dz-synth.herokuapp.com/">
  <img src='http://i.imgur.com/AaNfuK5.jpg?1' width='360px'>
</a>

## Requirements

+ NodeJS

## Tech Stack

* [express](http://expressjs.com/) - Server HTTP framework
* [react](https://facebook.github.io/react/) - View layer
* [babel](https://babeljs.io/) - ES6/JSX compiler
* [webpack](https://webpack.github.io/) - Module bundler
* [tape](https://github.com/substack/tape) - Testing

## Setup

Clone the repo:

```
$ git clone https://github.com/zakangelle/wavedef.git
```

Install dependencies:

```
$ npm install
```

## Development

Start the app in `development` mode at [http://localhost:3000](http://localhost:3000) (rebuilds when code changes are made):

```
$ npm start
```

## Test

To run tests, do:

```
$ npm test
```

## Roadmap

+ ~~Composable synth~~
+ ~~Oscillator~~
+ ~~Mixer~~
+ ~~Filter~~
+ ~~ADSR Envelope~~
+ ~~VCA~~
+ ~~Mono to Stereo Splitter~~
+ ~~Kick~~
+ ~~Snare~~
+ ~~Hat~~
+ Percussion Generator
+ ~~White Noise Generator~~
+ ~~LFO with BPM sync~~
+ ~~Convolver~~
+ ~~3-Band EQ~~
+ ~~Ring Modulator~~
+ ~~Frequency Analyzer~~
+ Sequencer
+ Sampler
+ MIDI input
+ Arpeggiator
+ *Polyphony mode*
+ ~~Delay~~
+ Multi-Tap Delay
