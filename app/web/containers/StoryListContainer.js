import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as CategoryActions from 'mttrs/app/actions/CategoryActions'
import * as StoryActions from 'mttrs/app/actions/StoryActions'
import StoryList from 'mttrs/app/web/components/StoryList'

class StoryListContainer extends Component {
  static fetchData({ dispatch, route }) {
    let categorySlug = route.categorySlug
    let filter = route.filter

    let options = {}
    if (categorySlug) options.category_slug = categorySlug
    if (filter) options[filter] = true

    return dispatch(StoryActions.getStories(options))
  }

  render() {
    const {stories, isFetching} = this.props
    return (
      <StoryList
        stories={stories}
        isFetching={isFetching}
        onClick={this.openStory.bind(this)}
        />
    )
  }

  openStory(story) {
    console.log('open story', story)
  }
}

export default connect(state => state.StoryReducers)(StoryListContainer)
