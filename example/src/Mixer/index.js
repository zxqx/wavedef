import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import Slider from '../common/Slider';

export default class Mixer extends Component {
  static propTypes = {
    mixer: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { mixer } = this.props;

    return (
      <AudioControlGroup label="Mixer">
        {mixer.children.map((channel, index) => (
          <Slider
            key={channel}
            label={`Channel ${index + 1}`}
            defaultValue={1}
            min={0}
            max={1}
            step={0.001}
            onChange={channel::channel.setGain}
          />
        ))}
      </AudioControlGroup>
    );
  }
}
