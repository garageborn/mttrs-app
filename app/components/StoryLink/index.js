/* eslint-disable react/jsx-no-bind */
import React, { Component, PropTypes } from 'react'
import { View, Image, Text } from 'react-native'
import Touchable from '../Touchable'
import RestrictContentLabel from '../RestrictContentLabel'
import PublisherLogo from '../PublisherLogo'
import SocialCountFormatter from '../../common/utils/SocialCountFormatter'
import * as cloudinary from '../../common/utils/Cloudinary'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

class StoryLink extends Component {
  isHeader (linkType) {
    return linkType === 'header'
  }

  get rowStyle () {
    return this.isHeader(this.props.linkType) ? styles.header : styles.row
  }

  get rowContainerStyle () {
    return this.isHeader(this.props.linkType) ? styles.headerContainer : styles.rowContainer
  }

  get publisherLogo () {
    const { publisher } = this.props.link
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id)
    return { uri }
  }

  get restrictContentLabel () {
    const { publisher } = this.props.link
    if (publisher.restrict_content) return <RestrictContentLabel />
  }

  get publisherName () {
    const { publisher } = this.props.link
    return publisher.display_name || publisher.name
  }

  render () {
    const { link, openLink, openPublisher } = this.props
    return (
      <View style={this.rowStyle}>
        <View style={this.rowContainerStyle}>
          <View>
            <Touchable
              underlayColor={WHITE_TRANSPARENT_COLOR}
              onPress={() => openPublisher(link.publisher)}
            >
              <View style={styles.publisher}>
                <PublisherLogo size={30} source={this.publisherLogo} />
                <View style={styles.publisherInfo}>
                  <Text style={styles.publisherName}>{this.publisherName}</Text>
                </View>
                {this.restrictContentLabel}
              </View>
            </Touchable>
            <Touchable
              style={styles.rowTouch}
              onPress={e => openLink(link)}
              underlayColor={WHITE_TRANSPARENT_COLOR}
            >
              <View style={styles.story}>
                <Text numberOfLines={2} style={styles.storyTitle}>{link.title}</Text>
                <View style={styles.shares}>
                  <Image style={styles.shareIcon} source={require('../../assets/icons/icon-hot.png')} />
                  <Text style={styles.shareCount}>{SocialCountFormatter(link.total_social)}</Text>
                </View>
              </View>
            </Touchable>
          </View>
        </View>
      </View>
    )
  }
}

StoryLink.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    publisher: PropTypes.object.isRequired
  }).isRequired,
  openLink: PropTypes.func.isRequired,
  openPublisher: PropTypes.func.isRequired,
  linkType: PropTypes.string.isRequired
}

export default StoryLink
