import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'
import StatsTitle from './components/StatsTitle'
import StatsChart from './components/StatsChart'
import StoryLinkContainer from '../../containers/StoryLinkContainer'

class SocialCountModal extends Component {
  render () {
    if (!this.mainLink) return
    return (
      <View style={styles.container}>
        <View style={styles.storyLinkContainer}>
          <StoryLinkContainer
            type='header'
            story={this.props.story}
            link={this.mainLink}
          />
        </View>
        <View style={styles.statsContainer}>
          <StatsTitle linkCount={this.linkCount} totalCount={this.totalCount} />
          <StatsChart totalCount={this.totalCount} />
        </View>
      </View>
    )
  }

  get linkCount () {
    return this.props.story.other_links.length + 1
  }

  get totalCount () {
    return this.props.story.social_counter.total
  }

  get mainLink () {
    return this.props.story.main_link
  }
}

SocialCountModal.propTypes = {
  story: PropTypes.shape({
    main_link: PropTypes.object.isRequired,
    other_links: PropTypes.array.isRequired,
    social_counter: PropTypes.shape({
      total: PropTypes.number.isRequired
    })
  }).isRequired
}

export default SocialCountModal
