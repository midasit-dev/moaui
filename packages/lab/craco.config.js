const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@lab': path.resolve(__dirname, 'src/lib'),
    },
  },
};