import React, { Component, PropTypes } from 'react'
import { View, Image, TouchableHighlight, Text } from 'react-native'
import styles from '../styles/StoryLinks'
import moment from '../../common/utils/Moment'
import ParseDate from '../../common/utils/ParseDate'
import KFormat from '../../common/utils/KFormat'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'

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

  render() {
    const { link, rowID, openLink, openPublisher } = this.props
    return (
      <View
        style={this.rowStyle}>
        <View style={this.rowContainerStyle}>
          <TouchableHighlight
            style={styles.rowTouch}
            onPress={e => openPublisher(link.publisher)}
            underlayColor={WHITE_TRANSPARENT_COLOR}>
            <View style={styles.publisher}>
              <Image style={styles.logo} source={require('../assets/publisher-placeholder.png')} />
              <View style={styles.publisherInfo}>
                <Text style={styles.publisherName}>{link.publisher.name}</Text>
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.story}>
            <TouchableHighlight style={styles.rowTouch} onPress={e => openLink(link)}>
              <Text numberOfLines={1} style={styles.storyTitle}>{link.title}</Text>
            </TouchableHighlight>
            <View style={styles.shares}>
              <Image style={styles.shareIcon} source={require('../assets/icons/icon-hot.png')} />
              <Text style={styles.shareCount}>{KFormat(link.total_social)}+</Text>
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
