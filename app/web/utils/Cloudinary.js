import React from 'react'
import cloudinary from 'cloudinary-core'

const cl = cloudinary.Cloudinary.new()
cl.config('cloud_name', 'dt7iowhph')

const defaultOptions = { fetch_format: 'auto', dpr: cl.device_pixel_ratio() }

export function url(url, options = {}) {
  return cl.url(url, Object.assign(defaultOptions, options))
}
