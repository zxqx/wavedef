import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'antd';
import './ButtonGroup.css';

export default class ButtonGroup extends Component {
  static propTypes = {
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
    ]).isRequired,
    defaultValue: PropTypes.string.isRequired,
    className: PropTypes.string,
    options: PropTypes.array.isRequired, // eslint-disable-line
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
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
      options,
      className,
      onChange,
    } = this.props;

    return (
      <div className={`button-group ${className}`}>
        <Form.Item
          label={label}
          colon={false}
        >
          <Radio.Group
            onChange={e => onChange(e.target.value)}
            defaultValue={defaultValue}
          >
            {options.map(option => (
              <Radio.Button
                key={option.value}
                value={option.value}
              >
                {option.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
      </div>
    );
  }
}
