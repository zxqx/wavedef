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
            return <Key key={note + octave} note={note + octave} onKeypress={props.onKeypress} />
          })}
        })}
      </div>
    )
  }

  getOctaveList()
  {
    let octaveList = [];
    for (let o = 1; o <= this.props.octaves; o++) {
      octaveList.push(o);
    }

    return octaveList;
  }
}
