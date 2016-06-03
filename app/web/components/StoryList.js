import React, {Component, PropTypes} from 'react'
import Story from 'mttrs/app/web/components/Story'

class StoryList extends Component {
  render() {
    const {stories, isFetching} = this.props
    if (isFetching) return (<div className='loading'>Hang on...</div>)

    return (
      <main>
        {stories.map((story) => { return this.renderStory(story) })}
      </main>
    )
  }

  renderStory(story) {
    return (
      <Story
        key={story.id}
        story={story}
        onClick={this.props.onClick.bind(this)}
        />
    )
  }
}

StoryList.propTypes = {
  stories: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

export default StoryList
