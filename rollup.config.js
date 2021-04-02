import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'js/Measure.js',
  output: {
    file: 'Measure.js',
  },
  plugins: [nodeResolve()]
};
