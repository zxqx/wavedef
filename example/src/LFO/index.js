import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import Dropdown from '../common/Dropdown';
import WaveSelector from '../common/WaveSelector';
import Slider from '../common/Slider';

export default class LFO extends Component {
  static propTypes = {
    label: PropTypes.string,
    lfo: PropTypes.object.isRequired, // eslint-disable-line
    params: PropTypes.array.isRequired, // eslint-disable-line
  }

  static defaultProps = {
    label: 'LFO',
  }

  getOptions() {
    const { params } = this.props;

    return [
      {
        label: 'None',
        value: 'none',
      },
      ...params,
    ];
  }

  render() {
    const { label, lfo, params } = this.props;
    const options = this.getOptions();

    return (
      <AudioControlGroup label={label}>
        <Dropdown
          label="Destination"
          defaultValue={options[0].value}
          options={options}
          onChange={(value) => {
            if (value === 'none') {
              return lfo.disconnectAll();
            }

            const { path } = params.find(param => param.value === value);

            return lfo
              .disconnectAll()
              .modulate(path);
          }}
        />

        <WaveSelector
          defaultValue="sine"
          onChange={lfo::lfo.setType}
        />

        <Slider
          label="Depth"
          defaultValue={100}
          min={0}
          max={400}
          step={0.1}
          onChange={lfo::lfo.setDepth}
        />

        <Slider
          label="Rate"
          defaultValue={1}
          min={0.1}
          max={20}
          step={0.01}
          onChange={lfo::lfo.setRate}
        />
      </AudioControlGroup>
    );
  }
}
