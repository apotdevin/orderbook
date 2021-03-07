module.exports = {
  poweredByHeader: false,
  basePath: process.env.BASE_PATH || '',
  serverRuntimeConfig: {
    isProduction: process.env.NODE_ENV === 'production',
  },
  publicRuntimeConfig: {
    wsUrl: process.env.WEBSOCKET_URL || 'wss://www.cryptofacilities.com/ws/v1',
  },
};
