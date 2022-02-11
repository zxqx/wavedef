import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Cyanide } from '../../../../src/index';
import Oscillator from '../../Oscillator';
import Filter from '../../Filter';
import VolumeEnvelope from '../../VolumeEnvelope';
import FilterEnvelope from '../../FilterEnvelope';
import LFO from '../../LFO';
import Overdrive from '../../Overdrive';
import Delay from '../../Delay';
import Ringmod from '../../Ringmod';
import Chorus from '../../Chorus';
import Sequencer from '../../Sequencer';
import Oscilloscope from '../../Oscilloscope';
import Keyboard from '../../common/Keyboard';
import './CyanidePage.css';

const cyanide = new Cyanide();

const {
  osc,
  filter,
  lfo1,
  lfo2,
  overdrive,
  delay,
  mixer,
  ringmod,
  chorus,
  volumeEnvelope,
  filterEnvelope,
  sequencer,
  frequencyAnalyzer,
} = cyanide;

const lfoParams = [
  {
    label: 'Oscillator Frequency',
    value: 'oscillator-frequency',
    path: osc.node.frequency,
  },
  {
    label: 'Filter Cutoff',
    value: 'filter-cutoff',
    path: filter.node.frequency,
  },
  {
    label: 'Filter Resonance',
    value: 'filter-resonance',
    path: filter.node.Q,
  },
  {
    label: 'Ring Modulator Frequency',
    value: 'ring-modulator-frequency',
    path: ringmod.lfo.osc.node.frequency,
  },
];

export default class CyanidePage extends Component {
  componentWillMount() {
    cyanide.connectControllers();
  }

  componentWillUnmount() {
    cyanide.disconnectControllers();
  }

  render() {
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

            <VolumeEnvelope envelope={volumeEnvelope} />
            <FilterEnvelope envelope={filterEnvelope} />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={5}
          >
            <LFO
              label="LFO 1"
              lfo={lfo1}
              params={[
                ...lfoParams,
                {
                  label: 'LFO 2 Depth',
                  value: 'lfo-2-depth',
                  path: lfo2.gain.node.gain,
                },
                {
                  label: 'LFO 2 Speed',
                  value: 'lfo-2-speed',
                  path: lfo2.osc.node.frequency,
                },
              ]}
            />

            <Chorus chorus={chorus} />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={5}
          >
            <LFO
              label="LFO 2"
              lfo={lfo2}
              params={[
                ...lfoParams,
                {
                  label: 'LFO 1 Depth',
                  value: 'lfo-1-depth',
                  path: lfo1.gain.node.gain,
                },
                {
                  label: 'LFO 1 Speed',
                  value: 'lfo-1-speed',
                  path: lfo1.osc.node.frequency,
                },
              ]}
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
                <Delay delay={delay} />
              </Col>
            </Row>
          </Col>
        </Row>

        <Row type="flex">
          <Col>
            <Keyboard
              octaves={5}
              startingOctave={2}
              onKeypress={[
                value => osc.setFrequency(value),
                () => {
                  volumeEnvelope.triggerADS();
                  filterEnvelope.triggerADS();
                },
                freq => sequencer.triggerAtSelectedStep(() => {
                  osc.setFrequency(freq);
                  volumeEnvelope.trigger();
                  filterEnvelope.trigger();
                }),
              ]}
              onKeyRelease={[
                () => volumeEnvelope.triggerRelease(),
                () => filterEnvelope.triggerRelease(),
              ]}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
