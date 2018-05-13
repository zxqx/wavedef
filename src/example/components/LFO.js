import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import AudioControlGroup from './AudioControlGroup';
import Dropdown from './Dropdown';
import ButtonGroup from './ButtonGroup';
import Slider from './Slider';

export default class LFO extends Component {
  static propTypes = {
    lfo: PropTypes.object.isRequired, // eslint-disable-line
    params: PropTypes.array.isRequired, // eslint-disable-line
  }

  render() {
    const { lfo, params } = this.props;

    return (
      <AudioControlGroup label="LFO">
        <Dropdown
          label="Destination"
          defaultValue={1}
          options={params}
          onChange={(paramIndex) => {
            const { context, path } = params[paramIndex];
            lfo.modulateOne(get(context, path));
          }}
        />

        <ButtonGroup
          label="Waveform"
          defaultValue="sine"
          options={[
            { label: 'SN', value: 'sine' },
            { label: 'SQ', value: 'square' },
            { label: 'SW', value: 'sawtooth' },
            { label: 'TR', value: 'triangle' },
          ]}
          onChange={lfo::lfo.setWaveformType}
        />

        <Slider
          label="Depth"
          defaultValue={200}
          min={0}
          max={1000}
          step={0.1}
          onChange={lfo::lfo.setDepth}
        />

        <Slider
          label="Speed"
          defaultValue={1}
          min={0}
          max={20}
          step={0.001}
          onChange={lfo::lfo.setFrequency}
        />
      </AudioControlGroup>
    );
  }
}
