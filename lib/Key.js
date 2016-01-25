import React from 'react';
import { render } from 'react-dom';
import notesToFrequencies from 'notes-to-frequencies';

/**
 * A key UI component for triggering audio parameters
 */
export default class Key extends React.Component
{
  render()
  {
    const { props } = this;

    let classNames = ['keyboard-key'];
    this.props.black && classNames.push('keyboard-key-black');

    return (
      <button className={classNames.join(' ')} value={props.note}
        onClick={(e) => {
          let freq = notesToFrequencies(e.target.value);

          if (Array.isArray(props.onKeypress)) {
            for (let callback of props.onKeypress) {
              callback(freq);
            }
          }
          else {
            props.onKeypress(freq);
          }
        }}></button>
    )
  }
}
