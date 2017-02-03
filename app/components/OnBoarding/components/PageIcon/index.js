import React, { PropTypes } from 'react'
import { Image } from 'react-native'
import styles from './styles'

const PageIcon = ({ source }) => (
  <Image source={source} style={styles.icon} />
)

PageIcon.propTypes = {
  source: PropTypes.any
}

export default PageIcon
