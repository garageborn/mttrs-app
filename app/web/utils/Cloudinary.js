import React from 'react'
import cloudinary from 'cloudinary-core'

const cl = cloudinary.Cloudinary.new()
cl.config('cloud_name', 'dciwwp9y9')

const defaultOptions = { fetch_format: 'auto', dpr: 2 }//cl.device_pixel_ratio() }

export function url(url, options = {}) {
  return cl.url(url, Object.assign(defaultOptions, options))
}
