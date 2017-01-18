import cloudinary from 'cloudinary-core'

const cl = cloudinary.Cloudinary.new()
cl.config('cloud_name', 'dciwwp9y9')

const defaultOptions = { fetch_format: 'auto', dpr: 2 }

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
