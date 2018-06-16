/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import stereoPannerNode from 'stereo-panner-node';
import AudioControlGroup from '../common/AudioControlGroup';
import Slider from '../common/Slider';

stereoPannerNode.polyfill();

export default class Chorus extends Component {
  static propTypes = {
    chorus: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { chorus } = this.props;

    return (
      <AudioControlGroup label="Chorus">
        chorus
      </AudioControlGroup>
    );
  }
}
