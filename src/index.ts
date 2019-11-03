import {
  doNothing,
  invertBoolean,
  invertEmpty,
  invertNumber,
  invertString,
  handleObject
} from './_utils'

export default function configureInvert({
  expect,
  run = true
}: Config = {}): any {
  if (run == false) {
    return global.expect
  }

  const jestExpect: any = expect || global.expect

  const possibleEvaluators = {
    bigint: invertNumber,
    boolean: invertBoolean,
    function: doNothing,
    number: invertNumber,
    object: handleObject,
    string: invertString,
    symbol: doNothing,
    undefined: invertEmpty
  }

  function invert(actual: any, ...rest: Array<any>): any {
    const evaluate: Function = possibleEvaluators[typeof actual]
    const result = evaluate(actual)

    return jestExpect(result, ...rest)
  }

  // Jest's original expect function has additional method calls attached to it;
  //    therefore, we must retain references to them on the new function
  Object.setPrototypeOf(invert, jestExpect)

  return invert
}

// --------------------
// types
// --------------------

type Config = {
  run?: boolean | null
  expect?: any
}

declare global {
  namespace NodeJS {
    interface Global {
      expect: any
    }
  }
}
