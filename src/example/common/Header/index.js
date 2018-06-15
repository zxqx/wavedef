import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Menu, Button } from 'antd';
import { Icon } from 'react-fa';
import ComputerKeyboardMap from '../../ComputerKeyboardMap';
import logo from '../../assets/wavedef-logo.png';
import computerKeyboardIcon from '../../assets/icons/computer-keyboard-icon.png';
import './Header.css';

const { Header: AntHeader } = Layout;

export default class Header extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
  }

  state = {
    keyboardMapIsVisible: !localStorage.getItem('keyboardMapShown'),
  }

  componentDidMount() {
    localStorage.setItem('keyboardMapShown', true);
  }

  render() {
    const { keyboardMapIsVisible } = this.state;
    const { pageId } = this.props;

    return (
      <div className="header">
        <AntHeader>
          <Row>
            <Col span={4}>
              <div className="logo">
                <img src={logo} alt="wavedef" />
              </div>
            </Col>

            <Col span={18}>
              <Menu
                theme="dark"
                mode="horizontal"
                className="menu"
                selectedKeys={[pageId || 'playground']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="playground">
                  <Link to="/">
                    playground
                  </Link>
                </Menu.Item>

                <Menu.Item key="docs">
                  <Link to="/docs">
                    docs
                  </Link>
                </Menu.Item>

                <Menu.Item key="github">
                  <a
                    href="http://github.com/zakangelle/wavedef"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    github

                    <Icon
                      name="external-link"
                      className="external-link-icon"
                    />
                  </a>
                </Menu.Item>
              </Menu>
            </Col>

            <Col span={2}>
              <Button
                className="computer-keyboard-btn"
                onClick={() => this.setState({ keyboardMapIsVisible: true })}
              >
                <img src={computerKeyboardIcon} alt="Computer Keyboard" />
              </Button>
            </Col>
          </Row>

          <ComputerKeyboardMap
            visible={keyboardMapIsVisible}
            close={() => this.setState({ keyboardMapIsVisible: false })}
          />
        </AntHeader>
      </div>
    );
  }
}
