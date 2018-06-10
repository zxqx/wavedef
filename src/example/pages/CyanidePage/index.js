import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Cyanide from '../../../stock-synths/Cyanide';
import Oscillator from '../../Oscillator';
import Filter from '../../Filter';
import VolumeEnvelope from '../../VolumeEnvelope';
import FilterEnvelope from '../../FilterEnvelope';
import LFO from '../../LFO';
import Overdrive from '../../Overdrive';
import Phaser from '../../Phaser';
import Delay from '../../Delay';
import Ringmod from '../../Ringmod';
import Chorus from '../../Chorus';
import WhiteNoise from '../../WhiteNoise';
import Sequencer from '../../Sequencer';
import Oscilloscope from '../../Oscilloscope';
import Keyboard from '../../common/Keyboard';
import './CyanidePage.css';

const cyanide = new Cyanide();

export default class CyanidePage extends Component {
  componentWillMount() {
    cyanide.connectControllers();
  }

  componentWillUnmount() {
    cyanide.disconnectControllers();
  }

  render() {
    const {
      synth,
      osc,
      noise,
      filter,
      lfo1,
      lfo2,
      overdrive,
      phaser,
      delay,
      mixer,
      ringmod,
      chorus,
      volumeEnvelope,
      filterEnvelope,
      sequencer,
      frequencyAnalyzer,
    } = cyanide;

    const params = synth.getParams();

    return (
      <div className="cyanide">
        <Row>
          <Col>
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

            <WhiteNoise
              noise={noise}
              mixerChannel={mixer.channel(2)}
            />

            <VolumeEnvelope envelope={volumeEnvelope} />
            <FilterEnvelope envelope={filterEnvelope} />
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
            <Chorus chorus={chorus} />
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
            className="multi-column-span"
            xs={24}
            md={16}
            xl={9}
          >
            <Row>
              <Col span={24}>
                <Oscilloscope frequencyAnalyzer={frequencyAnalyzer} />
              </Col>
            </Row>

            <Row>
              <Col
                xs={24}
                md={12}
              >
                <Filter
                  filter={filter}
                  envelope={filterEnvelope}
                />

                <Overdrive overdrive={overdrive} />
              </Col>

              <Col
                xs={24}
                md={12}
              >
                <Phaser phaser={phaser} />
                <Delay delay={delay} />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row type="flex">
          <Col>
            <Keyboard
              octaves={5}
              startingOctave={1}
              onKeypress={[
                value => osc.setFrequency(value),
                (value) => {
                  volumeEnvelope.triggerADS(value);
                  filterEnvelope.triggerADS(value);
                },
                freq => sequencer.triggerAtSelectedStep(() => {
                  osc.setFrequency(freq);
                  volumeEnvelope.trigger();
                  filterEnvelope.trigger();
                }),
              ]}
              onKeyRelease={[
                value => volumeEnvelope.triggerRelease(value),
                value => filterEnvelope.triggerRelease(value),
              ]}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
