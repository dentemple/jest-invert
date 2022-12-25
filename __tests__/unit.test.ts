import invert from '../src'
import { invertString } from '../src/evaluators'

describe('Unit tests', function () {
  let expect: any
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

  it('handles function definitions', function () {
    var a: Function
    var b: Function

    // Set both variables equal to the same function definition
    function inverted(): void {}
    a = b = inverted

    expect(a).not.toEqual(a)
    expect(a).not.toEqual(b)

    // expect(a).toEqual(inverted) technically should work, but Jest
    //    doesn't like the fact that these functions serialize to the
    //    same string; therefore, we have to be a little roundabout
    //    in our test.
    // Also, by using strings here, we have to undo the library's
    //    string reversal functionality
    expect(invertString('' + a)).toEqual('' + inverted)
  })
})
