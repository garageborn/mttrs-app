import React, { PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import CategoryColorsListContainer from '../../containers/CategoryColorsListContainer'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const Header = ({ title, toggleMenu, icon, params, type }) => {
  let categoryColors = () => {
    if (type === 'home' || type === 'category') {
      return <CategoryColorsListContainer params={params} />
    }
  }

  return (
    <View style={styles.header}>
      <TouchableHighlight onPress={toggleMenu} underlayColor={COLORLESS}>
        <View style={styles.headerContainer}>
          {icon}
          <Text style={styles.headerTitle}>{title}</Text>
          <Image source={require('../../assets/arrow.png')} />
        </View>
      </TouchableHighlight>
      {categoryColors()}
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  params: PropTypes.object,
  type: PropTypes.string,
  icon: PropTypes.any
}

export default Header
