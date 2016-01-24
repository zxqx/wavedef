import React from 'react';
import { render } from 'react-dom';

export default class AudioControlGroup extends React.Component
{
  render()
  {
    return (
      <div className='audio-control-group'>
        {this.props.children}
      </div>
    )
  }
}
