import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '../ButtonGroup';
import sineWaveIcon from '../../assets/waveforms/sine.png';
import squareWaveIcon from '../../assets/waveforms/square.png';
import sawtoothWaveIcon from '../../assets/waveforms/sawtooth.png';
import triangleWaveIcon from '../../assets/waveforms/triangle.png';
import './WaveSelector.css';

export default class WaveSelector extends Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    defaultValue: 'sawtooth',
  }

  render() {
    const { defaultValue, onChange } = this.props;

    return (
      <ButtonGroup
        label="Waveform"
        defaultValue={defaultValue}
        className="wave-selector"
        onChange={onChange}
        options={[
          {
            label: <img src={sineWaveIcon} alt="Sine" />,
            value: 'sine',
          },
          {
            label: <img src={squareWaveIcon} alt="Square" />,
            value: 'square',
          },
          {
            label: <img src={sawtoothWaveIcon} alt="Sawtooth" />,
            value: 'sawtooth',
          },
          {
            label: <img src={triangleWaveIcon} alt="Triangle" />,
            value: 'triangle',
          },
        ]}
      />
    );
  }
}
