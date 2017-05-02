import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import styles from '../styles/StoryLinks'
import StoryLink from '../components/StoryLink'

class SocialCountModal extends Component {
  constructor (props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
  }

  render () {
    if (!this.mainLink) return
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <StoryLink
            linkType='header'
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
