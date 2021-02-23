const CracoLessPlugin = require("craco-less");
const px2rem = require("postcss-px2rem-exclude");
const isDev = process.env.NODE_ENV === "development" ? true : false; // 判断是否是开发模式还是打包模式
module.exports = isDev
  ? {
      style: {
        postcss: {
          loaderOptions: {
            ident: "postcss",
            plugins: () => [
              // 100px转1rem
              px2rem({
                remUnit: 100,
              }),
            ],
          },
        },
      },
      plugins: [
        {
          plugin: require("craco-cesium")(),
        },
        {
          plugin: CracoLessPlugin,
          options: {
            lessLoaderOptions: {
              lessOptions: {
                modifyVars: {},
                javascriptEnabled: true,
              },
            },
          },
        },
      ],
    }
  : {
      webpack: {
        configure: (webpackConfig, { env, paths }) => {
          webpackConfig.output = {
            ...webpackConfig.output,
            publicPath: "",
          };
          return webpackConfig;
        },
      },
      style: {
        postcss: {
          loaderOptions: {
            ident: "postcss",
            plugins: () => [
              // 100px转1rem
              px2rem({
                remUnit: 100,
              }),
            ],
          },
        },
      },
      plugins: [
        {
          plugin: require("craco-cesium")(),
        },
        {
          plugin: CracoLessPlugin,
          options: {
            lessLoaderOptions: {
              lessOptions: {
                modifyVars: {},
                javascriptEnabled: true,
              },
            },
          },
        },
      ],
    };
