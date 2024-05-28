// rollup.config.js
import serve from 'rollup-plugin-serve';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

// Define an array of configuration objects
export default [
  {
    input: 'backgroundNodes.js',
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
      resolve(),
      commonjs(),
      serve({
        open: true,
        contentBase: '',
        host: 'localhost',
        port: 5000,
      }),
    ]
  },
  // {
  //   input: 'interactiveNodes.js',
  //   output: {
  //     file: 'bundle_interactive.js',
  //     format: 'iife',
  //     name: 'bundle_interactive',
  //     globals: {
  //       'https://cdn.skypack.dev/zdog': 'Zdog',
  //       'https://cdn.skypack.dev/d3-force-3d': 'd3Force3d',
  //     },
  //   },
  //   plugins: [
  //     resolve(),
  //     commonjs(),
  //   ]
  // }
];
