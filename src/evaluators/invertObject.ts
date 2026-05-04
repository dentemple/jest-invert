import { invertArray } from './invertArray'

import { isPlainObject, swapObject } from '../utils'

import type { InvertedValue } from '../types'

export function invertObject<T extends object>(actual: T): InvertedValue<T> {
  if (Array.isArray(actual)) {
    return invertArray(actual) as InvertedValue<T>
  }

  if (isPlainObject(actual)) {
    return swapObject(actual) as InvertedValue<T>
  }

  return actual as InvertedValue<T>
}

export default invertObject
