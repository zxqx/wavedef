import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Cyanide from '../../stock-synths/Cyanide';
import Oscillator from '../Oscillator';
import Filter from '../Filter';
import VolumeEnvelope from '../VolumeEnvelope';
import LFO from '../LFO';
import Overdrive from '../Overdrive';
import Phaser from '../Phaser';
import Delay from '../Delay';
import Keyboard from '../common/Keyboard';
import './App.css';

const cyanide = new Cyanide();

export default class App extends Component {
  render() {
    const {
      synth,
      osc,
      filter,
      lfo1,
      lfo2,
      overdrive,
      phaser,
      delay,
      mixer,
      volumeEnvelope,
    } = cyanide;

    const params = synth.getParams();

    return (
      <div className="app">
        <Row type="flex" justify="center">
          <Col span={24}>
            <h1>wavedef</h1>
          </Col>
        </Row>

        <Row type="flex" justify="center">
          <Col
            xs={24}
            md={8}
            xl={5}
          >
            <Oscillator
              oscillator={osc}
              mixerChannel={mixer.channel(1)}
            />
            <VolumeEnvelope envelope={volumeEnvelope} />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={5}
          >
            <LFO
              lfo={lfo1}
              params={params}
            />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={5}
          >
            <LFO
              lfo={lfo2}
              params={params}
            />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={5}
          >
            <Filter filter={filter} />
            <Overdrive overdrive={overdrive} />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={4}
          >
            <Phaser phaser={phaser} />
            <Delay delay={delay} />
          </Col>
        </Row>

        <Row type="flex" justify="center">
          <Col span={24}>
            <Keyboard
              octaves={7}
              startingOctave={1}
              onKeypress={[
                value => osc.setFrequency(value),
                value => volumeEnvelope.triggerADS(value),
              ]}
              onKeyRelease={[
                value => volumeEnvelope.triggerRelease(value),
              ]}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
