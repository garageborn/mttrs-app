import captureError from './captureError'

export const parse = (value) => {
  try {
    return JSON.parse(value)
  } catch (err) {
    captureError(err)
  }
}

export const stringify = (value) => {
  try {
    return JSON.stringify(value)
  } catch (err) {
    captureError(err)
  }
}
