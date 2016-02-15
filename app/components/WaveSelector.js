import React from 'react';
import { render } from 'react-dom';
import ButtonGroup from './ButtonGroup.js';
import Button from './Button.js';

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
        <Button label='SN' value='sine' />
        <Button label='SQ' value='square' />
        <Button label='SW' value='sawtooth' />
        <Button label='TR' value='triangle' />
      </ButtonGroup>
    )
  }
}
