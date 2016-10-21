import React, { Component, PropTypes } from 'react'
import { View, Text, TouchableHighlight, Image } from 'react-native'
import PublisherLogo from './PublisherLogo'
import styles from '../styles/MenuPublishers'
import * as cloudinary from '../../common/utils/Cloudinary'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'

class PublisherMenuItem extends Component {
  render() {
    const { onPress, publisher } = this.props
    return (
      <TouchableHighlight
        style={styles.touch}
        onPress={e => onPress(publisher)}
        underlayColor={WHITE_TRANSPARENT_COLOR}>
        <View style={styles.publisher}>
          {this.renderIcon()}
          <Text style={styles.name}>{publisher.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  renderIcon() {
    const { publisher } = this.props
    if (!publisher.icon_id) return <View style={styles.logoContainer} />
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return <PublisherLogo source={uri} />
  }
}

PublisherMenuItem.propTypes = {
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  onPress: PropTypes.func.isRequired
}

export default PublisherMenuItem
