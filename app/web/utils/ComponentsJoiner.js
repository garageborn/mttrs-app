import React from 'react'

const ComponentsJoiner = (arr, index, key, component) => {
  if (index < arr.length - 2) {
    return <div key={key}>{component}<span>,&nbsp;</span></div>
  }
  if (index === arr.length - 2) {
    return <div key={key}>{component}<span>&nbsp;and&nbsp;</span></div>
  }
  return <div key={key}>{component}</div>
}

export default ComponentsJoiner
