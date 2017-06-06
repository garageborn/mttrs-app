import cloudinary from 'cloudinary-core'
import { PixelRatio } from 'react-native'

const maxDpr = 2
const cl = cloudinary.Cloudinary.new()
cl.config('cloud_name', 'dciwwp9y9')

const defaultOptions = {
  fetch_format: 'auto',
  dpr: Math.min(PixelRatio.get(), maxDpr),
  secure: true
}

export function id (id, options = {}) {
  return cl.url(id, Object.assign({}, defaultOptions, options))
}

export function url (url, options = {}) {
  return cl.url(absolutize(url), Object.assign({}, defaultOptions, options))
}

function absolutize (url) {
  if (url.match(/^https?:\//)) return url
  return `http://${url}`
};
