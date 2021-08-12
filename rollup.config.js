import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './src/index.ts',
  output: {
    dir: './dist',
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    typescript({ tsconfig: './tsconfig.json', sourceMap: false }),
    commonjs(),
  ],
  external: [
    '@material-ui/core',
    '@material-ui/icons',
    '@material-ui/lab',
    '@material-ui/styles',
    'react',
    'react-dom',
  ],
};
