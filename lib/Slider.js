import React from 'react';
import { render } from 'react-dom';

/**
 * A slider UI component for controlling audio parameters
 */
export default class Slider extends React.Component
{
  componentWillMount()
  {
    const { props } = this;
    props.onInput(props.defaultValue);
  }

  render()
  {
    const { props } = this;

    return (
      <div className='audio-control'>
        <label>{props.label}</label>
        <input type='range' defaultValue={props.defaultValue} min={props.min} max={props.max} step={props.step} onInput={(e) => props.onInput(e.target.value)} />
      </div>
    )
  }
}
