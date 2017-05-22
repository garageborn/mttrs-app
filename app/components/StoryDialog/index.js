import React, { Component, PropTypes } from 'react'
import { Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import styles from './styles'
import ShareButtonContainer from '../../containers/ShareButtonContainer'
import ToggleFavoriteContainer from '../../containers/ToggleFavoriteContainer'

const messages = defineMessages({
  addFavorite: { id: 'storyDialog.addFavorite' },
  removeFavorite: { id: 'storyDialog.removeFavorite' },
  share: { id: 'storyDialog.share' }
})

class StoryDialog extends Component {
  render () {
    return (
      <View style={styles.container}>
        {this.renderFavoriteAction()}
        {this.renderShareAction()}
      </View>
    )
  }

  renderFavoriteAction () {
    const { publisher } = this.props.story.main_link

    return (
      <ToggleFavoriteContainer
        publisher={publisher}
        addComponent={this.addPublisherComponent()}
        removeComponent={this.removePublisherComponent()}
      />
    )
  }

  renderShareAction () {
    const { intl, story } = this.props

    return (
      <ShareButtonContainer link={story.main_link}>
        <Text>{intl.formatMessage(messages.share)}</Text>
      </ShareButtonContainer>
    )
  }

  addPublisherComponent () {
    const { intl } = this.props
    return (
      <View>
        <Text>{intl.formatMessage(messages.addFavorite)}</Text>
        <Text style={styles.publisherName}>{this.publisherName}</Text>
      </View>
    )
  }

  removePublisherComponent () {
    const { intl } = this.props
    return (
      <View>
        <Text>{intl.formatMessage(messages.removeFavorite)}</Text>
        <Text style={styles.publisherName}>{this.publisherName}</Text>
      </View>
    )
  }

  get publisherName () {
    const { publisher } = this.props.story.main_link
    return publisher.display_name || publisher.name
  }
}

StoryDialog.propTypes = {
  story: PropTypes.shape({
    main_link: PropTypes.shape({
      publisher: PropTypes.shape({
        id: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired,
        display_name: PropTypes.string
      }).isRequired
    }).isRequired
  }).isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(StoryDialog)
