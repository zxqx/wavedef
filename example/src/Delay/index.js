import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import Slider from '../common/Slider';

export default class Delay extends Component {
  static propTypes = {
    delay: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { delay } = this.props;

    return (
      <AudioControlGroup label="Delay">
        <Slider
          label="Time"
          defaultValue={0.5}
          min={0.01}
          max={1}
          step={0.01}
          onChange={delay::delay.setTime}
        />

        <Slider
          label="Feedback"
          defaultValue={0.25}
          min={0}
          max={1}
          step={0.01}
          onChange={delay::delay.setFeedback}
        />

        <Slider
          label="Mix"
          defaultValue={0}
          min={0}
          max={1}
          step={0.01}
          onChange={delay::delay.setMix}
        />
      </AudioControlGroup>
    );
  }
}
