import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import './ComputerKeyboardMap.css';

export default class ComputerKeyboardMap extends Component {
  state = {
    visible: !localStorage.getItem('guideShown'),
  }

  componentDidMount() {
    localStorage.setItem('guideShown', true);
  }

  close = () => {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Modal
        className="computer-keyboard-guide"
        visible={this.state.visible}
        onCancel={this.close}
        footer={
          <Button
            onClick={this.close}
            className="close-computer-keyboard-guide-btn"
            size="large"
          >
            OK
          </Button>
        }
      >
        Keyboard map guide
      </Modal>
    );
  }
}
