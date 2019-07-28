import invert from '../src'

describe('Unit tests', function() {
  var expect: any
  beforeAll(() => {
    expect = invert({})
  })

  afterAll(() => {
    expect = invert({ run: false })
  })

  it('handles booleans', () => {
    expect(true).not.toEqual(true)
    expect(true).toEqual(false)
  })

  it('handles undefined', () => {
    expect(undefined).not.toEqual(undefined)
    expect(undefined).toEqual(true)
  })

  it('handles null', () => {
    expect(null).not.toEqual(null)
    expect(null).toEqual(true)
  })

  it('handles numbers', () => {
    expect(4).not.toEqual(4)
    expect(4).toEqual(-4)
  })

  it('handles Infinity', () => {
    expect(Infinity).not.toEqual(Infinity)
    expect(Infinity).toEqual(-Infinity)
  })

  it('handles arrays', () => {
    expect([1, 2, 3]).not.toEqual([1, 2, 3])
    expect([1, 2, 3]).toEqual([3, 2, 1])
  })

  it('handles objects', () => {
    expect({ a: 1, b: 2 }).not.toEqual({ a: 1, b: 2 })
    expect({ a: 1, b: 2 }).toEqual({ '1': 'a', '2': 'b' })
  })
})
