import React, { Component } from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash.capitalize';
import AudioControlGroup from '../common/AudioControlGroup';
import Dropdown from '../common/Dropdown';
import Slider from '../common/Slider';

export default class Filter extends Component {
  static propTypes = {
    filter: PropTypes.object.isRequired, // eslint-disable-line
    envelope: PropTypes.object, // eslint-disable-line
    cutoff: PropTypes.number,
  }

  static defaultProps = {
    envelope: null,
    cutoff: 350,
  }

  getOptions() {
    const { filter } = this.props;

    return filter.types.map(type => ({
      label: capitalize(type),
      value: type,
    }));
  }

  render() {
    const { filter, envelope, cutoff } = this.props;

    return (
      <AudioControlGroup label={filter.name}>
        <Dropdown
          label="Type"
          defaultValue="lowpass"
          options={this.getOptions()}
          onChange={filter::filter.setFilterType}
        />

        <Slider
          label="Cutoff"
          defaultValue={cutoff}
          min={10}
          max={2000}
          step={1}
          onChange={(value) => {
            filter.setFrequency(value);

            if (envelope) {
              envelope.setStart(value);
            }
          }}
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
