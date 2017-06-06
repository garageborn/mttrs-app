/* eslint-disable camelcase  */
/* eslint-disable react/jsx-no-bind  */
import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import PublisherLogo from '../PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'
import styles from './styles'

const PublisherListItem = ({ active, publisher, rightContent }) => {
  const leftContainerStyles = active ? styles.leftContainer : styles.leftContainerInactive

  const getIcon = () => {
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
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
    display_name: PropTypes.string
  }),
  rightContent: PropTypes.element.isRequired
}

export default PublisherListItem
