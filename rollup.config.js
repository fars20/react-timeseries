import jsx from 'rollup-plugin-jsx';
import resolve from 'rollup-plugin-node-resolve';
import autoExternal from 'rollup-plugin-auto-external';
import internal from 'rollup-plugin-internal';
import commonJS from 'rollup-plugin-commonjs'

export default [{
  mode: 'production',
  input: 'lib/index.js',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs'
    },
    {
      file: 'dist/es/index.js',
      format: 'es'
    },
    {
      file: 'dist/umd/index.js',
      name: 'DataAppsRandomTimeseries',
      format: 'umd'
    }
  ],
  plugins: [
    jsx( {factory: 'React.createElement'} ),
    resolve(),
    commonJS({
      include: 'node_modules/**'
    }),
    internal(['react-vis'])
  ],
}];
