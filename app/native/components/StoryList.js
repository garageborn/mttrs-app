import React, { Component, PropTypes } from 'react'
import { View, Text } from 'react-native'
import Story from './Story'
import moment from '../../common/utils/Moment'

class StoryList extends Component {
  getDay() {
    const { date } = this.props

    switch (date) {
      case 'last_week':
        return 'Last Week'
      case 'last_month':
        return 'Last Month'
      default:
        return moment.unix(date).calendar(null, {
          sameDay: '[Today]',
          lastDay: '[Yesterday]',
          lastWeek: 'MMMM D',
          sameElse: 'MMMM D'
        })
    }
  }

  getStories() {
    const { stories } = this.props

    return stories.map((story) => {
      return <Story key={story.id} story={story} />
    })
  }

  render() {
    return (
      <View>
        <View>
          <Text>{this.getDay()}</Text>
        </View>
        {this.getStories()}
      </View>
    )
  }
}

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
  date: PropTypes.any.isRequired
}

export default StoryList
