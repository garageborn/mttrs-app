/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react'
import { View, Image, Text } from 'react-native'
import Touchable from '../Touchable'
import RestrictContentLabel from '../RestrictContentLabel'
import PublisherLogo from '../PublisherLogo'
import SocialCountFormatter from '../../common/utils/SocialCountFormatter'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const StoryLink = ({ link, linkType, openLink, openPublisher }) => {
  const { publisher } = link
  const publisherName = publisher.display_name || publisher.name
  const isHeader = linkType === 'header'
  const rowStyle = isHeader ? styles.header : styles.row
  const rowContainerStyle = isHeader ? styles.headerContainer : styles.rowContainer
  const publisherLogo = () => {
    if (!publisher.icon.small) return
    return { uri: publisher.icon.small }
  }
  const restrictContentLabel = () => {
    if (!publisher.restrict_content) return null
    return <RestrictContentLabel />
  }

  return (
    <View style={rowStyle}>
      <View style={rowContainerStyle}>
        <View>
          <Touchable
            underlayColor={WHITE_TRANSPARENT_COLOR}
            onPress={() => openPublisher(link.publisher)}
          >
            <View style={styles.publisher}>
              <PublisherLogo size={30} source={publisherLogo()} />
              <View style={styles.publisherInfo}>
                <Text style={styles.publisherName}>{publisherName}</Text>
              </View>
              {restrictContentLabel()}
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

StoryLink.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    publisher: PropTypes.shape({
      icon: PropTypes.shape({
        small: PropTypes.string
      })
    }).isRequired
  }).isRequired,
  openLink: PropTypes.func.isRequired,
  openPublisher: PropTypes.func.isRequired,
  linkType: PropTypes.string.isRequired
}

export default StoryLink
