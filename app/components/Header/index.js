import React, { PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import HeaderBottomColorContainer from '../../containers/HeaderBottomColorContainer'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const Header = ({ title, toggleMenu, icon, params }) => {
  let headerBottomColors = () => <HeaderBottomColorContainer params={params} />

  return (
    <View>
      <View style={styles.header}>
        <TouchableHighlight onPress={toggleMenu} underlayColor={COLORLESS}>
          <View style={styles.headerContainer}>
            {icon}
            <Text style={styles.headerTitle}>{title}</Text>
            <Image source={require('../../assets/arrow.png')} />
          </View>
        </TouchableHighlight>
      </View>
      {headerBottomColors()}
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  params: PropTypes.object,
  icon: PropTypes.any
}

export default Header
