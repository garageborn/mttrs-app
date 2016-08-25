import React from 'react'
import _ from 'lodash'

const ComponentsJoiner = (componentArr) => {
  return componentArr.map((component, index) => {
    if (index < componentArr.length - 2) {
      return (
        <div key={_.uniqueId('c_')}>
          {component},&nbsp;
        </div>
      )
    }
    if (index === componentArr.length - 2) {
      return (
        <div key={_.uniqueId('c_')}>
          {component}&nbsp;and&nbsp;
        </div>
      )
    }
    return (
      <div key={_.uniqueId('c_')}>
        {component}
      </div>
    )
  })
}

export default ComponentsJoiner
