import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import PublisherLogo from '../PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'
import styles from './styles'

const StoryPublishers = ({ story }) => {
  const renderCounter = () => {
    const otherLinksCount = story.links_count - story.publishers.length
    if (otherLinksCount < 1) return
    return <Text style={styles.darkText}>+{otherLinksCount}</Text>
  }

  const renderPublisher = (publisher) => {
    if (!publisher.icon_id) return null
    const uri = cloudinary.id(publisher.icon_id)
    return <PublisherLogo key={publisher.id} source={{ uri }} />
  }

  const renderPublishers = () => {
    return story.publishers.map((publisher) => renderPublisher(publisher))
  }

  return (
    <View style={styles.publisher}>
      {renderCounter()}
      {renderPublishers()}
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
