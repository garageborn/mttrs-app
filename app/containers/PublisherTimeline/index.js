import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { withNavigation } from '@exponent/ex-navigation'
import withQuery from './index.gql'
import Timeline from '../Timeline'
import styles from '../../styles/App'

class PublisherTimeline extends Component {
  render () {
    return (
      <View style={styles.listViewContainer}>
        <Timeline data={this.props.data} />
      </View>
    )
  }
}

PublisherTimeline.propTypes = {
  data: PropTypes.object,
  model: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }).isRequired
}

const PublisherTimelineWithData = withQuery(PublisherTimeline)
export default withNavigation(PublisherTimelineWithData)
