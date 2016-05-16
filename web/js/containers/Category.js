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
    let slugChanged = nextProps.params.slug !== this.props.params.slug
    let filterChanged = nextProps.filter !== this.props.filter
    if (slugChanged || filterChanged) this.fetchCategory(nextProps.params.slug, nextProps.filter)
  }

  render() {
    const {category, stories} = this.props
    return (
      <div>
        <Header currentCategory={category}/>
        <StoryListContainer stories={stories}/>
      </div>
    )
  }

  fetchCategory(slug, filter) {
    this.props.dispatch(CategoryActions.getCategory(slug))
    this.props.dispatch(CategoryActions.getStories(slug, filter))
  }
}

let mapStateToProps = (state) => {
  return {
    ...state.CategoriesReducers,
    filter: state.FilterReducers.filter
  }
}
export default connect(mapStateToProps)(Category)
