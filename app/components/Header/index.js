import React, { PropTypes } from 'react'
import { View, Text, Image } from 'react-native'
import Touchable from '../Touchable'
import HeaderBottomColorContainer from '../../containers/HeaderBottomColorContainer'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const Header = ({ title, toggleMenu, icon, params, type }) => {
  let headerBottomColors = () => <HeaderBottomColorContainer type={type} params={params} />

  return (
    <View>
      <View style={styles.header}>
        <Touchable onPress={toggleMenu} underlayColor={COLORLESS}>
          <View style={styles.headerContainer}>
            {icon}
            <Text style={styles.headerTitle}>{title}</Text>
            <Image source={require('../../assets/arrow.png')} />
          </View>
        </Touchable>
      </View>
      {headerBottomColors()}
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  params: PropTypes.object,
  icon: PropTypes.any
}

export default Header
