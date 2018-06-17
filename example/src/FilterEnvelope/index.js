import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import AudioControlGroup from '../common/AudioControlGroup';
import Slider from '../common/Slider';

export default class FilterEnvelope extends Component {
  static propTypes = {
    envelope: PropTypes.shape({
      attack: PropTypes.number,
      decay: PropTypes.number,
      sustain: PropTypes.number,
      release: PropTypes.number,
      destination: PropTypes.object.isRequired, // eslint-disable-line
    }).isRequired,
  }

  render() {
    const { envelope } = this.props;

    return (
      <AudioControlGroup label="Filter Envelope">
        <Row>
          <Col>
            <Slider
              label="A"
              defaultValue={0}
              min={0}
              max={10}
              step={0.1}
              vertical
              onChange={envelope::envelope.setAttack}
            />

            <Slider
              label="D"
              defaultValue={0.1}
              min={0.001}
              max={1}
              step={0.001}
              vertical
              onChange={envelope::envelope.setDecay}
            />

            <Slider
              label="S"
              defaultValue={1}
              min={0}
              max={1}
              step={0.001}
              vertical
              onChange={envelope::envelope.setSustain}
            />

            <Slider
              label="R"
              defaultValue={0.1}
              min={0}
              max={10}
              step={0.1}
              vertical
              onChange={envelope::envelope.setRelease}
            />
          </Col>
        </Row>

        <Slider
          label="Intensity"
          defaultValue={0.2}
          min={0}
          max={1}
          step={0.001}
          onChange={(value) => {
            envelope.setPeakLevel(value * 1000);
          }}
        />
      </AudioControlGroup>
    );
  }
}
