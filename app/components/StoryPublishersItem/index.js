import React, { PropTypes } from 'react'
import { View } from 'react-native'
import RestrictContentLabel from '../RestrictContentLabel'
import PublisherLogo from '../PublisherLogo'
import styles from './styles'

const StoryPublishersItem = ({ source, restricted }) => {
  const renderRestricted = () => {
    if (restricted) return <RestrictContentLabel />
    return null
  }

  return (
    <View style={styles.container}>
      <PublisherLogo source={source} />
      {renderRestricted()}
    </View>
  )
}

StoryPublishersItem.propTypes = {
  source: PropTypes.object.isRequired
}

export default StoryPublishersItem
