import React, { Component, PropTypes } from 'react'
import { ScrollView, ListView, View, Text } from 'react-native'
import _ from 'lodash'
import StoryList from './StoryList'

class Timeline extends Component {
  getTimelineItems() {
    const { items } = this.props

    return items.map((item) => {
      return <StoryList key={_.uniqueId('s_')} date={item.date} stories={item.stories} />
    })
  }

  render() {
    const { isFetching } = this.props

    if (isFetching) {
      return (
        <View><Text>Hang on...</Text></View>
      )
    }

    return (
      <ScrollView>
        {this.getTimelineItems()}
      </ScrollView>
    )
  }
}

Timeline.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

export default Timeline
