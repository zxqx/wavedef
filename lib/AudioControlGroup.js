import React from 'react';
import { render } from 'react-dom';

export default class AudioControlGroup extends React.Component
{
  render()
  {
    const { props } = this;

    return (
      <div className='audio-control-group'>
        <h4>{props.label}</h4>
        {props.children}
      </div>
    )
  }
}
