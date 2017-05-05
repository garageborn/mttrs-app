import React, { PropTypes } from 'react'
import { Image } from 'react-native'
import image from './assets/image.png'
import styles from './styles'
const spacingFromBar = 5

const StatsActive = ({ height }) => {
  const getBottom = () => ({ bottom: height + spacingFromBar })
  return (
    <Image source={image} style={[styles.image, getBottom()]} />
  )
}

StatsActive.propTypes = {
  height: PropTypes.number.isRequired
}

export default StatsActive
