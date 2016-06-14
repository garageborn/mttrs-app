import React, {Component, PropTypes} from 'react'
import StoryList from 'mttrs/app/web/components/StoryList'

class Timeline extends Component {
  render() {
    const {items, isFetching} = this.props
    if (isFetching) return (<div className='loading'>Hang on...</div>)

    return (
      <main>
        {items.map((item) => {
          return <StoryList key={item.date} date={item.date} stories={item.stories} />
        })}
      </main>
    )
  }
}

Timeline.propTypes = {
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default Timeline
