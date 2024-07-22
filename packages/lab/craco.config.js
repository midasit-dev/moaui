const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@lablib': path.resolve(__dirname, 'src/lib'),
    },
  },
};