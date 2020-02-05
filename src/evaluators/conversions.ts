import { AnyJavascriptObject, InvertedObject, SwappedObject } from '../types'
import { handleObject, isArray, isNull } from './utilities'

export const doNothing = (actual: any): any => actual

export const invertArray = (actual: Array<any>): Array<any> => actual.reverse()

export const invertBoolean = (actual: boolean): boolean => !actual

export const invertEmpty = (actual: undefined | null): true => !actual

export const invertFunction = (actual: Function): Function =>
  // Note: The function name is important here; it'll show up in the end user's test results
  function inverted(): Function {
    return actual
  }

export const invertNumber = (actual: number): number => -actual

export const invertString = (actual: string): string =>
  actual
    .split('')
    .reverse()
    .join('')

export function invertObject(actual: null): boolean
export function invertObject(actual: Array<any>): Array<any>
export function invertObject(actual: Object[]): SwappedObject
export function invertObject(actual: AnyJavascriptObject): InvertedObject {
  if (isNull(actual)) {
    return invertEmpty(actual)
  }

  if (isArray(actual)) {
    return invertArray(actual)
  }

  return handleObject(actual)
}
