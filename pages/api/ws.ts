import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createProxyMiddleware({
  target: 'wss://www.cryptofacilities.com/ws/v1',
  changeOrigin: true,
  ws: true,
  logLevel: 'debug',
  pathRewrite: { '^/api/ws': '' },
});
