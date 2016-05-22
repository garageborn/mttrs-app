import React, {Component, PropTypes} from 'react'
import Story from 'components/Story'

class StoryList extends Component {
  render() {
    const {stories} = this.props
    if (stories.length === 0) {
      return (<div className='loading'>Hang on...</div>)
    }

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
  onClick: PropTypes.func.isRequired
}

export default StoryList
