import React from 'react';

/**
 * A slider UI component for controlling audio parameters
 */
export default class Slider extends React.Component
{
  componentWillMount()
  {
    const { props } = this;
    props.onInput(props.defaultValue);

    this.classes = ['audio-control'];
    if (props.vertical) {
      this.classes.push('vertical-slider');
    }
  }

  render()
  {
    const { props } = this;

    return (
      <div className={this.classes.join(' ')}>
        <label className='audio-control-label'>{props.label}</label>
        <input type='range' defaultValue={props.defaultValue} min={props.min} max={props.max}
          step={props.step} onInput={(e) => props.onInput(e.target.value)} />
      </div>
    )
  }
}
