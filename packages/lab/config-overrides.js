const { override } = require('customize-cra');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = override((config) => {
  // Add alias for paths specified in tsconfig.json
  config.resolve.plugins = [
    ...(config.resolve.plugins || []),
    new TsconfigPathsPlugin({
      configFile: path.resolve(__dirname, 'tsconfig.json'),
    }),
  ];

  return config;
});
