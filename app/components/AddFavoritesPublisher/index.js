import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import AddFavoritesPublisherActiveLabel from '../AddFavoritesPublisherActiveLabel'
import styles from './styles'

const AddFavoritesPublisher = ({ active, icon, name }) => {
  const containerStyles = () => {
    if (active) return [styles.container, styles.active]
    return styles.container
  }

  const renderActiveLabel = () => {
    return <AddFavoritesPublisherActiveLabel active={active} />
  }

  return (
    <View style={containerStyles()}>
      {renderActiveLabel()}
      {icon}
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
