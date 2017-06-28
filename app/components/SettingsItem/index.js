import React, { PropTypes } from 'react'
import { View } from 'react-native'
import Heading from '../Heading'
import styles, { regularTextColor, smallTextColor } from './styles'

const SettingsItem = ({ leftContent, rightContent, title, subtitle }) => {
  const renderSubtitle = subtitle
    ? <Heading size='small' color={smallTextColor}>{subtitle}</Heading>
    : null

  const textContainerStyles = !leftContent
    ? styles.textContainer
    : styles.textContainerWithIcon

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {leftContent}
        <View style={textContainerStyles}>
          <Heading size='regular' color={regularTextColor}>{title}</Heading>
          {renderSubtitle}
        </View>
      </View>
      {rightContent}
    </View>
  )
}

SettingsItem.propTypes = {
  leftContent: PropTypes.node,
  rightContent: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
}

export default SettingsItem
