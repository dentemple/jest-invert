import { invertValue } from './evaluators'
import { errorMissingExpect } from './utils'

import type { ConfigureInvertProps, JestGlobalExpect } from './types'

type GlobalWithExpect = typeof globalThis & {
  expect?: JestGlobalExpect
}

const globalWithExpect = globalThis as GlobalWithExpect

const getGlobalExpect = (): JestGlobalExpect | undefined =>
  globalWithExpect.expect

const setGlobalExpect = (value: JestGlobalExpect): void => {
  globalWithExpect.expect = value
}

const bindCallableProperty = <T>(value: T, target: JestGlobalExpect): T => {
  if (typeof value !== 'function') {
    return value
  }

  return value.bind(target) as T
}

const createInvertedExpect = (baseExpect: JestGlobalExpect): JestGlobalExpect =>
  new Proxy(baseExpect, {
    apply(target, thisArg, argumentList) {
      const [actual, ...rest] = argumentList

      return Reflect.apply(target, thisArg, [invertValue(actual), ...rest])
    },
    get(target, property, receiver) {
      return bindCallableProperty(
        Reflect.get(target, property, receiver),
        target,
      )
    },
    set(target, property, value, receiver) {
      return Reflect.set(target, property, value, receiver)
    },
  }) as JestGlobalExpect

function configureInvert(props: ConfigureInvertProps = {}): JestGlobalExpect {
  const { expect: providedExpect, patchGlobal = false, run = true } = props
  const jestExpect = providedExpect ?? getGlobalExpect()

  if (!jestExpect) {
    throw new Error(errorMissingExpect)
  }

  const configuredExpect = run ? createInvertedExpect(jestExpect) : jestExpect

  if (patchGlobal) {
    setGlobalExpect(configuredExpect)
  }

  return configuredExpect
}

export default configureInvert
export type {
  ConfigureInvertProps,
  InvertedValue,
  JestGlobalExpect,
  SwappedObject,
} from './types'
