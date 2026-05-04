import serializeSwapKey from './serializeSwapKey'

import type { SwappedObject } from '../types'

const swapObject = (actual: Record<string, unknown>): SwappedObject => {
  const swapped: SwappedObject = {}

  for (const [key, value] of Object.entries(actual)) {
    swapped[serializeSwapKey(value)] = key
  }

  return swapped
}

export default swapObject
