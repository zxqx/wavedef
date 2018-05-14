import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Cyanide from '../../stock-synths/Cyanide';
import Oscillator from '../Oscillator';
import Filter from '../Filter';
import VolumeEnvelope from '../VolumeEnvelope';
import LFO from '../LFO';
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
      delay,
      mixer,
      volumeEnvelope,
    } = cyanide;

    const params = synth.getParams();

    return (
      <div className="app">
        <Row type="flex" justify="center">
          <Col span={23}>
            <h1>wavedef</h1>
          </Col>
        </Row>

        <Row type="flex" justify="center">
          <Col span={5}>
            <Oscillator
              oscillator={osc}
              mixerChannel={mixer.channel(1)}
            />

            <Filter filter={filter} />
          </Col>

          <Col span={4}>
            <VolumeEnvelope envelope={volumeEnvelope} />
          </Col>

          <Col span={5}>
            <LFO
              lfo={lfo1}
              params={params.filter(param => param.context !== lfo1)}
            />
          </Col>

          <Col span={5}>
            <LFO
              lfo={lfo2}
              params={params.filter(param => param.context !== lfo2)}
            />
          </Col>

          <Col span={4}>
            <Delay delay={delay} />
          </Col>
        </Row>

        <Row type="flex" justify="center">
          <Col span={23}>
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
