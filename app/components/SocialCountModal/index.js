import React, { PropTypes } from 'react'
import { View } from 'react-native'
import styles from './styles'
import StatsTitle from './components/StatsTitle'
import StatsChart from './components/StatsChart'
import StatsSocialWrapper from './components/StatsSocialWrapper'
import StatsButtonWrapper from './components/StatsButtonWrapper'
import StoryLinkContainer from '../../containers/StoryLinkContainer'

const SocialCountModal = ({ story }) => {
  const socialCounter = story.social_counter
  const linkCount = story.other_links.length + 1
  const totalCount = story.social_counter.total
  const mainLink = story.main_link

  if (!mainLink) return null
  return (
    <View style={styles.container}>
      <View style={styles.storyLinkContainer}>
        <StoryLinkContainer type='header' story={story} link={mainLink} />
      </View>
      <View style={styles.statsContainer}>
        <StatsTitle linkCount={linkCount} totalCount={totalCount} />
        <StatsChart totalCount={totalCount} />
        <StatsSocialWrapper socialCounter={socialCounter} />
        <StatsButtonWrapper story={story} link={mainLink} />
      </View>
    </View>
  )
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
