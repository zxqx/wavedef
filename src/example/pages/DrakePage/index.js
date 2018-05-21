import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './DrakePage.css';

export default class DrakePage extends Component {
  render() {
    return (
      <div className="drake">
        <Row>
          <Col>
            <h1>Drake Synth</h1>
          </Col>
        </Row>
      </div>
    );
  }
}
