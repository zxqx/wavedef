import React, { Component } from 'react';
import PropTypes from 'prop-types';
import oscilloscopeImage from '../assets/tools/oscilloscope.png';
import './Oscilloscope.css';

export default class Oscilloscope extends Component {
  static propTypes = {
    frequencyAnalyzer: PropTypes.object.isRequired, // eslint-disable-line
  }

  componentDidMount() {
    const { frequencyAnalyzer } = this.props;

    frequencyAnalyzer.draw(this.frequencyAnalyzer.current, {
      fftSize: 2048,
      height: 607,
      lineThickness: 15,
      lineColor: '#8500ff',
    });
  }

  frequencyAnalyzer = React.createRef();

  render() {
    return (
      <div className="oscilloscope">
        <div
          className="frequency-analyzer"
          ref={this.frequencyAnalyzer}
        />
        <img
          src={oscilloscopeImage}
          alt="Oscilloscope"
        />
      </div>
    );
  }
}
