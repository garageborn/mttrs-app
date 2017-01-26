import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../Touchable'
import PublisherLogo from '../PublisherLogo'
import styles from './styles'
import * as cloudinary from '../../common/utils/Cloudinary'
import { WHITE_COLOR } from '../../constants/TouchUnderlayColors'

const messages = defineMessages({
  storyFrom: {
    id: 'from',
    defaultMessage: 'From'
  },

  storyAnd: {
    id: 'and',
    defaultMessage: 'and'
  },

  storyOther: {
    id: 'other',
    defaultMessage: 'other'
  },

  storyOthers: {
    id: 'others',
    defaultMessage: 'others'
  }
})

class StoryPublishers extends Component {
  render () {
    const { openStoryLinks } = this.props
    const { formatMessage } = this.props.intl

    return (
      <Touchable onPress={openStoryLinks} underlayColor={WHITE_COLOR}>
        <View style={styles.publisher}>
          <Text style={styles.lightText}>{formatMessage(messages.storyFrom)} </Text>
          <PublisherLogo source={this.publisherLogo} />
          {this.getMainPublisher()}
          {this.getCounter()}
        </View>
      </Touchable>
    )
  }

  getMainPublisher () {
    const { main_link } = this.props.story
    return <Text style={styles.darkText}> {main_link.publisher.name}</Text>
  }

  get publisherLogo () {
    const { main_link } = this.props.story
    if (!main_link.publisher.icon_id) return
    const uri = cloudinary.id(main_link.publisher.icon_id, { secure: true })
    return { uri }
  }

  getCounter () {
    const { formatMessage } = this.props.intl
    const { other_links } = this.props.story
    const and = formatMessage(messages.storyAnd)
    const other = formatMessage(messages.storyOther)
    const others = formatMessage(messages.storyOthers)
    let linksLength = other_links.length

    if (!linksLength) return

    return (
      <Text style={styles.lightText}> {and}
        <Text style={styles.darkText}> {linksLength} {linksLength === 1 ? other : others}</Text>
      </Text>
    )
  }
}

StoryPublishers.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  story: PropTypes.shape({
    main_link: PropTypes.shape({
      publisher: PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon_id: PropTypes.string
      }).isRequired
    }).isRequired,
    other_links: PropTypes.array.isRequired
  }).isRequired,
  openStoryLinks: PropTypes.func.isRequired
}

export default injectIntl(StoryPublishers)
