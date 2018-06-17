import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noteToFrequency from 'note-to-frequency';
import './Key.css';

/**
 * A key UI component for triggering audio parameters
 */
export default class Key extends Component {
  static propTypes = {
    isBlack: PropTypes.bool.isRequired,
    isAdjacentWhite: PropTypes.bool.isRequired,
  }

  render() {
    const { props } = this;

    const classNames = ['keyboard-key'];

    if (this.props.isBlack) {
      classNames.push('keyboard-key-black');
    }

    if (this.props.isAdjacentWhite) {
      classNames.push('keyboard-key-adjacent-white');
    }

    return (
      <button
        className={classNames.join(' ')}
        value={props.note}
        onMouseDown={(e) => {
          const freq = noteToFrequency(e.target.value);

          if (Array.isArray(props.onKeypress)) {
            props.onKeypress.forEach(callback => callback(freq));
          } else {
            props.onKeypress(freq);
          }
        }}
        onMouseUp={() => {
          if (Array.isArray(props.onKeyRelease)) {
            props.onKeyRelease.forEach(callback => callback());
          } else {
            props.onKeyRelease();
          }
        }}
      />
    );
  }
}
