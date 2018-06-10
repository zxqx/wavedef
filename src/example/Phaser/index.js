import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import Switch from '../common/Switch';
import Slider from '../common/Slider';

export default class Phaser extends Component {
  static propTypes = {
    phaser: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { phaser } = this.props;

    return (
      <AudioControlGroup
        label={
          <Fragment>
            <span className="audio-control-label">
              {phaser.name}
            </span>

            <Switch
              defaultValue={false}
              onChange={on => phaser.setBypass(!on)}
            />
          </Fragment>
        }
      >

        <Slider
          label="Rate"
          defaultValue={1.2}
          min={0.01}
          max={8}
          step={0.01}
          onChange={phaser::phaser.setRate}
        />

        <Slider
          label="Depth"
          defaultValue={0.3}
          min={0}
          max={1}
          step={0.01}
          onChange={phaser::phaser.setDepth}
        />

        <Slider
          label="Feedback"
          defaultValue={0.2}
          min={0}
          max={1}
          step={0.01}
          onChange={phaser::phaser.setFeedback}
        />

        <Slider
          label="Stereo Phase"
          defaultValue={30}
          min={0}
          max={180}
          step={1}
          onChange={phaser::phaser.setStereoPhase}
        />

        <Slider
          label="Base Modulation Frequency"
          defaultValue={700}
          min={500}
          max={1500}
          step={1}
          onChange={phaser::phaser.setBaseModulationFrequency}
        />
      </AudioControlGroup>
    );
  }
}
