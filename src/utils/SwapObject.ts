import type { SwappedObject } from '../@types'

export const SwapObject = (actual: Object[]): SwappedObject => {
  let swapped: SwappedObject = {}

  Object.keys(actual).forEach((key: any) => {
    swapped[JSON.stringify(actual[key])] = key
  })
  return swapped
}

export default SwapObject
