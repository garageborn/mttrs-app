import React, { PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import CategoryColorsListContainer from '../../containers/CategoryColorsListContainer'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import styles from './styles'

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
      <CategoryColorsListContainer />
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  icon: PropTypes.any
}

export default Header
