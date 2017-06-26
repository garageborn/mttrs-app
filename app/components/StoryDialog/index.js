import React, { PropTypes } from 'react'
import { Image, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import DialogButton from '../DialogButton'
import OpenBrowserButton from '../OpenBrowserButton'
import CopyLinkButtonContainer from '../../containers/CopyLinkButtonContainer'
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

const StoryDialog = ({ intl, link, type }) => {
  const { publisher } = link
  const publisherName = publisher.display_name || publisher.name

  const renderFavoriteAction = () => {
    return (
      <ToggleFavoriteContainer
        publisher={publisher}
        addComponent={addPublisherComponent()}
        removeComponent={removePublisherComponent()}
      />
    )
  }

  const renderShareAction = () => {
    const icon = <Image source={shareIcon} />
    return (
      <ShareButtonContainer link={link}>
        <View>
          <DialogButton icon={icon} messages={[intl.formatMessage(messages.share)]} />
        </View>
      </ShareButtonContainer>
    )
  }

  const addPublisherComponent = () => {
    const icon = <Image source={inactiveFavoriteIcon} />
    return (
      <View>
        <DialogButton
          icon={icon}
          messages={[intl.formatMessage(messages.addFavorite), publisherName]}
        />
      </View>
    )
  }

  const removePublisherComponent = () => {
    const icon = <Image source={activeFavoriteIcon} />
    return (
      <View>
        <DialogButton
          icon={icon}
          messages={[intl.formatMessage(messages.removeFavorite), publisherName]}
        />
      </View>
    )
  }

  const renderOpenOnBrowser = () => {
    if (type !== 'untied') return null
    return <OpenBrowserButton link={link} />
  }

  const renderCopyLink = () => {
    if (type !== 'untied') return null
    return <CopyLinkButtonContainer link={link} />
  }

  return (
    <View style={styles[type]}>
      {renderFavoriteAction()}
      {renderShareAction()}
      {renderOpenOnBrowser()}
      {renderCopyLink()}
    </View>
  )
}

StoryDialog.propTypes = {
  link: PropTypes.shape({
    publisher: PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
      display_name: PropTypes.string
    }).isRequired
  }).isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  type: PropTypes.string.isRequired
}

export default injectIntl(StoryDialog)
