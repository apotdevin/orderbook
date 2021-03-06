import { createProxyMiddleware } from 'http-proxy-middleware';
import getConfig from 'next/config';

const { serverRuntimeConfig = {} } = getConfig() || {};
const { externalUrl } = serverRuntimeConfig;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createProxyMiddleware({
  target: externalUrl,
  changeOrigin: true,
  ws: true,
  logLevel: 'debug',
  pathRewrite: { '^/api/ws': '' },
});
