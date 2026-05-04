import invert from '../src'

describe('Regression tests', () => {
  describe('Causes no side-effects when in scope but not invoked', () => {
    it('leaves the global Jest expect untouched', () => {
      expect(typeof invert).toEqual('function')
      expect(true).toEqual(true)
    })

    it('preserves regular Jest behavior for arrays and functions', () => {
      const values = [1, 2, 3]
      const identity = () => true

      expect(values).toEqual([1, 2, 3])
      expect(identity).toEqual(identity)
    })
  })
})
