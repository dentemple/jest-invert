import analyze from 'rollup-plugin-analyzer'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

const name = 'jest-invert'
const tsSettings = {
  cacheRoot: './.cache',
  rollupCommonJSResolveHack: true,
  typescript: require('typescript')
}

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    external: ['jest'],
    plugins: [analyze(), resolve(), typescript(tsSettings)]
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.browser,
      format: 'umd',
      name
    },
    external: ['jest'],
    plugins: [analyze(), resolve(), typescript(tsSettings)]
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.unpkg,
      format: 'umd',
      name
    },
    external: ['jest'],
    plugins: [analyze(), resolve(), typescript(tsSettings), terser()]
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'es',
      name
    },
    external: ['jest'],
    plugins: [analyze(), resolve(), typescript(tsSettings)]
  }
]
