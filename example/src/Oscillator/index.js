import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import WaveSelector from '../common/WaveSelector';
import Switch from '../common/Switch';
import Slider from '../common/Slider';

export default class Oscillator extends Component {
  static propTypes = {
    oscillator: PropTypes.shape({
      node: PropTypes.object.isRequired, // eslint-disable-line
    }).isRequired,
    mixerChannel: PropTypes.object.isRequired, // eslint-disable-line
    label: PropTypes.string,
  }

  static defaultProps = {
    label: 'Oscillator',
  }

  toggle(on) {
    const { mixerChannel } = this.props;

    return on ? mixerChannel.toggleOn() : mixerChannel.toggleOff();
  }

  render() {
    const { oscillator, mixerChannel, label } = this.props;

    return (
      <AudioControlGroup
        label={
          <Fragment>
            <span className="audio-control-label">
              {label}
            </span>

            <Switch
              defaultValue
              onChange={this::this.toggle}
            />
          </Fragment>
        }
      >

        <WaveSelector
          defaultValue="sawtooth"
          onChange={oscillator::oscillator.setType}
        />

        <Slider
          label="Detune"
          defaultValue={0}
          min={-1200}
          max={1200}
          step={1}
          onChange={oscillator::oscillator.setDetune}
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
