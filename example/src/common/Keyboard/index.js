import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import Key from '../Key';
import './Keyboard.css';

const notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
  * @param {string} note
  * @return {boolean}
  */
function isSharpOrFlat(note) {
  return note[1] === '#' || note[1] === 'b';
}

/**
  * @param {string} note
  * @return {boolean}
  */
function isAdjacentToWhiteKey(note) {
  return (note[0] === 'B' || note[0] === 'E') && !isSharpOrFlat(note);
}


/**
 * A keyboard UI component for triggering audio parameters
 */
export default class Keyboard extends Component {
  static propTypes = {
    octaves: PropTypes.number.isRequired,
    startingOctave: PropTypes.number,
    onKeypress: PropTypes.arrayOf(PropTypes.func).isRequired,
    onKeyRelease: PropTypes.arrayOf(PropTypes.func).isRequired,
  }

  static defaultProps = {
    startingOctave: 1,
  }

  state = {
    startingOctave: this.props.startingOctave,
  }

  /**
   * Using the starting octave and total octaves, make an array of numbers
   * that represent each octave
   * @return {array}
   */
  getOctaveList() {
    const { octaves } = this.props;
    const { startingOctave } = this.state;

    const octaveList = [];
    for (let o = startingOctave; o <= octaves + startingOctave; o++) {
      octaveList.push(o);
    }

    return octaveList;
  }

  render() {
    const {
      octaves,
      onKeypress,
      onKeyRelease,
    } = this.props;

    const { startingOctave } = this.state;

    const octaveList = this.getOctaveList();
    const endingOctave = startingOctave + octaves;

    return (
      <Fragment>
        <div className="keyboard">
          {octaveList.map(octave => (
            notes.map(note => (
              <Key
                key={note + octave}
                note={note + octave}
                onKeypress={onKeypress}
                onKeyRelease={onKeyRelease}
                isBlack={isSharpOrFlat(note)}
                isAdjacentWhite={isAdjacentToWhiteKey(note)}
              />
            ))
          ))}
        </div>

        <div className="octave-buttons">
          <Button
            disabled={endingOctave === 8}
            onClick={() => {
              this.setState({
                startingOctave: endingOctave < 8 ? startingOctave + 1 : (endingOctave - octaves),
              });
            }}
          >
            +
          </Button>

          <Button
            disabled={startingOctave === 1}
            onClick={() => {
              this.setState({
                startingOctave: startingOctave > 1 ? startingOctave - 1 : 1,
              });
            }}
          >
            -
          </Button>
        </div>
      </Fragment>
    );
  }
}
