import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <Row
        type="flex"
        justify="center"
        className="header"
      >
        <Col span={24}>
          <h1>wavedef</h1>
        </Col>
      </Row>
    );
  }
}
