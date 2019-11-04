import { Config, Expect, Invert } from './types'
import evaluators from './evaluators'

declare global {
  namespace NodeJS {
    interface Global {
      expect: Expect
    }
  }
}

export default function configureInvert({
  expect = global.expect,
  run = true
}: Config = {}): Invert | Expect {
  if (run == false) {
    return expect
  }

  // The specific type mappings here are handled by the overloaded function type, "Invert"
  function invert(actual: any, ...rest: Array<any>): any {
    // A map is used here instead of an if statement so as to reduce
    //    the number of unnecessary code paths being checked.
    const evaluate: Function = evaluators[typeof actual]
    const result = evaluate(actual)

    return expect(result, ...rest)
  }

  // Jest's original expect function has additional method calls attached to it;
  //    therefore, we must retain references to them on the new function
  Object.setPrototypeOf(invert, expect)

  return invert
}
