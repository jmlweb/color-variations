module.exports = {
  type: 'web-module',
  npm: {
    esModules: true,
    umd: {
      global: 'colorVariations',
      externals: {},
    },
  },
  polyfill: false,
  // babel: {
  //   cherryPick: ['ramda', 'polished'],
  // },
};
