import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import Slider from '../common/Slider';
import Switch from '../common/Switch';

export default class WhiteNoise extends Component {
  static propTypes = {
    noise: PropTypes.object.isRequired, // eslint-disable-line
    mixerChannel: PropTypes.object.isRequired, // eslint-disable-line
  }

  toggle(on) {
    const { mixerChannel } = this.props;

    return on ? mixerChannel.toggleOn() : mixerChannel.toggleOff();
  }

  render() {
    const { noise, mixerChannel } = this.props;

    return (
      <AudioControlGroup
        label={
          <Fragment>
            {noise.name}
            <Switch
              defaultValue={false}
              onChange={this::this.toggle}
            />
          </Fragment>
        }
      >

        <Slider
          label="Volume"
          defaultValue={0}
          min={0}
          max={1}
          step={0.001}
          onChange={mixerChannel::mixerChannel.setGain}
        />
      </AudioControlGroup>
    );
  }
}
