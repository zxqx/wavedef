import React from 'react';
import { render } from 'react-dom';

export default class Slider extends React.Component
{
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
