import React from 'react';
import { render } from 'react-dom';

/**
 * A wrapper for grouping related audio controls
 */
export default class AudioControlGroup extends React.Component
{
  componentWillMount()
  {
    const { props } = this;
    this.classes = ['audio-control-group'];

    this.classes.push(props.className);
  }

  render()
  {
    const { props } = this;

    return (
      <div className={this.classes.join(' ')}>
        <h4>{props.label}</h4>
        {props.children}
      </div>
    )
  }
}
