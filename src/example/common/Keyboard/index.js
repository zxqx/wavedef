import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  }

  static defaultProps = {
    startingOctave: 1,
  }

  /**
   * Using the starting octave and total octaves, make an array of numbers
   * that represent each octave
   * @return {array}
   */
  getOctaveList() {
    const { octaves, startingOctave } = this.props;

    const octaveList = [];
    for (let o = startingOctave; o <= octaves + startingOctave; o++) {
      octaveList.push(o);
    }

    return octaveList;
  }

  render() {
    const { props } = this;
    const octaveList = this.getOctaveList();

    return (
      <div className="keyboard">
        {octaveList.map(octave => (
          notes.map(note => (
            <Key
              key={note + octave}
              note={note + octave}
              onKeypress={props.onKeypress}
              onKeyRelease={props.onKeyRelease}
              isBlack={isSharpOrFlat(note)}
              isAdjacentWhite={isAdjacentToWhiteKey(note)}
            />
          ))
        ))}
      </div>
    );
  }
}
