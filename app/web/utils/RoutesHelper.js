import React from 'react'

export function categoryPath(slug, filter = null) {
  let filterPath = storiesPath(filter)
  if (filterPath && filterPath !== '/') return `/${ slug }${ filterPath }`
  return `/${ slug }`
}

export function publisherPath(slug, filter = null) {
  let filterPath = storiesPath(filter)
  if (filterPath && filterPath !== '/') return `/${ slug }${ filterPath }`
  return `/${ slug }`
}

export function storiesPath(filter = null) {
  switch(filter) {
    case 'yesterday':
      return '/yesterday'
    case 'last_week':
      return '/last-week'
    case 'last_month':
      return '/last-month'
    default:
      return '/'
  }
}
