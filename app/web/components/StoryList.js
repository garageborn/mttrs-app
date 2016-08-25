import React, {Component, PropTypes} from 'react'
import Story from './Story'
import moment from '../../common/utils/Moment'
import ParseDate from '../../common/utils/ParseDate'

class StoryList extends Component {
  render() {
    let stories = this.props.stories.map((story) => {
      return <Story key={story.id} story={story} />
    })

    return (
      <div>
        <h2>{ParseDate(this.props.date)}</h2>
        {stories}
      </div>
    )
  }
}

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
  date: PropTypes.any.isRequired
}

export default StoryList
