import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'
import styles from '../../styles/App'

class FavoritesTimelineContainer extends Component {
  render () {
    return (
      <View style={styles.listViewContainer}>
        <TimelineContainer data={this.props.data} />
      </View>
    )
  }
}

FavoritesTimelineContainer.propTypes = {
  data: PropTypes.object
}

export default withQuery(FavoritesTimelineContainer)
