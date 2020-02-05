import '../src'

describe('Regression tests', function() {
  describe('Causes no side-effects when in scope but not invoked', function() {
    it('handles booleans', function() {
      expect(true).toEqual(true)
    })

    it('handles undefined', function() {
      expect(undefined).toEqual(undefined)
    })

    it('handles null', function() {
      expect(null).toEqual(null)
    })

    it('handles numbers', function() {
      expect(4).toEqual(4)
    })

    it('handles zero', function() {
      expect(0).toEqual(0)
    })

    it('handles Infinity', function() {
      expect(Infinity).toEqual(Infinity)
    })

    it('handles strings', function() {
      expect('mystring').toEqual('mystring')
    })

    it('handles arrays', function() {
      expect([1, 2, 3]).toEqual([1, 2, 3])
    })

    it('handles objects', function() {
      expect({ a: 1, b: 2, c: 3 }).toEqual({ a: 1, b: 2, c: 3 })
    })

    it('handles function definitions', function() {
      var a: Function
      var b: Function

      // Set both variables equal to the same function definition
      a = b = () => {}

      expect(a).toEqual(b)
    })
  })
})
