import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch as AntSwitch } from 'antd';
import './Switch.css';

export default class Switch extends Component {
  static propTypes = {
    defaultValue: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    defaultValue: true,
  }

  componentDidMount() {
    const { defaultValue, onChange } = this.props;

    onChange(defaultValue);
  }

  render() {
    const {
      defaultValue,
      onChange,
    } = this.props;

    return (
      <AntSwitch
        defaultChecked={defaultValue}
        checkedChildren="On"
        unCheckedChildren="Off"
        onChange={onChange}
      />
    );
  }
}
