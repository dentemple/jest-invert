import { expect as jestExpect } from '@jest/globals'

import invert from '../src'

describe('Integration tests', () => {
  const globalWithExpect = globalThis as typeof globalThis & {
    expect: typeof jestExpect
  }
  const originalGlobalExpect = globalWithExpect.expect

  afterEach(() => {
    globalWithExpect.expect = originalGlobalExpect
  })

  const is4 = (received: unknown) =>
    received === 4
      ? {
          message: () => 'is 4',
          pass: true,
        }
      : {
          message: () => 'is not 4',
          pass: false,
        }

  it('retains functionality from the core Jest API', () => {
    const invertedExpect = invert({ expect: jestExpect })
    invertedExpect.extend({ is4 })
    ;(invertedExpect(-4) as unknown as { is4(): void }).is4()
    ;(invertedExpect(5).not as unknown as { is4(): void }).is4()
    invertedExpect(true).toEqual(invertedExpect.any(Boolean))
    invertedExpect(1).toEqual(invertedExpect.any(Number))
    invertedExpect('mystring').toEqual(invertedExpect.any(String))
    invertedExpect('mystring').toEqual('gnirtsym')
    invertedExpect('mystring').toEqual(invertedExpect.anything())
    invertedExpect([1, 2, 3]).toEqual(invertedExpect.arrayContaining([1]))
    invertedExpect('mystring').toEqual(invertedExpect.stringContaining('m'))
    invertedExpect('mystring').toEqual(invertedExpect.stringMatching(/m/))
  })

  it('can patch the global expect explicitly', () => {
    invert({ expect: jestExpect, patchGlobal: true })

    globalWithExpect.expect(true).toEqual(false)
  })

  it('returns the original expect when disabled', () => {
    const passthroughExpect = invert({ expect: jestExpect, run: false })

    expect(passthroughExpect).toBe(jestExpect)
    passthroughExpect(true).toEqual(true)
  })
})
