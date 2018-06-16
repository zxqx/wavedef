import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import Dropdown from '../common/Dropdown';
import WaveSelector from '../common/WaveSelector';
import Slider from '../common/Slider';

export default class LFO extends Component {
  static propTypes = {
    lfo: PropTypes.object.isRequired, // eslint-disable-line
    params: PropTypes.array.isRequired, // eslint-disable-line
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
    const { lfo, params } = this.props;
    const options = this.getOptions();

    return (
      <AudioControlGroup label="LFO">
        <Dropdown
          label="Destination"
          defaultValue={options[0].value}
          options={options}
          onChange={(value) => {
            if (value === 'none') {
              return lfo.disconnect();
            }

            const { path } = params.find(param => param.value === value);
            return lfo.modulateOne(path);
          }}
        />

        <WaveSelector
          defaultValue="sine"
          onChange={lfo::lfo.setWaveformType}
        />

        <Slider
          label="Depth"
          defaultValue={0}
          min={0}
          max={1000}
          step={0.1}
          onChange={lfo::lfo.setDepth}
        />

        <Slider
          label="Speed"
          defaultValue={1}
          min={0.1}
          max={20}
          step={0.01}
          onChange={lfo::lfo.setFrequency}
        />
      </AudioControlGroup>
    );
  }
}
