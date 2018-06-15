# Contributing to wavedef

Contributing to wavedef isn't limited to just filing bugs. Users are more than welcomed to make suggestions, report any issue they may find, and make pull requests to help make wavedef better.

## Working on wavedef

### Requirements

* [Git](https://git-scm.com/)
* Latest version of [NodeJS](https://nodejs.org/en/)

### Getting wavedef

Clone the repository:

```sh
$ git clone https://github.com/zakangelle/wavedef
```

Install library dependencies:

```
$ npm install
```

Boot up the example app at [http://localhost:3000](http://localhost:3000) (implicitly rebuilds on code changes):

```
$ npm start
```

Run tests (implicitly re-runs on code changes):

```
$ npm test
```

### Using branches

When working on any issue on Github, it's a good practice to make branches that are specific to the issue you're currently working on. For instance, if you're working on an issue with a name like "Add Mod Matrix #692", from the master branch run the following code: e.g. `git checkout -b issue-692-add-mod-matrix`.

In doing so, you'll be making a branch that specifically identifies the issue at hand, and moves you right into it with the `checkout` flag. This keeps your main (master) repository clean and your personal workflow cruft out of sight when making a pull request.

### Finding issues to fix

After you've forked and cloned our repo, you can find issues to work on by heading over to our [issues list](https://github.com/zakangelle/wavedef/issues).

### Rules of the discussions

Remember to be very clear and transparent when discussing any issue in the discussions boards. We ask that you keep the language to English and keep on track with the issue at hand.
