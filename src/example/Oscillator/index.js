import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import WaveSelector from '../common/WaveSelector';
import Switch from '../common/Switch';
import Slider from '../common/Slider';

export default class Oscillator extends Component {
  static propTypes = {
    oscillator: PropTypes.shape({
      name: PropTypes.string.isRequired,
      node: PropTypes.object.isRequired, // eslint-disable-line
    }).isRequired,
    mixerChannel: PropTypes.object.isRequired, // eslint-disable-line
    waveformType: PropTypes.string,
    frequency: PropTypes.number,
    showFrequencyControl: PropTypes.bool,
  }

  static defaultProps = {
    waveformType: 'sawtooth',
    frequency: 250,
    showFrequencyControl: false,
  }

  toggle(on) {
    const { mixerChannel } = this.props;

    return on ? mixerChannel.toggleOn() : mixerChannel.toggleOff();
  }

  render() {
    const {
      oscillator,
      mixerChannel,
      waveformType,
      frequency,
      showFrequencyControl,
    } = this.props;

    return (
      <AudioControlGroup
        label={
          <Fragment>
            <span className="audio-control-label">
              {oscillator.name}
            </span>

            <Switch
              defaultValue
              onChange={this::this.toggle}
            />
          </Fragment>
        }
      >

        <WaveSelector
          defaultValue={waveformType}
          onChange={oscillator::oscillator.setWaveformType}
        />

        {showFrequencyControl &&
          <Slider
            label="Frequency"
            defaultValue={frequency}
            min={0}
            max={1000}
            step={1}
            onChange={oscillator::oscillator.setFrequency}
          />
        }

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
