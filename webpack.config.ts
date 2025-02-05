import HtmlWebpackPlugin from 'html-webpack-plugin';
import type webpack from 'webpack';

const config: webpack.Configuration = {
  entry: ['./src/index.tsx'],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
};

export default config;
