import invertBoolean from './invertBoolean'
import invertEmpty from './invertEmpty'
import invertFunction from './invertFunction'
import invertNumber from './invertNumber'
import invertObject from './invertObject'
import invertString from './invertString'
import doNothing from './doNothing'

import type { InvertedValue } from '../types'

export {
  doNothing,
  invertBoolean,
  invertEmpty,
  invertFunction,
  invertNumber,
  invertObject,
  invertString,
}

export const invertValue = <T>(actual: T): InvertedValue<T> => {
  if (actual === null || actual === undefined) {
    return invertEmpty() as InvertedValue<T>
  }

  switch (typeof actual) {
    case 'bigint':
    case 'number':
      return invertNumber(actual) as InvertedValue<T>
    case 'boolean':
      return invertBoolean(actual) as InvertedValue<T>
    case 'function':
      return invertFunction(
        actual as (...args: unknown[]) => unknown,
      ) as InvertedValue<T>
    case 'object':
      return invertObject(actual) as InvertedValue<T>
    case 'string':
      return invertString(actual) as InvertedValue<T>
    case 'symbol':
    default:
      return doNothing(actual) as InvertedValue<T>
  }
}

export default invertValue
