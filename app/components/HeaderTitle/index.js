import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import headerStyles from '../../styles/Header'
import styles from './styles'

const HeaderTitle = ({ logo, title }) => {
  return (
    <View style={styles.container}>
      {logo}
      <Text style={[headerStyles.headerTitleStyle, styles.text]}>{title}</Text>
    </View>
  )
}

HeaderTitle.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string.isRequired
}

export default HeaderTitle
