import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Hydra from '../../../stock-synths/Hydra';
import Oscillator from '../../Oscillator';
import WhiteNoise from '../../WhiteNoise';
import LFO from '../../LFO';
import Filter from '../../Filter';
import './HydraPage.css';

export default class HydraPage extends Component {
  componentWillMount() {
    this.hydra = new Hydra();

    this.hydra.turnOnMixer();
  }

  componentWillUnmount() {
    this.hydra.turnOffMixer();
  }

  render() {
    const {
      synth,
      mixer,
      osc1,
      osc2,
      osc3,
      osc4,
      noise,
      lfo1,
      lfo2,
      lfo3,
      lfo4,
      filter,
    } = this.hydra;

    const params = synth.getParams();

    return (
      <div className="hydra">
        <Row>
          <Col
            xs={24}
            md={8}
            xl={6}
          >
            <Oscillator
              oscillator={osc1}
              mixerChannel={mixer.channel(1)}
              waveformType="square"
              frequency={80}
              showFrequencyControl
            />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={6}
          >
            <Oscillator
              oscillator={osc2}
              mixerChannel={mixer.channel(2)}
              waveformType="sawtooth"
              frequency={100}
              showFrequencyControl
            />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={6}
          >
            <Oscillator
              oscillator={osc3}
              mixerChannel={mixer.channel(3)}
              waveformType="sine"
              frequency={170}
              showFrequencyControl
            />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={6}
          >
            <Oscillator
              oscillator={osc4}
              mixerChannel={mixer.channel(4)}
              waveformType="triangle"
              frequency={450}
              showFrequencyControl
            />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={6}
          >
            <LFO
              lfo={lfo1}
              params={params}
            />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={6}
          >
            <LFO
              lfo={lfo2}
              params={params}
            />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={6}
          >
            <LFO
              lfo={lfo3}
              params={params}
            />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={6}
          >
            <LFO
              lfo={lfo4}
              params={params}
            />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={6}
          >
            <Filter
              filter={filter}
              cutoff={1000}
            />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={6}
          >
            <WhiteNoise
              noise={noise}
              volume={0.4}
              mixerChannel={mixer.channel(5)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
