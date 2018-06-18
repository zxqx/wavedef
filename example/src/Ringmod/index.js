import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import Slider from '../common/Slider';
import WaveSelector from '../common/WaveSelector';

export default class Ringmod extends Component {
  static propTypes = {
    ringmod: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { ringmod } = this.props;

    return (
      <AudioControlGroup label="Ring Modulator">
        <WaveSelector
          defaultValue="sine"
          onChange={ringmod::ringmod.setType}
        />
        <Slider
          label="Frequency"
          defaultValue={100}
          min={2}
          max={1000}
          step={1}
          onChange={ringmod::ringmod.setFrequency}
        />

        <Slider
          label="Depth"
          defaultValue={1}
          min={0}
          max={1}
          step={0.01}
          onChange={ringmod::ringmod.setDepth}
        />

        <Slider
          label="Mix"
          defaultValue={0}
          min={0}
          max={1}
          step={0.01}
          onChange={ringmod::ringmod.setMix}
        />
      </AudioControlGroup>
    );
  }
}
