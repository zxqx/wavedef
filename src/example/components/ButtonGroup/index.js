import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'antd';
import './ButtonGroup.css';

export default class ButtonGroup extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired, // eslint-disable-line
    onChange: PropTypes.func.isRequired,
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
      onChange,
    } = this.props;

    return (
      <div className="button-group">
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
