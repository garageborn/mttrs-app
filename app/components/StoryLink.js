import React, { Component, PropTypes } from 'react'
import { View, Image, Text } from 'react-native'
import Touchable from './Touchable'
import PublisherLogo from './PublisherLogo'
import styles from '../styles/StoryLinks'
import SocialCountFormatter from '../common/utils/SocialCountFormatter'
import * as cloudinary from '../common/utils/Cloudinary'
import { WHITE_TRANSPARENT_COLOR } from '../constants/TouchUnderlayColors'

class StoryLink extends Component {
  isHeader(linkType) {
    return linkType === 'header'
  }

  get rowStyle() {
    return this.isHeader(this.props.linkType) ? styles.header : styles.row
  }

  get rowContainerStyle() {
    return this.isHeader(this.props.linkType) ? styles.headerContainer : styles.rowContainer
  }

  get publisherLogo() {
    const { publisher } = this.props.link
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return { uri }
  }

  render() {
    const { link, rowID, openLink, openPublisher } = this.props
    return (
      <View
        style={this.rowStyle}>
        <View style={this.rowContainerStyle}>
          <Touchable
            style={styles.rowTouch}
            onPress={e => openPublisher(link.publisher)}
            underlayColor={WHITE_TRANSPARENT_COLOR}>
            <View style={styles.publisher}>
              <PublisherLogo size={30} source={this.publisherLogo} />
              <View style={styles.publisherInfo}>
                <Text style={styles.publisherName}>{link.publisher.name}</Text>
              </View>
            </View>
          </Touchable>
          <View style={styles.story}>
            <Touchable
              style={styles.rowTouch}
              onPress={e => openLink(link)}
              underlayColor={WHITE_TRANSPARENT_COLOR}>
              <Text numberOfLines={1} style={styles.storyTitle}>{link.title}</Text>
            </Touchable>
            <View style={styles.shares}>
              <Image style={styles.shareIcon} source={require('../assets/icons/icon-hot.png')} />
              <Text style={styles.shareCount}>{SocialCountFormatter(link.total_social)}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

StoryLink.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired,
  rowID: PropTypes.string,
  openLink: PropTypes.func.isRequired,
  openPublisher: PropTypes.func.isRequired
}

export default StoryLink
