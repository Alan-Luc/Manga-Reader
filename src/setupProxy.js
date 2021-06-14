const proxy = require("http-proxy-middleware")

module.export = (app) => {
    app.use(
        proxy("/", {
            target: "https://api.mangadex.org",
            changeOrigin: true
        })
    );
};