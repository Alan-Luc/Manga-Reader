const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/manga",
        createProxyMiddleware({
            target: "https://api.mangadex.org",
            changeOrigin: true,
        })
    );

    app.use(
        "/chapter",
        createProxyMiddleware({
            target: "https://api.mangadex.org",
            changeOrigin: true,
        })
    );
};