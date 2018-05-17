import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
import './Dropdown.css';

export default class Dropdown extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
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
          <Select
            defaultValue={defaultValue}
            onChange={onChange}
          >
            {options.map(option => (
              <Select.Option
                key={option}
                value={option.value}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    );
  }
}
