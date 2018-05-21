import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Menu } from 'antd';
import logo from '../../assets/wavedef-logo.png';
import './Header.css';

const { Header: AntHeader } = Layout;

export default class Header extends Component {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
  }

  render() {
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

            <Col span={20}>
              <Menu
                theme="dark"
                mode="horizontal"
                className="menu"
                selectedKeys={[pageId || 'cyanide']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="cyanide">
                  <Link to="/">
                    cyanide
                  </Link>
                </Menu.Item>

                <Menu.Item key="drake">
                  <Link to="/drake">
                    drake
                  </Link>
                </Menu.Item>
              </Menu>
            </Col>
          </Row>
        </AntHeader>
      </div>
    );
  }
}
