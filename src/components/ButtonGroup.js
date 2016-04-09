import React from 'react';
import { render } from 'react-dom';
import RadioGroup from 'react-radio';

/**
 * A button group UI component
 */
export default class ButtonGroup extends React.Component
{
  componentWillMount()
  {
    const { props } = this;
    props.onChange(props.defaultValue);
  }

  render()
  {
    const { props } = this;

    return (
      <RadioGroup name={props.name} value={props.defaultValue} onChange={props.onChange}>
        <div className='audio-control btn-group' data-toggle='buttons'>
          <label className='audio-control-label'>{props.label}</label>
          {props.children}
        </div>
      </RadioGroup>
    )
  }
}
