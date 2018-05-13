import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Slider as AntSlider } from 'antd';
import './Slider.css';

export default class Slider extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired,
    vertical: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    vertical: false,
  }

  componentDidMount() {
    const { defaultValue, onChange } = this.props;

    onChange(defaultValue);
  }

  render() {
    const {
      label,
      defaultValue,
      min,
      max,
      step,
      vertical,
      onChange,
    } = this.props;

    return (
      <div className="slider">
        <Form.Item
          label={label}
          colon={false}
        >
          <AntSlider
            defaultValue={defaultValue}
            min={min}
            max={max}
            step={step}
            vertical={vertical}
            onChange={onChange}
          />
        </Form.Item>
      </div>
    );
  }
}
