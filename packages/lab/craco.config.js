const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@midasit-dev/moaui-lab': path.resolve(__dirname, 'src/lib'),
    },
  },
};