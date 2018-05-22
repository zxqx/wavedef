import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import classnames from 'classnames';
import DragInput from '../common/DragInput';
import AudioControlGroup from '../common/AudioControlGroup';
import playButton from '../assets/transport/play.png';
import stopButton from '../assets/transport/stop.png';
import clearButton from '../assets/transport/clear.png';
import './Sequencer.css';

export default class Sequencer extends Component {
  static propTypes = {
    sequencer: PropTypes.object.isRequired, // eslint-disable-line
  }

  state = {
    playing: false,
  }

  componentDidMount() {
    const { sequencer } = this.props;

    sequencer.trigger(this::this.forceUpdate);
    sequencer.onSetTrigger(this::this.forceUpdate);
  }

  componentWillUnmount() {
    this.props.sequencer.reset();
  }

  getSteps() {
    const { sequencer } = this.props;

    return new Array(sequencer.steps).fill().map((step, index) => index + 1);
  }

  getNumberOfTriggers() {
    const { sequencer } = this.props;

    return Object.keys(sequencer.stepTriggers)
      .map(step => sequencer.stepTriggers[step])
      .filter(trigger => trigger !== null)
      .length;
  }

  render() {
    const { sequencer } = this.props;
    const { playing } = this.state;

    const steps = this.getSteps();

    return (
      <AudioControlGroup>
        <Row>
          <Col span={6}>
            <DragInput
              label="BPM"
              defaultValue={90}
              min={30}
              max={300}
              onChange={(bpm) => {
                sequencer.setBpm(bpm);
                this.forceUpdate();
              }}
            />
          </Col>

          <Col span={9} offset={1}>
            <Button
              className="sequencer-btn sequencer-transport-btn sequencer-transport-play-btn"
              disabled={playing}
              onClick={() => {
                sequencer.start();
                this.setState({ playing: true });
              }}
            >
              <img src={playButton} alt="Play" />
              <span>Play</span>
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
              <span>Stop</span>
            </Button>

            <Button
              className="sequencer-btn sequencer-transport-btn sequencer-transport-clear-btn"
              disabled={this.getNumberOfTriggers() === 0}
              onClick={() => {
                sequencer.clearPattern();
                this.forceUpdate();
              }}
            >
              <img src={clearButton} alt="Clear" />
              <span>Clear</span>
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
                    'sequencer-step-selected': sequencer.selectedStep === step,
                    'sequencer-step-active': sequencer.activeStep === step && playing,
                    'sequencer-step-trigger': sequencer.stepTriggers[step],
                    'sequencer-step-marker': (step - 1) % 4 === 0,
                  })}
                  onClick={() => {
                    sequencer.clearTriggerAtStep(step);
                    sequencer.setSelectedStep(step);
                    this.forceUpdate();
                  }}
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
