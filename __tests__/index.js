'use strict'

const invert = require('../index')

describe('invert', function() {
  describe('when not active', function() {
    it('confirms true to be truthy', function() {
      expect(true).toBeTruthy()
    })

    it('adds 2 + 2', function() {
      expect(2 + 2).toEqual(4)
    })

    it('finds "foo" in "foobar"', function() {
      expect('foobar').toMatch(/foo/)
    })

    it('can confirm when two arrays are equal', function() {
      expect([1, 2, 3]).toEqual([1, 2, 3])
    })
  })

  describe('when active', function() {
    beforeEach(() => {
      global.expect = invert()
    })

    it('confirms true as falsy', function() {
      expect(true).not.toBeTruthy()
      expect(true).toBeFalsy()
    })

    it('fails to add 2 + 2', function() {
      expect(2 + 2).not.toEqual(4)
      expect(2 + 2).toEqual(-4)
    })

    it('finds "boo" in "foobar"', function() {
      expect('foobar').not.toMatch(/foo/)
      expect('foobar').toMatch(/boo/)
    })

    it('fails on two arrays being equal', function() {
      expect([1, 2, 3]).not.toEqual([1, 2, 3])
      expect([1, 2, 3]).toEqual([3, 2, 1])
    })
  })
})
