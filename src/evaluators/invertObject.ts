import { invertArray } from './invertArray'
import { invertEmpty } from './invertEmpty'

import { SwapObject } from '../utils'

import type {
  InvertedObject,
  PossibleJavascriptObject,
  SwappedObject,
} from '../@types'

// Function signatures (overloaded)
export function invertObject(actual: null): boolean
export function invertObject(actual: Array<any>): Array<any>
export function invertObject(actual: Object[]): SwappedObject

// Function implementation
export function invertObject(actual: PossibleJavascriptObject): InvertedObject {
  if (null === actual) return invertEmpty(actual)
  if (Array.isArray(actual)) return invertArray(actual)

  return SwapObject(actual)
}

export default invertObject
