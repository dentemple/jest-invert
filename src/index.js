'use strict'

var original = global.expect

function configureInvert(config) {
  if (config && !config.invert) return original

  return function invertExpect(actual, ...rest) {
    // Flip True/False if boolean
    if (typeof actual === 'boolean') return original(!actual, ...rest)

    // Multiply by -1 if number
    if (typeof actual === 'number') return original(actual * -1, ...rest)

    // Reverse if string
    if (typeof actual === 'string')
      return original(
        actual
          .split('')
          .reverse()
          .join(''),
        ...rest
      )

    // Reverse if array
    if (Array.isArray(actual)) return original(actual.reverse(), ...rest)

    return original(actual, ...rest)
  }
}

module.exports = configureInvert
