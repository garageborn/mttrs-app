import React, {Component, PropTypes} from 'react'
import Story from 'mttrs/app/web/components/Story'
import moment from 'moment'

class StoryList extends Component {
  render() {
    const {stories} = this.props

    return (
      <div>
        <h2>{this.day}</h2>

        {stories.map((story) => {
          return <Story key={story.id} story={story} />
        })}
      </div>
    )
  }

  get day() {
    console.log(this.props.date)
    return moment.unix(this.props.date).calendar(null, {
      sameDay : '[Today]',
      lastDay : '[Yesterday]',
      lastWeek : 'MMMM D',
      sameElse : 'MMMM D'
    })
  }
}

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
  date: PropTypes.number.isRequired
}

export default StoryList
