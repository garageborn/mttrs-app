import React, { PropTypes } from 'react'
import { View } from 'react-native'
import StoryPublishersCounter from '../StoryPublishersCounter'
import StoryPublishersItem from '../StoryPublishersItem'
import StoryPublishersList from '../StoryPublishersList'
import * as cloudinary from '../../common/utils/Cloudinary'
import styles, { smallDevice } from './styles'

const StoryPublishers = ({ story }) => {
  const renderCounter = () => {
    let shownPublishersCount = 5
    if (smallDevice) shownPublishersCount = 3
    const otherLinksCount = story.links_count - shownPublishersCount
    return <StoryPublishersCounter count={otherLinksCount} />
  }

  const renderPublisher = (publisher, restricted) => {
    if (!publisher.icon_id) return null
    const uri = cloudinary.id(publisher.icon_id)
    return <StoryPublishersItem key={publisher.id} source={{ uri }} restricted={restricted} />
  }

  const publishers = () => {
    let { publishers } = story
    if (publishers.length === 1 && publishers[0].restrict_content) return renderPublisher(publishers[0], true)
    if (smallDevice) publishers = publishers.slice(0, 3)
    return publishers.map((publisher) => renderPublisher(publisher, false))
  }

  const renderPublishers = () => <StoryPublishersList publishers={publishers()} />

  return (
    <View style={styles.container}>
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
