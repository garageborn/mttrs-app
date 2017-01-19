import React, { PropTypes } from 'react'
import { View } from 'react-native'
import CategoryMenuContainer from '../../containers/CategoryMenuContainer'
import styles from './styles'

const Menu = ({ params }) => {
  return (
    <View style={styles.menu}>
      <View style={styles.menuContainer}>
        <CategoryMenuContainer params={params} />
      </View>
    </View>
  )
}

Menu.propTypes = {
  params: PropTypes.object.isRequired
}

export default Menu
