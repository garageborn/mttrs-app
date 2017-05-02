import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import styles from '../../styles/StoryLinks'
import StoryLinkContainer from '../../containers/StoryLinkContainer'

class SocialCountModal extends Component {
  render () {
    if (!this.mainLink) return
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <StoryLinkContainer
            type='header'
            story={this.props.story}
            link={this.mainLink}
          />
        </View>
      </View>
    )
  }

  get mainLink () {
    return this.props.story.main_link
  }
}

SocialCountModal.propTypes = {
  story: PropTypes.shape({
    main_link: PropTypes.object.isRequired
  }).isRequired
}

export default SocialCountModal
