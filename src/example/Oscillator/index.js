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
  }

  toggle(on) {
    const { mixerChannel } = this.props;

    return on ? mixerChannel.toggleOn() : mixerChannel.toggleOff();
  }

  render() {
    const { oscillator, mixerChannel } = this.props;

    return (
      <AudioControlGroup
        label={
          <Fragment>
            {oscillator.name}
            <Switch
              defaultValue
              onChange={this::this.toggle}
            />
          </Fragment>
        }
      >

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
