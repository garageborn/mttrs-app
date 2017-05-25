import React, { PropTypes } from 'react'
import { View, Text, Image } from 'react-native'
import Touchable from '../Touchable'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import arrow from './assets/arrow.png'
import styles from './styles'

const Header = ({ title, icon, type }) => {
  return (
    <View>
      <View style={styles.header}>
        <Touchable underlayColor={COLORLESS}>
          <View style={styles.headerContainer}>
            {icon}
            <Text style={styles.headerTitle}>{title}</Text>
            <Image style={styles.arrowUp} source={arrow} />
          </View>
        </Touchable>
      </View>
    </View>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  icon: PropTypes.any
}

export default Header
