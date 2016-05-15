import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as CategoryActions from 'actions/CategoryActions'
import Header from 'containers/Header'
import StoryListContainer from 'containers/StoryListContainer'

class Category extends Component {
  componentDidMount() {
    this.fetchCategory(this.props.params.slug)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.slug !== this.props.params.slug) {
      this.fetchCategory(nextProps.params.slug)
    }
  }

  render() {
    const {category, stories} = this.props
    return (
      <main>
        <Header currentCategory={category}/>
        <StoryListContainer stories={stories}/>
      </main>
    )
  }

  fetchCategory(slug) {
    this.props.dispatch(CategoryActions.getCategory(slug))
    this.props.dispatch(CategoryActions.getStories(slug))
  }
}

export default connect(state => state.CategoriesReducers)(Category)
