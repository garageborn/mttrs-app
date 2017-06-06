import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import AddFavoritesPublisherActiveLabel from '../AddFavoritesPublisherActiveLabel'
import styles from './styles'

const AddFavoritesPublisher = ({ active, icon, name }) => {
  const iconStyle = active ? styles.activeIcon : styles.inactiveIcon

  return (
    <View style={styles.container}>
      <AddFavoritesPublisherActiveLabel active={active} />
      <View style={iconStyle}>{icon}</View>
      <Text style={styles.text}>{name}</Text>
    </View>
  )
}

AddFavoritesPublisher.propTypes = {
  active: PropTypes.bool.isRequired,
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
}

export default AddFavoritesPublisher
