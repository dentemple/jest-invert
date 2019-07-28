export const doNothing = (actual: any): any => actual

export const invertArray = (actual: Array<any>): Array<any> => actual.reverse()

export const invertBoolean = (actual: boolean): boolean => !actual

export const invertEmpty = (actual: undefined | null): boolean => !actual

export const invertNumber = (actual: number | BigInt): number | BigInt =>
  -actual

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

export const handleObject = (actual: AnyJavascriptObject): InvertedObject => {
  if (isNull(actual)) {
    return invertEmpty(actual)
  }

  if (isArray(actual)) {
    return invertArray(actual)
  }

  return invertObject(actual)
}

// --------------------
// types
// --------------------

type InvertedObject = SwappedObject | Array<any> | boolean
type AnyJavascriptObject = Object[] | Array<any> | null

interface SwappedObject {
  [key: string]: string
}
