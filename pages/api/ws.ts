import { createProxyMiddleware } from 'http-proxy-middleware';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig() || {};
const { externalUrl, isProduction } = serverRuntimeConfig || {};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createProxyMiddleware({
  changeOrigin: true,
  target: externalUrl,
  ws: true,
  secure: isProduction,
  logLevel: 'debug',
});
