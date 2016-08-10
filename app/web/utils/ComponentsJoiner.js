import React from 'react'
import _ from 'lodash'

const ComponentsJoiner = (componentArr) => {
  return componentArr.map((component, index) => {
    if (index < componentArr.length - 2) {
      return (
        <div key={_.uniqueid('c_')}>
          {component}<span>,&nbsp;</span>
        </div>
      )
    }
    if (index === componentArr.length - 2) {
      return (
        <div key={_.uniqueid('c_')}>
          {component}<span>&nbsp;and&nbsp;</span>
        </div>
      )
    }
    return (
      <div key={_.uniqueid('c_')}>
        {component}
      </div>
    )
  })
}

export default ComponentsJoiner
