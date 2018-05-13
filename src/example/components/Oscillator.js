import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from './AudioControlGroup';
import ButtonGroup from './ButtonGroup';

export default class Oscillator extends Component {
  static propTypes = {
    oscillator: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { oscillator } = this.props;

    return (
      <AudioControlGroup label="Oscillator">
        <ButtonGroup
          label="Waveform"
          defaultValue="sawtooth"
          options={[
            { label: 'SN', value: 'sine' },
            { label: 'SQ', value: 'square' },
            { label: 'SW', value: 'sawtooth' },
            { label: 'TR', value: 'triangle' },
          ]}
          onChange={oscillator::oscillator.setWaveformType}
        />
      </AudioControlGroup>
    );
  }
}
