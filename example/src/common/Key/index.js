import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noteToFrequency from 'note-to-frequency';
import classnames from 'classnames';
import './Key.css';

/**
 * A key UI component for triggering audio parameters
 */
export default class Key extends Component {
  static propTypes = {
    note: PropTypes.string.isRequired,
    isBlack: PropTypes.bool.isRequired,
    isAdjacentWhite: PropTypes.bool.isRequired,
    onKeypress: PropTypes.array.isRequired, // eslint-disable-line
    onKeyRelease: PropTypes.array.isRequired, // eslint-disable-line
  }

  render() {
    const {
      note,
      isBlack,
      isAdjacentWhite,
      onKeypress,
      onKeyRelease,
    } = this.props;

    return (
      <button
        className={classnames({
          'keyboard-key': true,
          'keyboard-key-black': isBlack,
          'keyboard-key-adjacent-white': isAdjacentWhite,
        })}
        value={note}
        onMouseDown={(e) => {
          const freq = noteToFrequency(e.target.value);
          onKeypress.forEach(callback => callback(freq));
        }}
        onMouseUp={() => onKeyRelease.forEach(callback => callback())}
      />
    );
  }
}
