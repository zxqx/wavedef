import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'antd';
import classnames from 'classnames';
import AudioControlGroup from '../common/AudioControlGroup';
import Switch from '../common/Switch';
import DragInput from '../common/DragInput';
import recordIcon from '../assets/transport/record.png';
import playIcon from '../assets/transport/play.png';
import stopIcon from '../assets/transport/stop.png';
import clearIcon from '../assets/transport/clear.png';
import metronomeIcon from '../assets/icons/metronome.png';
import './Sequencer.css';

export default class Sequencer extends Component {
  static propTypes = {
    sequencer: PropTypes.object.isRequired, // eslint-disable-line
  }

  state = {
    recording: false,
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
    const { recording, playing } = this.state;

    const steps = this.getSteps();

    return (
      <AudioControlGroup className="sequencer">
        <Row>
          <Col span={6}>
            <DragInput
              label="BPM"
              defaultValue={120}
              min={30}
              max={300}
              onChange={(bpm) => {
                sequencer.setBpm(bpm);
                this.forceUpdate();
              }}
            />
          </Col>

          <Col span={12}>
            <Button
              className={classnames({
                'sequencer-btn': true,
                'sequencer-transport-btn': true,
                'sequencer-transport-record-btn': true,
                'sequencer-transport-record-btn-recording': recording,
              })}
              onClick={() => {
                if (sequencer.recording) {
                  sequencer.stopRecord();
                  this.setState({ recording: false });
                } else {
                  sequencer.record();

                  this.setState({
                    recording: true,
                    playing: true,
                  });

                  if (!sequencer.playing) {
                    sequencer.start();
                  }
                }
              }}
            >
              <img src={recordIcon} alt="Record" />

              <span>
                {`${recording ? 'Recording...' : 'Record'}`}
              </span>
            </Button>

            <Button
              className="sequencer-btn sequencer-transport-btn sequencer-transport-play-btn"
              disabled={playing}
              onClick={() => {
                sequencer.start();

                this.setState({ playing: true });
              }}
            >
              <img src={playIcon} alt="Play" />
              <span>Play</span>
            </Button>

            <Button
              className="sequencer-btn sequencer-transport-btn sequencer-transport-stop-btn"
              disabled={!playing}
              onClick={() => {
                sequencer.stop();
                sequencer.stopRecord();

                this.setState({
                  recording: false,
                  playing: false,
                });
              }}
            >
              <img src={stopIcon} alt="Stop" />
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
              <img src={clearIcon} alt="Clear" />
              <span>Clear</span>
            </Button>
          </Col>

          <Col offset={2} span={4}>
            <div className="sequencer-metronome-switch">
              <img src={metronomeIcon} alt="Metronome" />

              <Switch
                label="Metronome"
                defaultValue
                onChange={sequencer::sequencer.setMetronomeStatus}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <div
              className={classnames({
                'sequencer-steps': true,
                'sequencer-steps-recording': recording,
              })}
            >
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
