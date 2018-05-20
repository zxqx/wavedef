import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Cyanide from '../../../stock-synths/Cyanide';
import Oscillator from '../../Oscillator';
import Filter from '../../Filter';
import VolumeEnvelope from '../../VolumeEnvelope';
import LFO from '../../LFO';
import Overdrive from '../../Overdrive';
import Phaser from '../../Phaser';
import Delay from '../../Delay';
import Ringmod from '../../Ringmod';
import Sequencer from '../../Sequencer';
import Keyboard from '../../common/Keyboard';
import './CyanidePage.css';

const cyanide = new Cyanide();

export default class CyanidePage extends Component {
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
      ringmod,
      volumeEnvelope,
      sequencer,
    } = cyanide;

    const params = synth.getParams();

    return (
      <div className="cyanide">
        <Row>
          <Col span={24}>
            <h2 className="cyanide-header">[cyanide]</h2>
            <Sequencer sequencer={sequencer} />
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
            <Ringmod ringmod={ringmod} />
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
                freq => sequencer.triggerAtSelectedStep(() => {
                  osc.setFrequency(freq);
                  volumeEnvelope.trigger();
                }),
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
