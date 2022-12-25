import evaluators from './evaluators'
import { errorMissingExpect } from './utils'

import type {
  ConfigureInvertProps,
  JestInvert,
  JestGlobalExpect,
} from './@types'

declare global {
  namespace NodeJS {
    interface Global {
      expect: JestGlobalExpect
    }
  }
}

// Function signatures
function configureInvert(
  props?: ConfigureInvertProps
): JestInvert | JestGlobalExpect | undefined

// Function implementation
function configureInvert(props?: ConfigureInvertProps) {
  const {
    run = true,
    // @ts-ignore
    expect: jestExpect = global.expect,
  } = props || ({} as ConfigureInvertProps)

  if (!run) return jestExpect
  if (!jestExpect) throw new Error(errorMissingExpect)

  // Jest's original expect function has additional method calls attached to it;
  //    therefore, we must retain references to them on the new function
  Object.setPrototypeOf(invert, expect)

  return invert

  // -------------------------------------------------------------------------------
  // Placed as a nested function here to utilize jestExpect via closure
  function invert(actual: any): JestInvert {
    // A map is used here instead of if statements so as to reduce
    //    the number of unnecessary code paths being checked.
    const evaluate: Function = evaluators[typeof actual]
    const result = evaluate(actual)

    return jestExpect ? jestExpect(result) : result
  }
}

export default configureInvert
