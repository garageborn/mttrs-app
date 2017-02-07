import React, { PropTypes } from 'react'
import { Image } from 'react-native'
import styles from './styles'

const PageIcon = ({ source, iconStyles }) => (
  <Image source={source} style={[styles.icon, { ...iconStyles }]} />
)

PageIcon.propTypes = {
  source: PropTypes.any,
  iconStyles: PropTypes.object
}

export default PageIcon
