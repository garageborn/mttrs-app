import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'

const AddFavoritesPublisherActiveLabel = ({ active }) => {
  const containerStyles = () => {
    if (active) return [styles.container, styles.active]
    return styles.container
  }

  const renderInnerDot = () => {
    if (!active) return
    return <View style={styles.innerDot} />
  }

  return (
    <View style={containerStyles()}>
      {renderInnerDot()}
    </View>
  )
}

AddFavoritesPublisherActiveLabel.propTypes = {
  active: PropTypes.bool.isRequired
}

export default AddFavoritesPublisherActiveLabel
