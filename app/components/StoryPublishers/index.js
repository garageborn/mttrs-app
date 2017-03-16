import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import RestrictContentLabel from '../RestrictContentLabel'
import PublisherLogo from '../PublisherLogo'
import styles from './styles'
import * as cloudinary from '../../common/utils/Cloudinary'

const messages = defineMessages({
  and: {
    id: 'and'
  },
  others: {
    id: 'storyPublishers.others'
  }
})

class StoryPublishers extends Component {
  render () {
    return (
      <View style={styles.publisher}>
        <PublisherLogo source={this.publisherLogo} />
        {this.getMainPublisher()}
        {this.getCounter()}
      </View>
    )
  }

  getRestrictContentLabel () {
    const { story } = this.props
    if (story.other_links_count > 0) return
    if (story.main_link.publisher.restrict_content) return <RestrictContentLabel />
  }

  getMainPublisher () {
    return (
      <View style={styles.restrictContent}>
        <Text style={styles.darkText}> {this.name}</Text>
        {this.getRestrictContentLabel()}
      </View>
    )
  }

  get name () {
    const { publisher } = this.props.story.main_link
    return publisher.display_name || publisher.name
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
  }).isRequired
}

export default injectIntl(StoryPublishers)
