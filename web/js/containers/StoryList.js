import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as CategoryActions from 'actions/CategoryActions'
import * as StoryActions from 'actions/StoryActions'
import Header from 'containers/Header'
import Filters from 'containers/Filters'
import StoryList from 'components/StoryList'

class Category extends Component {
  componentDidMount() {
    this.fetchCategory(this.props)
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
    // let slugChanged = nextProps.params.slug !== this.props.params.slug
    // let filterChanged = nextProps.filter !== this.props.filter
    // if (slugChanged || filterChanged) this.fetchCategory(nextProps)
  }

  render() {
    const {category, stories} = this.props
    return (
      <div>
        <Header currentCategory={category}/>
        <Filters currentCategory={category}/>
        <StoryList stories={stories} onClick={this.openStory.bind(this)}/>
      </div>
    )
  }

  fetchCategory(props = this.props) {
    let categorySlug = props.params.slug
    let filter = props.filter

    if (categorySlug) this.props.dispatch(CategoryActions.getCategory(categorySlug))

    let options = {}
    if (categorySlug) options.category_slug = categorySlug
    if (filter) options[filter] = true
    this.props.dispatch(StoryActions.getStories(options))
  }

  openStory(story) {
    console.log('open story', story)
  }
}

let mapStateToProps = (state) => {
  return {
    category: state.CategoriesReducers.category,
    stories: state.StoryReducers.stories,
    filter: state.FilterReducers.filter
  }
}
export default connect(mapStateToProps)(Category)
