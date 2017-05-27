/* eslint-disable camelcase  */
/* eslint-disable react/jsx-no-bind  */

import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import PublisherLogo from '../PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'
import styles from './styles'

class PublisherListItem extends Component {
  render () {
    let { publisher, rightContent } = this.props

    return (
      <View style={styles.container}>
        <View style={this.leftContainerStyles}>
          {this.icon}
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

  get leftContainerStyles () {
    if (!this.props.active) return styles.leftContainerInactive
    return styles.leftContainer
  }

  get icon () {
    let { publisher } = this.props
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return <PublisherLogo size={30} source={{ uri }} />
  }
}

PublisherListItem.propTypes = {
  active: PropTypes.bool.isRequired,
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    today_stories_count: PropTypes.number
  }),
  rightContent: PropTypes.element.isRequired
}

export default PublisherListItem
