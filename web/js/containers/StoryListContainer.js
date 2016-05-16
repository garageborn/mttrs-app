import React, {Component} from 'react'
import Story from 'components/Story'
import Filters from 'containers/Filters'

class StoryListContainer extends Component {
  render() {
    const {stories, dispatch} = this.props
    if (stories.length === 0) {
      return (<div className="loading">Hang on...</div>)
    }
    return (
      <main>
        <Filters currentCategory={this.props.currentCategory}/>

        {stories.map((story) => {
          return (
            <Story
              key={story.id}
              story={story}
              onClick={this.openStory.bind(this)}
              />
            )
        })}
      </main>
    )
  }

  openStory(story) {
    console.log('on click', story)
  }
}

export default StoryListContainer
