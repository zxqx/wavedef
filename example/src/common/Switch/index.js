import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Form, Switch as AntSwitch } from 'antd';
import classnames from 'classnames';
import './Switch.css';

export default class Switch extends Component {
  static propTypes = {
    label: PropTypes.string,
    defaultValue: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    label: null,
    defaultValue: true,
  }

  componentDidMount() {
    const { defaultValue, onChange } = this.props;

    onChange(defaultValue);
  }

  render() {
    const {
      label,
      defaultValue,
      onChange,
    } = this.props;

    return (
      <Fragment>
        {label &&
          <Form.Item
            className="switch-label"
            colon={false}
            label={label}
          />
        }

        <AntSwitch
          defaultChecked={defaultValue}
          className={classnames({
            'switch-floating': !label,
          })}
          checkedChildren="On"
          unCheckedChildren="Off"
          onChange={onChange}
        />
      </Fragment>
    );
  }
}
