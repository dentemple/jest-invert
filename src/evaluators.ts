import { AnyJavascriptObject, InvertedObject, SwappedObject } from './types'

export const doNothing = (actual: any): any => actual

export const invertArray = (actual: Array<any>): Array<any> => actual.reverse()

export const invertBoolean = (actual: boolean): boolean => !actual

export const invertEmpty = (actual: undefined | null): true => !actual

export const invertNumber = (actual: number): number => -actual

export const invertObject = (actual: Object[]): SwappedObject => {
  let swapped: SwappedObject = {}
  Object.keys(actual).forEach((key: any) => {
    swapped[JSON.stringify(actual[key])] = key
  })
  return swapped
}

export const invertString = (actual: string): string =>
  actual
    .split('')
    .reverse()
    .join('')

export const isArray = (actual: any): actual is Array<any> =>
  Array.isArray(actual)

export const isNull = (actual: any): actual is null => actual === null

export function handleObject(actual: null): boolean
export function handleObject(actual: Array<any>): Array<any>
export function handleObject(actual: Object[]): SwappedObject
export function handleObject(actual: AnyJavascriptObject): InvertedObject {
  if (isNull(actual)) {
    return invertEmpty(actual)
  }

  if (isArray(actual)) {
    return invertArray(actual)
  }

  return invertObject(actual)
}

const evaluators = {
  bigint: invertNumber,
  boolean: invertBoolean,
  function: doNothing,
  number: invertNumber,
  object: handleObject,
  string: invertString,
  symbol: doNothing,
  undefined: invertEmpty
}

export default evaluators
