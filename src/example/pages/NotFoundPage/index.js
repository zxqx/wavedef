import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './NotFoundPage.css';

export default class NotFoundPage extends Component {
  render() {
    return (
      <div className="not-found-page">
        <Row type="flex" justify="center">
          <Col span={24}>
            404 - Not Found
          </Col>
        </Row>
      </div>
    );
  }
}
