import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import classnames from 'classnames';
import Slider from '../common/Slider';
import AudioControlGroup from '../common/AudioControlGroup';
import playButton from '../assets/transport/play.png';
import stopButton from '../assets/transport/stop.png';
import './Sequencer.css';

export default class Sequencer extends Component {
  static propTypes = {
    sequencer: PropTypes.object.isRequired, // eslint-disable-line
  }

  state = {
    playing: false,
    selectedStep: null,
    stepTriggers: this.props.sequencer.stepTriggers,
  }

  componentDidMount() {
    this.props.sequencer.trigger(this::this.forceUpdate);
  }

  getSteps() {
    const { sequencer } = this.props;

    return new Array(sequencer.steps).fill().map((step, index) => index + 1);
  }

  render() {
    const { sequencer } = this.props;
    const { playing, selectedStep, stepTriggers } = this.state;
    const steps = this.getSteps();

    return (
      <AudioControlGroup label="Sequencer">
        <Row>
          <Col span={6}>
            <Slider
              label="BPM"
              defaultValue={90}
              min={30}
              max={300}
              step={1}
              onChange={(bpm) => {
                sequencer.setBpm(bpm);
                this.forceUpdate();
              }}
            />

            <h2 className="sequencer-bpm">{sequencer.bpm}</h2>
          </Col>

          <Col span={6} offset={3}>
            <Button
              className="sequencer-btn sequencer-transport-btn sequencer-transport-play-btn"
              disabled={playing}
              onClick={() => {
                sequencer.start();
                this.setState({ playing: true });
              }}
            >
              <img src={playButton} alt="Play" />
            </Button>

            <Button
              className="sequencer-btn sequencer-transport-btn sequencer-transport-stop-btn"
              disabled={!playing}
              onClick={() => {
                sequencer.stop();
                this.setState({ playing: false });
              }}
            >
              <img src={stopButton} alt="Stop" />
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="sequencer-steps">
              {steps.map(step => (
                <Button
                  key={step}
                  className={classnames({
                    'sequencer-btn': true,
                    'sequencer-step': true,
                    'sequencer-step-selected': selectedStep === step,
                    'sequencer-step-active': sequencer.activeStep === step,
                    'sequencer-step-trigger': stepTriggers[step],
                  })}
                  onClick={() =>
                    this.setState({
                      selectedStep: step,
                    })
                  }
                >
                  {step}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
      </AudioControlGroup>
    );
  }
}
