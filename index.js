'use strict'

const utils = require('./src/_utils')

function configureInvert(config = {}) {
  if (config.run == false) {
    return global.expect || config.expect
  }

  const jestExpect = config.expect || global.expect

  if (!jestExpect) {
    const message =
      '"jest-invert" requires Jest to be in scope. ' +
      'This library cannot work if it cannot find the jest.expect method.\n\n' +
      'Please install and configure Jest if you have not already done so. '

    return new Error(message)
  }

  const possibleEvaluators = {
    bigint: utils.invertNum,
    boolean: utils.invertBool,
    function: utils.doNothing,
    number: utils.invertNum,
    object: utils.handleObj,
    string: utils.invertStr,
    symbol: utils.doNothing,
    undefined: utils.invertBool
  }

  function invert(value, ...rest) {
    const evaluate = possibleEvaluators[typeof value]
    const result = evaluate(value)

    return jestExpect(result, ...rest)
  }

  // Jest's original expect function has additional method calls attached to it;
  //    therefore, we must retain references to them on the new function
  Object.setPrototypeOf(invert, jestExpect)

  return invert
}

module.exports = configureInvert
