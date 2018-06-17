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
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    vertical: false,
    className: '',
  }

  componentDidMount() {
    const { defaultValue, onChange } = this.props;

    onChange(defaultValue);
  }

  render() {
    const {
      label,
      defaultValue,
      className,
      min,
      max,
      step,
      vertical,
      onChange,
    } = this.props;

    return (
      <div className={`slider ${vertical ? 'vertical-slider' : ''} ${className}`}>
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
