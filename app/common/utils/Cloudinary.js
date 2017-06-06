import cloudinary from 'cloudinary-core'
import { PixelRatio } from 'react-native'

const cl = cloudinary.Cloudinary.new()
cl.config('cloud_name', 'dciwwp9y9')

const defaultOptions = {
  dpr: PixelRatio.get(),
  fetch_format: 'auto',
  format: 'jpg',
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
