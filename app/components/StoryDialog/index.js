import React, { Component, PropTypes } from 'react'
import { Image, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import DialogButton from '../DialogButton'
import ShareButtonContainer from '../../containers/ShareButtonContainer'
import ToggleFavoriteContainer from '../../containers/ToggleFavoriteContainer'
import styles from './styles'

const activeFavoriteIcon = require('./assets/favoriteActive.png')
const inactiveFavoriteIcon = require('./assets/favoriteInactive.png')
const shareIcon = require('./assets/share.png')

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
        <View>
          <DialogButton icon={this.shareIcon} messages={[intl.formatMessage(messages.share)]} />
        </View>
      </ShareButtonContainer>
    )
  }

  addPublisherComponent () {
    const { intl } = this.props
    return (
      <View>
        <DialogButton
          icon={this.inactiveFavoriteIcon}
          messages={[intl.formatMessage(messages.addFavorite), this.publisherName]}
        />
      </View>
    )
  }

  removePublisherComponent () {
    const { intl } = this.props
    return (
      <View>
        <DialogButton
          icon={this.activeFavoriteIcon}
          messages={[intl.formatMessage(messages.removeFavorite), this.publisherName]}
        />
      </View>
    )
  }

  get shareIcon () {
    return <Image source={shareIcon} />
  }

  get activeFavoriteIcon () {
    return <Image source={activeFavoriteIcon} />
  }

  get inactiveFavoriteIcon () {
    return <Image source={inactiveFavoriteIcon} />
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
