import React, { PropTypes } from 'react'
import { View } from 'react-native'
import StoryPublishersCounter from '../StoryPublishersCounter'
import StoryPublishersItem from '../StoryPublishersItem'
import StoryPublishersList from '../StoryPublishersList'
import * as cloudinary from '../../common/utils/Cloudinary'
import styles from './styles'

const StoryPublishers = ({ story }) => {
  const renderCounter = () => {
    const otherLinksCount = story.links_count - story.publishers.length
    return <StoryPublishersCounter count={otherLinksCount} />
  }

  const renderPublisher = (publisher) => {
    if (!publisher.icon_id) return null
    const uri = cloudinary.id(publisher.icon_id)
    return <StoryPublishersItem key={publisher.id} source={{ uri }} />
  }

  const renderPublishers = () => {
    return story.publishers.map((publisher) => renderPublisher(publisher))
  }

  return (
    <View style={styles.container}>
      {renderCounter()}
      <StoryPublishersList publishers={renderPublishers()} />
    </View>
  )
}

StoryPublishers.propTypes = {
  story: PropTypes.shape({
    publishers: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon_id: PropTypes.string
      })
    ).isRequired,
    links_count: PropTypes.number.isRequired
  }).isRequired
}

export default StoryPublishers
