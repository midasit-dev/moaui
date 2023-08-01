const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@moaui': path.resolve(__dirname, 'src'),
    },
  },
};