/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const webpack = require('webpack');

const WebpackDevServer = require('webpack-dev-server');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

const app = express();
const port = process.env.PORT || 3000;

var config = process.env.NODE_ENV === 'production'
  ? config = require('../webpack.config.production')
  : require('../webpack.config');

const compiler = webpack(config);
const dashboard = new Dashboard();

compiler.apply(new DashboardPlugin(dashboard.setData));

var bundler = new WebpackDevServer(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
  quiet: true,
  historyApiFallback: true
});

app.use(require('webpack-hot-middleware')(compiler, {
  log: () => {}
}));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: process.env.PWD + '/dist' });
});

app.listen(8080);
bundler.listen(port);
