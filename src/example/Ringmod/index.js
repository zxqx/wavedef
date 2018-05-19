import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import Slider from '../common/Slider';

export default class Ringmod extends Component {
  static propTypes = {
    ringmod: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { ringmod } = this.props;

    return (
      <AudioControlGroup label={ringmod.name}>
        <Slider
          label="Frequency"
          defaultValue={0.5}
          min={0.01}
          max={1000}
          step={0.01}
          onChange={ringmod::ringmod.setFrequency}
        />

        <Slider
          label="Depth"
          defaultValue={0.25}
          min={0}
          max={1}
          step={0.01}
          onChange={ringmod::ringmod.setGain}
        />

        <Slider
          label="Mix"
          defaultValue={0}
          min={0}
          max={1}
          step={0.01}
          onChange={ringmod::ringmod.setWetDryMix}
        />
      </AudioControlGroup>
    );
  }
}
