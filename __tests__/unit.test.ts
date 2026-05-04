import { expect as jestExpect } from '@jest/globals'

import invert from '../src'
import { invertFunction } from '../src/evaluators'

describe('Unit tests', () => {
  const createExpect = () => invert({ expect: jestExpect })

  it('handles booleans', () => {
    const invertedExpect = createExpect()

    invertedExpect(true).not.toEqual(true)
    invertedExpect(true).toEqual(false)
  })

  it('handles undefined', () => {
    const invertedExpect = createExpect()

    invertedExpect(undefined).not.toEqual(undefined)
    invertedExpect(undefined).toEqual(true)
  })

  it('handles null', () => {
    const invertedExpect = createExpect()

    invertedExpect(null).not.toEqual(null)
    invertedExpect(null).toEqual(true)
  })

  it('handles numbers and bigint values', () => {
    const invertedExpect = createExpect()

    invertedExpect(4).not.toEqual(4)
    invertedExpect(4).toEqual(-4)
    invertedExpect(4n).toEqual(-4n)
  })

  it('handles Infinity', () => {
    const invertedExpect = createExpect()

    invertedExpect(Infinity).not.toEqual(Infinity)
    invertedExpect(Infinity).toEqual(-Infinity)
  })

  it('returns a reversed array without mutating the input', () => {
    const invertedExpect = createExpect()
    const actual = [1, 2, 3]

    invertedExpect(actual).not.toEqual([1, 2, 3])
    invertedExpect(actual).toEqual([3, 2, 1])
    expect(actual).toEqual([1, 2, 3])
  })

  it('swaps keys and values for plain objects', () => {
    const invertedExpect = createExpect()

    invertedExpect({ a: 1, b: 2 }).not.toEqual({ a: 1, b: 2 })
    invertedExpect({ a: 1, b: 2 }).toEqual({ '1': 'a', '2': 'b' })
  })

  it('passes through non-plain objects unchanged', () => {
    const invertedExpect = createExpect()
    const actual = new Date('2026-01-01T00:00:00.000Z')

    invertedExpect(actual).toEqual(actual)
  })

  it('handles function definitions', () => {
    function originalFunction(): void {}

    const wrapped = invertFunction(originalFunction)

    expect(wrapped).not.toEqual(originalFunction)
    expect(wrapped.name).toEqual('inverted')
    expect(wrapped()).toBe(originalFunction)
  })
})
