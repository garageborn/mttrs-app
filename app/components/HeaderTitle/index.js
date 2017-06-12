import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import headerStyles from '../../styles/Header'
import styles from './styles'

const HeaderTitle = ({ leftButton, logo, subtitle, title }) => {
  const containerStyles = () => {
    if (leftButton) return styles.containerWithLeftButton
    return styles.container
  }
  const renderTitle = () => {
    if (!subtitle) return <Text style={[headerStyles.headerTitleStyle, styles.text]}>{title}</Text>
    return (
      <View>
        <Text style={[styles.text, styles.titleWithSubtitle]}>{title}</Text>
        <Text style={[styles.text, styles.subtitle]} numberOfLines={1}>{subtitle}</Text>
      </View>
    )
  }

  const renderLogo = () => {
    if (!logo) return null
    return logo
  }

  return (
    <View style={containerStyles()}>
      {renderLogo()}
      {renderTitle()}
    </View>
  )
}

HeaderTitle.propTypes = {
  leftButton: PropTypes.bool,
  logo: PropTypes.element,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}

export default HeaderTitle
