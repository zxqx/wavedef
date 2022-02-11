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
import './CyanidePage.css';

const cyanide = new Cyanide();

const {
  osc1,
  osc2,
  osc3,
  filter,
  lfo1,
  lfo2,
  lfo3,
  lfo4,
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
    label: 'Oscillator 1 Frequency',
    value: 'oscillator-1-frequency',
    path: osc1.node.frequency,
  },
  {
    label: 'Oscillator 2 Frequency',
    value: 'oscillator-2-frequency',
    path: osc2.node.frequency,
  },
  {
    label: 'Oscillator 3 Frequency',
    value: 'oscillator-3-frequency',
    path: osc3.node.frequency,
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
              oscillator={osc1}
              mixerChannel={mixer.channel(1)}
              label="Osc 1"
            />

            <VolumeEnvelope envelope={volumeEnvelope} />
            <FilterEnvelope envelope={filterEnvelope} />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={5}
          >
            <Oscillator
              oscillator={osc2}
              mixerChannel={mixer.channel(2)}
              label="Osc 2"
              isOn={false}
            />

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
                  label: 'LFO 2 Rate',
                  value: 'lfo-2-rate',
                  path: lfo2.osc.node.frequency,
                },
                {
                  label: 'LFO 3 Depth',
                  value: 'lfo-3-depth',
                  path: lfo3.gain.node.gain,
                },
                {
                  label: 'LFO 3 Rate',
                  value: 'lfo-3-rate',
                  path: lfo3.osc.node.frequency,
                },
                {
                  label: 'LFO 4 Depth',
                  value: 'lfo-4-depth',
                  path: lfo4.gain.node.gain,
                },
                {
                  label: 'LFO 4 Rate',
                  value: 'lfo-4-rate',
                  path: lfo4.osc.node.frequency,
                },
              ]}
            />

            <LFO
              label="LFO 3"
              lfo={lfo3}
              params={[
                ...lfoParams,
                {
                  label: 'LFO 1 Depth',
                  value: 'lfo-1-depth',
                  path: lfo1.gain.node.gain,
                },
                {
                  label: 'LFO 1 Rate',
                  value: 'lfo-1-rate',
                  path: lfo1.osc.node.frequency,
                },
                {
                  label: 'LFO 2 Depth',
                  value: 'lfo-2-depth',
                  path: lfo2.gain.node.gain,
                },
                {
                  label: 'LFO 2 Rate',
                  value: 'lfo-2-rate',
                  path: lfo2.osc.node.frequency,
                },
                {
                  label: 'LFO 4 Depth',
                  value: 'lfo-4-depth',
                  path: lfo4.gain.node.gain,
                },
                {
                  label: 'LFO 4 Rate',
                  value: 'lfo-4-rate',
                  path: lfo4.osc.node.frequency,
                },
              ]}
            />
          </Col>

          <Col
            xs={24}
            md={8}
            xl={5}
          >
            <Oscillator
              oscillator={osc3}
              mixerChannel={mixer.channel(3)}
              label="Osc 3"
              isOn={false}
            />

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
                  label: 'LFO 1 Rate',
                  value: 'lfo-1-rate',
                  path: lfo1.osc.node.frequency,
                },
                {
                  label: 'LFO 3 Depth',
                  value: 'lfo-3-depth',
                  path: lfo3.gain.node.gain,
                },
                {
                  label: 'LFO 3 Rate',
                  value: 'lfo-3-rate',
                  path: lfo3.osc.node.frequency,
                },
                {
                  label: 'LFO 4 Depth',
                  value: 'lfo-4-depth',
                  path: lfo4.gain.node.gain,
                },
                {
                  label: 'LFO 4 Rate',
                  value: 'lfo-4-rate',
                  path: lfo4.osc.node.frequency,
                },
              ]}
            />

            <LFO
              label="LFO 4"
              lfo={lfo3}
              params={[
                ...lfoParams,
                {
                  label: 'LFO 1 Depth',
                  value: 'lfo-1-depth',
                  path: lfo1.gain.node.gain,
                },
                {
                  label: 'LFO 1 Rate',
                  value: 'lfo-1-rate',
                  path: lfo1.osc.node.frequency,
                },
                {
                  label: 'LFO 2 Depth',
                  value: 'lfo-2-depth',
                  path: lfo2.gain.node.gain,
                },
                {
                  label: 'LFO 2 Rate',
                  value: 'lfo-2-rate',
                  path: lfo2.osc.node.frequency,
                },
                {
                  label: 'LFO 3 Depth',
                  value: 'lfo-3-depth',
                  path: lfo3.gain.node.gain,
                },
                {
                  label: 'LFO 3 Rate',
                  value: 'lfo-3-rate',
                  path: lfo3.osc.node.frequency,
                },
              ]}
            />
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

                <Ringmod ringmod={ringmod} />
              </Col>

              <Col
                xs={24}
                md={12}
              >
                <Delay delay={delay} />

                <Chorus chorus={chorus} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}
