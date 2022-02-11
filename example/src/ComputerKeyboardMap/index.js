import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import computerKeyboardMap from '../assets/tools/computer-keyboard-map.png';
import './ComputerKeyboardMap.css';

export default class ComputerKeyboardMap extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Modal
        className="computer-keyboard-map"
        width={700}
        visible={this.props.visible}
        onCancel={this.props.close}
        footer={null}
      >
        <img
          src={computerKeyboardMap}
          className="computer-keyboard-map-image"
          alt="Computer Keyboard Map"
        />
      </Modal>
    );
  }
}
