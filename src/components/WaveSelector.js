import React from 'react';
import { render } from 'react-dom';
import ButtonGroup from './ButtonGroup.js';
import Button from './Button.js';
import sineIcon from '../static/images/icons/waveforms/sine.png';
import squareIcon from '../static/images/icons/waveforms/square.png';
import sawtoothIcon from '../static/images/icons/waveforms/sawtooth.png';
import triangleIcon from '../static/images/icons/waveforms/triangle.png';

/**
 * A waveform selector UI component
 */
export default class WaveSelector extends React.Component
{
  render()
  {
    const { props } = this;

    return (
      <ButtonGroup label={props.label} name={props.name} defaultValue={props.defaultValue} onChange={props.onChange}>
        <Button icon={sineIcon} value='sine' />
        <Button icon={squareIcon} value='square' />
        <Button icon={sawtoothIcon} value='sawtooth' />
        <Button icon={triangleIcon} value='triangle' />
      </ButtonGroup>
    )
  }
}
