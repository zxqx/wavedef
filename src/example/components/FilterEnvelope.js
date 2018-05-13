import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from './AudioControlGroup';
import Slider from './Slider';

export default class FilterEnvelope extends Component {
  static propTypes = {
    envelope: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { envelope } = this.props;

    return (
      <AudioControlGroup label="Filter Envelope">
        <Slider
          label="A"
          defaultValue={0}
          min={0}
          max={10}
          step={0.1}
          onChange={envelope::envelope.setAttack}
        />

        <Slider
          label="D"
          defaultValue={0}
          min={0}
          max={10}
          step={0.1}
          onChange={envelope::envelope.setDecay}
        />

        <Slider
          label="S"
          defaultValue={800}
          min={0}
          max={5000}
          step={0.1}
          onChange={envelope::envelope.setSustain}
        />

        <Slider
          label="R"
          defaultValue={0.5}
          min={0}
          max={10}
          step={0.1}
          onChange={envelope::envelope.setRelease}
        />
      </AudioControlGroup>
    );
  }
}
