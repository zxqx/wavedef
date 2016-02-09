import React from 'react';
import { render } from 'react-dom';

/**
 * Navigate between different synths
 */
export default class Nav extends React.Component
{
  render()
  {
    const { props } = this;

    return (
      <ul className='nav nav-pills'>
        <li className={props.isActive === '/drum' || props.isActive === '/' ? 'active' : null}>
          <a href='drum'>Drum Synth</a>
        </li>

        <li className={props.isActive === '/3osc' ? 'active' : null}>
          <a href='3osc'>3 Osc Synth</a>
        </li>
      </ul>
    )
  }
}
