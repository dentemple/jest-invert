import { SwappedObject } from '../types'

export const handleObject = (actual: Object[]): SwappedObject => {
  let swapped: SwappedObject = {}
  Object.keys(actual).forEach((key: any) => {
    swapped[JSON.stringify(actual[key])] = key
  })
  return swapped
}

export const isArray = (actual: any): actual is Array<any> =>
  Array.isArray(actual)

export const isNull = (actual: any): actual is null => actual === null
