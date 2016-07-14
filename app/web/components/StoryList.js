import React, {Component, PropTypes} from 'react'
import Story from 'mttrs/app/web/components/Story'
import moment from 'mttrs/app/web/utils/Moment'

class StoryList extends Component {
  render() {
    let stories = this.props.stories.map((story) => {
      return <Story key={story.id} story={story} />
    })

    return (
      <div>
        <h2>{this.day}</h2>
        {stories}
      </div>
    )
  }

  get day() {
    switch (this.props.date) {
      case 'last_week':
        return 'Last Week'
      case 'last_month':
        return 'Last Month'
      default:
        return moment.unix(this.props.date).calendar(null, {
          sameDay : '[Today]',
          lastDay : '[Yesterday]',
          lastWeek : 'MMMM D',
          sameElse : 'MMMM D'
        })
    }
  }
}

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
  date: PropTypes.any.isRequired
}

export default StoryList
