import React, { Component } from 'react';
import Nav from '../components/Nav.js';

export default class App extends Component {
  render() {
    return (
      <div>
        <Nav isActive={window.location.pathname} />
        {this.props.children}
      </div>
    )
  }
}
