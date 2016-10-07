import React, { Component, PropTypes } from 'react'
import { View, Image, TouchableHighlight, Text } from 'react-native'
import styles from '../styles/StoryLinks'
import moment from '../../common/utils/Moment'
import ParseDate from '../../common/utils/ParseDate'

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
    const { link, rowID, openLink } = this.props
    return (
      <View
        style={this.rowStyle}>
        <View style={this.rowContainerStyle}>
          <View style={styles.publisher}>
            <Image style={styles.logo} source={require('../assets/publisher-placeholder.png')} />
            <View style={styles.publisherInfo}>
              <Text style={styles.publisherName}>{link.publisher.name}</Text>
              {/* <Text style={styles.time}>{ParseDate(moment(link.created_at).unix())}</Text> */}
            </View>
          </View>
          <View style={styles.story}>
            <TouchableHighlight style={styles.rowTouch} onPress={e => openLink(link)}>
              <Text numberOfLines={2} style={styles.storyTitle}>{link.title}</Text>
            </TouchableHighlight>
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
  openLink: PropTypes.func.isRequired
}

export default StoryLink
