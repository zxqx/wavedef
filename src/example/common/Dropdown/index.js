import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'antd';
import './Dropdown.css';

export default class Dropdown extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.number.isRequired,
    options: PropTypes.array.isRequired, // eslint-disable-line
    onChange: PropTypes.func.isRequired,
    renderOption: PropTypes.func,
  }

  static defaultProps = {
    renderOption: null,
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
      renderOption,
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
            {options.map((option, index) => (
              <Select.Option
                key={option.path}
                value={index}
              >
                {renderOption ? renderOption(option) : option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    );
  }
}
