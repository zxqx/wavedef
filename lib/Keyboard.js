import React from 'react';
import { render } from 'react-dom';
import Key from './Key.js';

const notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/**
 * A keyboard UI component for triggering audio parameters
 */
export default class Keyboard extends React.Component
{
  render()
  {
    const { props } = this;

    let octaveList = this.getOctaveList();

    return (
      <div className='keyboard'>
        {octaveList.map(octave => {
          {return notes.map(note => {
            return <Key key={note + octave} note={note + octave}
              onKeypress={props.onKeypress}
              black={this.isSharpOrFlat(note)}
              adjacentWhite={this.isAdjacentToWhiteKey(note)}
            />
          })}
        })}
      </div>
    )
  }

  isSharpOrFlat(note)
  {
    return note[1] === '#' || note[1] === 'b';
  }

  isAdjacentToWhiteKey(note)
  {
    return (note[0] === 'B' || note[0] === 'E') && !this.isSharpOrFlat(note);
  }

  getOctaveList()
  {
    let { octaves, startingOctave } = this.props;

    let octaveList = [];
    for (let o = startingOctave; o <= octaves + startingOctave; o++) {
      octaveList.push(o);
    }

    return octaveList;
  }
}
