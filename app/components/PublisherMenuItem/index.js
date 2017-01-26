/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import Touchable from '../Touchable'
import PublisherLogo from '../PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const PublisherMenuItem = ({ onPress, publisher }) => {
  let renderIcon = () => {
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return <PublisherLogo size={30} source={{ uri }} />
  }

  return (
    <Touchable
      style={styles.touch}
      onPress={e => onPress(publisher)}
      underlayColor={WHITE_TRANSPARENT_COLOR}
    >
      <View style={styles.publisher}>
        {renderIcon()}
        <Text style={styles.name}>{publisher.name}</Text>
      </View>
    </Touchable>
  )
}

PublisherMenuItem.propTypes = {
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  onPress: PropTypes.func.isRequired
}

export default PublisherMenuItem
