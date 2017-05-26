import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import headerStyles from '../../styles/Header'
import styles from './styles'

const HeaderTitle = ({ logo, subtitle, title }) => {
  const renderTitle = () => {
    if (!subtitle) return <Text style={[headerStyles.headerTitleStyle, styles.text]}>{title}</Text>
    return (
      <View>
        <Text style={[styles.text, styles.titleWithSubtitle]}>{title}</Text>
        <Text style={[headerStyles.headerTitleStyle, styles.text]} numberOfLines={1}>{subtitle}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {logo}
      {renderTitle()}
    </View>
  )
}

HeaderTitle.propTypes = {
  logo: PropTypes.element,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
}

export default HeaderTitle
