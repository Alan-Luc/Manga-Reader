const { creatyProxyMiddlware } = require("http-proxy-middleware")

module.exports = (app) => {
    app.use(
        createProxyMiddleware("/manga", {
            target: "https://api.mangadex.org",
            changeOrigin: true
        })
    );

    app.use(
        createProxyMiddleware("/chapter", {
            target: "https://api.mangadex.org",
            changeOrigin: true
        })
    );
};