import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import Slider from '../common/Slider';

export default class Chorus extends Component {
  static propTypes = {
    chorus: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { chorus } = this.props;

    return (
      <AudioControlGroup label="Chorus">

        <Slider
          label="Offset 1"
          defaultValue={0.006}
          min={0.001}
          max={0.1}
          step={0.001}
          onChange={chorus::chorus.setOffset1Time}
        />

        <Slider
          label="Offset 2"
          defaultValue={0.020}
          min={0.001}
          max={0.1}
          step={0.001}
          onChange={chorus::chorus.setOffset2Time}
        />

        <Slider
          label="Width"
          defaultValue={0}
          min={0}
          max={1}
          step={0.01}
          onChange={chorus::chorus.setWidth}
        />

        <Slider
          label="Movement"
          defaultValue={0.005}
          min={0.05}
          max={1}
          step={0.001}
          onChange={chorus::chorus.setMovement}
        />

        <Slider
          label="Mix"
          defaultValue={0}
          min={0}
          max={1}
          step={0.001}
          onChange={chorus::chorus.setMix}
        />
      </AudioControlGroup>
    );
  }
}
