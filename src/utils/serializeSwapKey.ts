const serializeSwapKey = (value: unknown): string => {
  if (typeof value === 'symbol') {
    return value.toString()
  }

  if (typeof value === 'function') {
    return `[Function ${value.name || 'anonymous'}]`
  }

  if (value instanceof Date) {
    return value.toISOString()
  }

  if (value instanceof RegExp) {
    return value.toString()
  }

  const serialized = JSON.stringify(value)

  return serialized ?? String(value)
}

export default serializeSwapKey
