import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import './AudioControlGroup.css';

export default class AudioControlGroup extends Component {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  }

  static defaultProps = {
    label: '',
  }

  render() {
    const { label, children } = this.props;

    return (
      <Card title={label} bordered={false}>
        {children}
      </Card>
    );
  }
}
