'use strict'

global.jestExpect = global.expect
var original = global.expect

function configureInvert(config) {
  if (config && config.isActive === false) return original

  var includeAll = config && config.all === true

  return function invertExpect(actual, ...rest) {
    if (actual === null) return original(undefined, ...rest)

    if (actual === undefined) return original(null, ...rest)

    if (typeof actual === 'boolean') return original(!actual, ...rest)

    if (typeof actual === 'number') return original(actual * -1, ...rest)

    if (typeof actual === 'string') {
      var result = original(
        actual
          .split('')
          .reverse()
          .join(''),
        ...rest
      )

      return result
    }

    if (includeAll) {
      if (Array.isArray(actual)) return original(actual.reverse(), ...rest)

      if (typeof actual === 'object') {
        var result = {}
        for (var prop in actual) {
          result[actual[prop]] = prop
        }

        return original(result, ...rest)
      }
    }

    return original(actual, ...rest)
  }
}

module.exports = configureInvert
