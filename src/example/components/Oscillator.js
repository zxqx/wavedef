import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from './AudioControlGroup';
import WaveSelector from './WaveSelector';

export default class Oscillator extends Component {
  static propTypes = {
    oscillator: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { oscillator } = this.props;

    return (
      <AudioControlGroup label="Oscillator">
        <WaveSelector
          defaultValue="sawtooth"
          onChange={oscillator::oscillator.setWaveformType}
        />
      </AudioControlGroup>
    );
  }
}
