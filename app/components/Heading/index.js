import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

const Heading = ({ bold, children, color, size, textStyle, style }) => {
  const headingStyles = () => {
    let stylesItems = [styles[size], textStyle]
    if (bold) stylesItems = [...stylesItems, styles.bold]
    if (color) stylesItems = [...stylesItems, { color: color }]
    return stylesItems
  }
  return (
    <View style={style}>
      <Text style={headingStyles()}>{children}</Text>
    </View>
  )
}

Heading.propTypes = {
  bold: PropTypes.bool,
  color: PropTypes.string,
  children: PropTypes.any,
  size: PropTypes.string.isRequired,
  style: PropTypes.number
}

export default Heading
