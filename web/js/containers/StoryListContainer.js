import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
// import * as HomeActions from 'actions/HomeActions'
import Story from 'components/Story'

class StoryListContainer extends Component {
  render() {
    const {stories, dispatch} = this.props
    if (stories.length === 0) {
      return (<div>...</div>)
    }
    return (
      <ol>
        {stories.map((story) => {
          return (
            <Story
              key={story.id}
              story={story}
              onClick={this.openStory.bind(this)}
              />
            )
        })}
      </ol>
    )
  }

  openStory(story) {
    console.log('on click', story)
  }
}

export default StoryListContainer
