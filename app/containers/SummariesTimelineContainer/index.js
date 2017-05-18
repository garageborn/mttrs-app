import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import withQuery from './index.gql'
import Timeline from '../Timeline'
import styles from '../../styles/App'

class SummariesTimelineContainer extends Component {
  render () {
    return (
      <View style={styles.listViewContainer}>
        <Timeline type='summaries' data={this.props.data} />
      </View>
    )
  }
}

SummariesTimelineContainer.propTypes = {
  data: PropTypes.object
}

export default withQuery(SummariesTimelineContainer)
