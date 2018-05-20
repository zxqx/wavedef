import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Header from '../common/Header';
import './App.css';

const { Content } = Layout;

function getTopLevelPageId() {
  return window.location.pathname.split('/')[1];
}

export default class App extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
  }

  render() {
    const { children } = this.props;

    return (
      <Layout>
        <Header
          pageId={getTopLevelPageId()}
        />

        <Content className="content">
          {children}
        </Content>
      </Layout>
    );
  }
}
