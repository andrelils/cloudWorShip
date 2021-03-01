const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/wx", {
      target: "http://222.191.22.229:6080",
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        "^/wx": "/wx",
      },
    })
  );

};
