# Synth

A synthesizer built on the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

[![Circle CI](https://circleci.com/gh/zakangelle/synth/tree/master.svg?style=svg)](https://circleci.com/gh/zakangelle/synth/tree/master)
<a href='https://coveralls.io/github/zakangelle/synth?branch=master'><img src='https://img.shields.io/coveralls/zakangelle/synth.svg?style=flat-square' alt='Coverage Status' height='18px' /></a>

<img src= 'http://i.imgur.com/AaNfuK5.jpg?1' width ='320px'>

## Requirements

+ NodeJS

## Tech Stack

* [express](http://expressjs.com/) - Server HTTP framework
* [react](https://facebook.github.io/react/) - View layer
* [babel](https://babeljs.io/) - ES6/JSX compiler
* [gulp](http://gulpjs.com/) - Task runner
* [tape](https://github.com/substack/tape) - Testing

## Setup

Clone the repo:

```
$ git clone https://github.com/zakangelle/synth.git
```

Install dependencies:

```
$ npm install
```

## Development

Start the app in `development` mode at [http://localhost:3000](http://localhost:3000) (this will rebuild the app when code changes are made):

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
