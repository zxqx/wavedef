import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
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
    const { lfo, params } = this.props;

    return params
      .filter(param => param.context !== lfo)
      .map(param => ({
        label: `${param.context.name} ${param.label}`,
        value: `${param.context.name}.${param.path}`,
      }));
  }

  render() {
    const { lfo, params } = this.props;

    const options = this.getOptions();

    return (
      <AudioControlGroup label={lfo.name}>
        <Dropdown
          label="Destination"
          defaultValue={options[0].value}
          options={options}
          onChange={(value) => {
            const { context, path } = params.find(param => `${param.context.name}.${param.path}` === value);
            lfo.modulateOne(get(context, path));
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
