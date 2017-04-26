/* eslint-disable camelcase  */
/* eslint-disable react/jsx-no-bind  */

import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import Touchable from '../Touchable'
import PublisherLogo from '../PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

class PublisherMenuItem extends Component {
  render () {
    let { publisher, onPress } = this.props

    return (
      <Touchable
        style={styles.touch}
        onPress={() => onPress(publisher)}
        underlayColor={WHITE_TRANSPARENT_COLOR}
      >
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            {this.icon}
            <Text style={styles.name}>
              {publisher.display_name || publisher.name}
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.count}>{this.count}</Text>
          </View>
        </View>
      </Touchable>
    )
  }

  get icon () {
    let { publisher } = this.props
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return <PublisherLogo size={30} source={{ uri }} />
  }

  get count () {
    let { recent_stories_count } = this.props.publisher
    if (!recent_stories_count) return '--'
    return recent_stories_count
  }
}

PublisherMenuItem.propTypes = {
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    recent_stories_count: PropTypes.number
  }),
  onPress: PropTypes.func.isRequired
}

export default PublisherMenuItem
