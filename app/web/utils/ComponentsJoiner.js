import React from 'react'

const ComponentsJoiner = (componentArr) => {
  return componentArr.map((component, index) => {
    if (index < componentArr.length - 2) {
      return (
        <div key={Math.random().toString(16)}>
          {component}<span>,&nbsp;</span>
        </div>
      )
    }
    if (index === componentArr.length - 2) {
      return (
        <div key={Math.random().toString(16)}>
          {component}<span>&nbsp;and&nbsp;</span>
        </div>
      )
    }
    return (
      <div key={Math.random().toString(16)}>
        {component}
      </div>
    )
  })
}

export default ComponentsJoiner
