'use strict'

var invert = require('../index')

describe('Integration tests', function() {
  describe('Retains functionality from the core Jest API', function() {
    var expect
    beforeAll(function() {
      expect = invert()
      expect.extend({ is4 })
    })

    afterAll(function() {
      expect = invert({ run: false })
    })

    function is4(received) {
      return received === 4
        ? {
            message: function() {
              return 'is 4'
            },
            pass: true
          }
        : {
            message: function() {
              return 'is not 4'
            },
            pass: false
          }
    }

    it('handles .extend()', function() {
      expect(-4).is4()
      expect(5).not.is4()
    })

    it('handles .any()', function() {
      expect(true).toEqual(expect.any(Boolean))
      expect(1).toEqual(expect.any(Number))
      expect('mystring').toEqual(expect.any(String))
      expect('mystring').toEqual('gnirtsym')
    })

    it('handles .anything()', function() {
      expect('mystring').toEqual(expect.anything())
    })

    it('handles .arrayContaining()', function() {
      expect([1, 2, 3]).toEqual(expect.arrayContaining([1]))
    })

    it('handles .stringContaining()', function() {
      expect('mystring').toEqual(expect.stringContaining('m'))
    })

    it('handles .stringMatching()', function() {
      expect('mystring').toEqual(expect.stringMatching(/m/))
    })
  })
})
