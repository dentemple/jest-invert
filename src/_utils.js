module.exports = {
  handleObj,
  doNothing: val => val,
  invertBool: val => !val,
  invertNum: val => -val,
  invertStr: val =>
    val
      .split('')
      .reverse()
      .join('')
}

function handleObj(obj) {
  if (!obj) {
    return true
  }

  if (Array.isArray(obj)) {
    return obj.reverse()
  }

  let swapped = {}
  Object.keys(obj).forEach(key => {
    swapped[JSON.stringify(obj[key])] = key
  })
  return swapped
}
