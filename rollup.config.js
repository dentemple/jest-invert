import resolve from 'rollup-plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

import pkg from './package.json'

const name = 'jest-invert'

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      name,
      exports: 'auto',
    },
    external: ['jest'],
    plugins: [typescript(), resolve()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.browser,
      format: 'umd',
      name,
    },
    external: ['jest'],
    plugins: [typescript(), resolve()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.unpkg,
      format: 'umd',
      name,
    },
    external: ['jest'],
    plugins: [typescript(), resolve(), terser()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'es',
      name,
    },
    external: ['jest'],
    plugins: [typescript(), resolve()],
  },
]
