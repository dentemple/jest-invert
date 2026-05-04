import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'

const require = createRequire(import.meta.url)
const rootDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDirectory = resolve(rootDirectory, 'dist')
const esmEntry = resolve(distDirectory, 'index.js')
const cjsEntry = resolve(distDirectory, 'index.cjs')
const declarationEntry = resolve(distDirectory, 'index.d.ts')

for (const file of [esmEntry, cjsEntry, declarationEntry]) {
  assert.ok(existsSync(file), `Expected build output to include ${file}`)
}

const esmModule = await import(pathToFileURL(esmEntry).href)
const cjsModule = require(cjsEntry)

const createExpect = () =>
  Object.assign(
    (received) => ({
      toEqual(expected) {
        assert.deepStrictEqual(received, expected)
      },
    }),
    {
      any(constructor) {
        return constructor
      },
      anything() {
        return Symbol('anything')
      },
      arrayContaining(values) {
        return values
      },
      extend() {},
      stringContaining(value) {
        return value
      },
      stringMatching(value) {
        return value
      },
    },
  )

for (const moduleFactory of [
  esmModule.default,
  cjsModule.default ?? cjsModule,
]) {
  assert.equal(typeof moduleFactory, 'function')

  const localExpect = createExpect()
  const invertedExpect = moduleFactory({ expect: localExpect })
  const date = new Date('2026-01-01T00:00:00.000Z')

  invertedExpect([1, 2, 3]).toEqual([3, 2, 1])
  invertedExpect({ a: 1, b: 2 }).toEqual({ 1: 'a', 2: 'b' })
  invertedExpect(date).toEqual(date)
  assert.equal(typeof invertedExpect.extend, 'function')
  assert.equal(typeof invertedExpect.any, 'function')
}
