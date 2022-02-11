import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AudioControlGroup from '../common/AudioControlGroup';
import Switch from '../common/Switch';
import Slider from '../common/Slider';

export default class Overdrive extends Component {
  static propTypes = {
    overdrive: PropTypes.object.isRequired, // eslint-disable-line
  }

  render() {
    const { overdrive } = this.props;

    return (
      <AudioControlGroup
        label={
          <Fragment>
            <span className="audio-control-label">
              Overdrive
            </span>

            <Switch
              defaultValue={false}
              onChange={on => overdrive.setBypass(!on)}
            />
          </Fragment>
        }
      >
        <Slider
          label="Drive"
          defaultValue={0.8}
          min={0}
          max={1}
          step={0.01}
          onChange={overdrive::overdrive.setDrive}
        />

        <Slider
          label="Algorithm"
          defaultValue={3}
          min={0}
          max={5}
          step={1}
          onChange={overdrive::overdrive.setAlgorithmIndex}
        />
      </AudioControlGroup>
    );
  }
}
