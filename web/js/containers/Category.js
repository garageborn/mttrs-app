import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as CategoryActions from 'actions/CategoryActions'
import Header from 'containers/Header'
import StoryListContainer from 'containers/StoryListContainer'

class Category extends Component {
  componentDidMount() {
    this.fetchStories(this.props.params.slug)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.slug !== this.props.params.slug) {
      this.fetchStories(nextProps.params.slug)
    }
  }

  render() {
    const {stories} = this.props
    return (
      <main>
        <Header />
        <StoryListContainer stories={stories}/>
      </main>
    )
  }

  fetchStories(slug) {
    this.props.dispatch(CategoryActions.getStories(slug))
  }
}

export default connect(state => state.CategoriesReducers)(Category)
