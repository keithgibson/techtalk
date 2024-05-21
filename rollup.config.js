// rollup.config.js
import serve from 'rollup-plugin-serve';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';


export default {
  input: 'nn_2nodes1line.js',
  output: {
    file: 'bundle.js',
    format: 'iife',
    name: 'bundle',
    globals: {
      'https://cdn.skypack.dev/zdog': 'Zdog',
      'https://cdn.skypack.dev/d3-force-3d': 'd3Force3d',

    },
  },
  plugins: [
    resolve(), // tells Rollup how to find modules in node_modules
    commonjs(), // converts CommonJS modules to ES6, so they can be included in a Rollup bundle
    serve({ // add the serve plugin
      open: true, // open the browser
      contentBase: '', // where the files are. In this case, the same directory
      host: 'localhost',
      port: 5000,
    }),
  ]
};
