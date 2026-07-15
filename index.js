const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// The actual Odds88 API URL
const TARGET_URL = 'https://betchief-tradeart-api.trading.io';

app.use('/', createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    ws: true, // allows forwarding WebSockets as well
    logger: console,
    onProxyReq: (proxyReq, req, res) => {
        console.log(`[Proxying] ${req.method} -> ${TARGET_URL}${req.url}`);
    }
}));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Odds88 Proxy server is running on port ${PORT}`);
    console.log(`Forwarding all requests to ${TARGET_URL}`);
});
