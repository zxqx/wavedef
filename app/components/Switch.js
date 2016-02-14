import React from 'react';
import { render } from 'react-dom';
import ReactSwitch from 'react-bootstrap-switch';

/**
 * A binary switch UI component for controlling audio parameters
 */
export default class Switch extends React.Component
{
  componentWillMount()
  {
    const { props } = this;
    if (props.state) {
      props.onToggleOn();
    }
  }

  render()
  {
    const { props } = this;

    return (
      <div className='audio-control'>
        <label className='audio-control-label'>{props.label}</label>
        <ReactSwitch state={props.state} animate={false} size='mini'
          onChange={(state) => {
            if (state && props.onToggleOn) props.onToggleOn();
            if (!state && props.onToggleOff) props.onToggleOff();
          }} />
      </div>
    )
  }
}
