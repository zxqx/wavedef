import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import WaveSelector from '../common/WaveSelector';
import Slider from '../common/Slider';

export default class Oscillator extends Component {
  static propTypes = {
    oscillator: PropTypes.object.isRequired, // eslint-disable-line
    mixerChannel: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { oscillator, mixerChannel } = this.props;

    return (
      <AudioControlGroup label={oscillator.name}>
        <WaveSelector
          defaultValue="sawtooth"
          onChange={oscillator::oscillator.setWaveformType}
        />

        <Slider
          label="Volume"
          defaultValue={1}
          min={0}
          max={1}
          step={0.001}
          onChange={mixerChannel::mixerChannel.setGain}
        />
      </AudioControlGroup>
    );
  }
}
