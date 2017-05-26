import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import PublisherLogo from '../PublisherLogo'
import headerStyles from '../../styles/Header'
import styles from './styles'

const HeaderTitle = ({ logo, title }) => {
  const renderLogo = () => {
    if (!logo) return null
    return <PublisherLogo size={22} source={{uri: logo}} />
  }

  return (
    <View style={styles.container}>
      {renderLogo()}
      <Text style={[headerStyles.headerTitleStyle, styles.text]}>{title}</Text>
    </View>
  )
}

HeaderTitle.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string.isRequired
}

export default HeaderTitle
