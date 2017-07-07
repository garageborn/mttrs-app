/* eslint-disable camelcase  */
/* eslint-disable react/jsx-no-bind  */
import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import PublisherLogo from '../PublisherLogo'
import styles from './styles'

const PublisherListItem = ({ active, publisher, rightContent }) => {
  const leftContainerStyles = active ? styles.leftContainer : styles.leftContainerInactive

  const getIcon = () => {
    if (!publisher.icon.small) return
    const uri = publisher.icon.small
    return <PublisherLogo size={30} source={{ uri }} />
  }

  return (
    <View style={styles.container}>
      <View style={leftContainerStyles}>
        {getIcon()}
        <Text style={styles.name}>
          {publisher.display_name || publisher.name}
        </Text>
      </View>
      <View style={styles.rightContainer}>
        {rightContent}
      </View>
    </View>
  )
}

PublisherListItem.propTypes = {
  active: PropTypes.bool.isRequired,
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    display_name: PropTypes.string,
    icon: PropTypes.shape({
      small: PropTypes.string
    })
  }),
  rightContent: PropTypes.element.isRequired
}

export default PublisherListItem
