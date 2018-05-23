import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import Slider from '../common/Slider';

export default class WhiteNoise extends Component {
  static propTypes = {
    noise: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { noise, mixer } = this.props;

    return (
      <AudioControlGroup label={noise.name}>

        <Slider
          label="Noise"
          defaultValue={0}
          min={0}
          max={1}
          step={0.001}
          onChange={mixer::mixer(2).setOffset1}
        />
      </AudioControlGroup>
    );
  }
}
