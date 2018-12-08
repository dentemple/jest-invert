'use strict'

const invert = require('../index')

describe('primitives', function() {
  describe('not active', function() {
    it('confirms null', function() {
      expect(null).toBeNull()
    })

    it('confirms undefined', function() {
      expect(undefined).toBeUndefined()
    })

    it('confirms true to be truthy', function() {
      expect(true).toBeTruthy()
    })

    it('adds 2 + 2', function() {
      expect(2 + 2).toEqual(4)
    })

    it('finds "foo" in "foobar"', function() {
      expect('foobar').toMatch(/foo/)
    })
  })

  describe('is active', function() {
    beforeEach(() => {
      global.expect = invert({ isActive: true })
    })

    afterEach(() => {
      global.expect = invert({ isActive: false })
    })

    it('switches null and undefined', function() {
      expect(null).not.toBeNull()
      expect(null).toBeUndefined()
      expect(undefined).not.toBeUndefined()
      expect(undefined).toBeNull()
    })

    it('switches true and false', function() {
      expect(true).not.toBeTruthy()
      expect(true).toBeFalsy()
      expect(false).not.toBeFalsy()
      expect(false).toBeTruthy()
    })

    it('multiplies -1 to number values', function() {
      expect(2 + 2).not.toEqual(4)
      expect(2 + 2).toEqual(-4)
      expect(-2 - 2).not.toEqual(-4)
      expect(Infinity).toEqual(-Infinity)
    })

    it('finds "boo" instead of "foo" in "foobar"', function() {
      expect('foobar').not.toMatch(/foo/)
      expect('foobar').toMatch(/boo/)
    })

    it("shouldn't affect arrays", function() {
      expect([1, 2, 3]).toEqual([1, 2, 3])
    })
  })
})

describe('arrays & objects', function() {
  describe('not active', function() {
    it('confirms two equal value arrays to be equal', function() {
      expect([1, 2, 3]).toEqual([1, 2, 3])
    })

    it('confirms two equal value objects to be equal', function() {
      expect({ str: 'hello', val: 42 }).toEqual({ str: 'hello', val: 42 })
    })

    it('identifies a function', function() {
      expect(function() {}).toEqual(expect.any(Function))
      function f() {}
      expect(f).toEqual(f)
    })
  })

  describe('is active', function() {
    beforeEach(() => {
      global.expect = invert({ all: true })
    })

    afterEach(() => {
      global.expect = invert({ isActive: false })
    })

    it('fails to confirm two equal value arrays to be equal', function() {
      expect([1, 2, 3]).not.toEqual([1, 2, 3])
      expect([1, 2, 3]).toEqual([3, 2, 1])
    })

    it('fails to confirm two equal value objects to be equal', function() {
      expect({ str: 'hello', val: 42 }).not.toEqual({ str: 'hello', val: 42 })
      expect({ str: 'hello', val: 42 }).toEqual({ hello: 'str', '42': 'val' })
    })

    it('should do nothing to functions', function() {
      expect(function() {}).toEqual(jestExpect.any(Function))
      function f() {}
      expect(f).toEqual(f)
    })
  })
})
