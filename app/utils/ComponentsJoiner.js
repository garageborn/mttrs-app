import React from 'react'
import { Text } from 'react-native'
import _uniqueId from 'lodash/uniqueId'

const ComponentsJoiner = (componentArr) => {
  let arrLength = componentArr.length
  return componentArr.map((component, index) => {
    if (index < arrLength - 2) {
      return (
        <Text key={_uniqueId('c_')}>{component}, </Text>
      )
    }

    if (index === arrLength - 2) {
      return (
        <Text key={_uniqueId('c_')}>{component} and </Text>
      )
    }

    return (
      <Text key={_uniqueId('c_')}>{component}</Text>
    )
  })
}

export default ComponentsJoiner
