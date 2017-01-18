import React, { PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import styles from './styles'
import { COLORLESS } from '../../constants/TouchUnderlayColors'

const Header = ({ title, toggleMenu, icon }) => {
  return (
    <View style={styles.header}>
      <TouchableHighlight onPress={toggleMenu} underlayColor={COLORLESS}>
        <View style={styles.headerContainer}>
          {icon}
          <Text style={styles.headerTitle}>{title}</Text>
          <Image source={require('../../assets/arrow.png')} />
        </View>
      </TouchableHighlight>
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  icon: PropTypes.any
}

export default Header
