import React from 'react'

export function storiesPath(filter = null) {
  console.log('switch', filter)
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
