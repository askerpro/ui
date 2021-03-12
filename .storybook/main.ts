import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import getCSSModuleLocalIdent from "react-dev-utils/getCSSModuleLocalIdent";
import postcssNormalize from "postcss-normalize";

async function webpackFinal(config: Configuration) {
  config.plugins!.push(
    // Добавляем MiniCssExtractPlugin, чтобы на выходе получить 1 css файл со всеми стилями.
    new MiniCssExtractPlugin({
      filename: "index.css",
      chunkFilename: "[id].css",
    })
  );

  config.resolve!.plugins!.push(
    // Добавляем TsconfigPathsPlugin, чтобы корректно читался файл конфигурации tsconfig
    new TsconfigPathsPlugin({})
  );
  config.module!.rules!.push({
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "@teamsupercell/typings-for-css-modules-loader",
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: false,
          modules: {
            getLocalIdent: getCSSModuleLocalIdent,
          },
        },
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: () => [
            require("postcss-preset-env")({
              autoprefixer: {},
              stage: 3,
            }),
            postcssNormalize(),
          ],
          sourceMap: false,
        },
      },
      {
        loader: require.resolve("resolve-url-loader"),
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
  });

  return config;
}

export default {
  stories: ["../src/**/*.stories.@(tsx|mdx)"],
  webpackFinal,
};
