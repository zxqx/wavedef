import React from 'react';
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

    this.classes = ['audio-control'];
    this.classes.push(props.className);
  }

  render()
  {
    const { props } = this;

    return (
      <div className={this.classes.join(' ')}>
        <label className='audio-control-label'>{props.label}</label>
        <ReactSwitch state={props.state} animate={true} size='mini'
          onChange={(state) => {
            if (state && props.onToggleOn) props.onToggleOn();
            if (!state && props.onToggleOff) props.onToggleOff();
          }} />
      </div>
    )
  }
}
