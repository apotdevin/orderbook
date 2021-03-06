module.exports = {
  poweredByHeader: false,
  basePath: process.env.BASE_PATH || '',
  serverRuntimeConfig: {
    externalUrl:
      process.env.EXTERNAL_URL || 'wss://www.cryptofacilities.com/ws/v1',
  },
  publicRuntimeConfig: {
    wsUrl: process.env.WEBSOCKET_URL || 'ws://localhost:3000/api/ws',
  },
};
