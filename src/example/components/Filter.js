import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from './AudioControlGroup';
import Slider from './Slider';

export default class Filter extends Component {
  static propTypes = {
    filter: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { filter } = this.props;

    return (
      <AudioControlGroup label={filter.name}>
        <Slider
          label="Cutoff"
          defaultValue={350}
          min={10}
          max={2000}
          step={1}
          onChange={filter::filter.setFrequency}
        />

        <Slider
          label="Resonance"
          defaultValue={1}
          min={1}
          max={14}
          step={0.01}
          onChange={filter::filter.setResonance}
        />
      </AudioControlGroup>
    );
  }
}
