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
  and: {
    id: 'and'
  },
  others: {
    id: 'storyPublishers.others'
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
    const and = formatMessage(messages.and)
    const othersText = formatMessage(messages.others, {itemCount: this.props.story.other_links_count})
    let otherLinksCount = this.props.story.other_links_count
    if (!otherLinksCount) return

    return (
      <Text style={styles.lightText}> {and}
        <Text style={styles.darkText}>{othersText}</Text>
      </Text>
    )
  }
}

StoryPublishers.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired
  }).isRequired,
  story: PropTypes.shape({
    main_link: PropTypes.shape({
      publisher: PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon_id: PropTypes.string
      }).isRequired
    }).isRequired,
    other_links_count: PropTypes.number.isRequired
  }).isRequired,
  openStoryLinks: PropTypes.func.isRequired
}

export default injectIntl(StoryPublishers)
