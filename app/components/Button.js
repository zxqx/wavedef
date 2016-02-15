import React from 'react';
import { render } from 'react-dom';

/**
 * A button UI component
 */
export default class Button extends React.Component
{
  render()
  {
    const { props } = this;

    return (
      <label className='btn btn-sm btn-default btn-waveform-type'>
        <input type='radio' value={props.value} />{props.label}
        {(props.icon ?
          <span>
            <img src={`./images/icons/${props.icon}.png`} className='icon-xs' alt={props.label} />
          </span>
          : '')}
      </label>
    )
  }
}
