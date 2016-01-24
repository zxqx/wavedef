# Synth

A synthesizer built on the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).

[![Circle CI](https://circleci.com/gh/zakangelle/synth/tree/master.svg?style=svg)](https://circleci.com/gh/zakangelle/synth/tree/master)

## Requirements

+ NodeJS

## Tech Stack

* [react](https://facebook.github.io/react/) - View layer
* [babel](https://babeljs.io/) - ES6/jsx compiler
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

## Build

To build the project, do:

```
$ npm run build
```

## Run

To run in the browser at [http://localhost:8080](http://localhost:8080), do:

```
$ npm start
```

## Development

To watch for changes and refresh browser window (requires [LiveReload plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) for Chrome):

```
$ npm run watch
```

## Roadmap

+ ~~Composable synth~~
+ ~~Oscillator~~
+ ~~Mixer~~
+ Volume envelope
+ Filter envelope
+ LFO
+ Keys
+ *Polyphony mode*
+ *Jam sessions*

## Test

To run tests, do:

```
$ npm test
```
