/**
 * Wepack common config
 */

import {
  cleanClientDirPlugin,
  noEmitOnErrorPlugin,
  extractCSSChunksPlugin,
  htmlPlugin,
  inlineSourcePlugin,
  definePlugin,
  cssoPlugin,
  statsWriterPlugin,
} from './plugins';

import {
  jsRules,
  cssRulesClient,
  imageRules,
  propertiesRules,
  inlineScriptsRules,
} from './rules';

import { alias } from './resolve';

import {
  APP_SRC_ENTRY,
  DIST_CLIENT_DIR,
} from '../environment';

const config = {
  entry: {
    main: [
      '@babel/polyfill',
      APP_SRC_ENTRY,
    ],
  },
  output: {
    path: DIST_CLIENT_DIR,
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/chunks/[name].[chunkhash].js',
    publicPath: '/',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxInitialRequests: 5,
      maxAsyncRequests: 5,
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    },
  },
  module: {
    rules: [
      jsRules(),
      cssRulesClient(),
      imageRules(),
      propertiesRules(),
      inlineScriptsRules(),
    ],
  },
  plugins: [
    cleanClientDirPlugin(),
    noEmitOnErrorPlugin(),
    extractCSSChunksPlugin(),
    htmlPlugin(),
    cssoPlugin(),
    inlineSourcePlugin(),
    definePlugin({
      SSR: JSON.stringify(false),
    }),
    statsWriterPlugin(),
  ],
  resolve: {
    alias: alias(),
  },
  stats: 'verbose',
};

export default config;
