import React, { PropTypes } from 'react'
import { View, Text, Image } from 'react-native'
import Touchable from '../Touchable'
import HeaderBottomColorContainer from '../../containers/HeaderBottomColorContainer'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import arrow from './assets/arrow.png'
import styles from './styles'

const Header = ({ title, toggleMenu, icon, params, type, menuIsOpen }) => {
  return (
    <View>
      <View style={styles.header}>
        <Touchable onPress={toggleMenu} underlayColor={COLORLESS}>
          <View style={styles.headerContainer}>
            {icon}
            <Text style={styles.headerTitle}>{title}</Text>
            <Image style={menuIsOpen && styles.arrowUp} source={arrow} />
          </View>
        </Touchable>
      </View>
      <HeaderBottomColorContainer type={type} params={params} />
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  menuIsOpen: PropTypes.bool.isRequired,
  params: PropTypes.object,
  icon: PropTypes.any
}

export default Header
