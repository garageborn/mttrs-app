import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as CategoryActions from 'mttrs/app/actions/CategoryActions'
import * as StoryActions from 'mttrs/app/actions/StoryActions'
import Header from 'mttrs/app/web/containers/Header'
import Filters from 'mttrs/app/web/containers/Filters'
import StoryList from 'mttrs/app/web/components/StoryList'

class StoryListContainer extends Component {
  componentDidMount() {
    this.fetchCategory(this.props)
  }

  componentWillReceiveProps(nextProps) {
    let slugChanged = nextProps.params.slug !== this.props.params.slug
    let filterChanged = nextProps.filter !== this.props.filter
    if (slugChanged || filterChanged) this.fetchCategory(nextProps)
  }

  render() {
    const {category, stories, filter} = this.props
    return (
      <div>
        <Header currentCategory={category} currentFilter={filter}/>
        <Filters currentCategory={category} currentFilter={filter}/>
        <StoryList stories={stories} onClick={this.openStory.bind(this)}/>
      </div>
    )
  }

  fetchCategory(props = this.props) {
    let categorySlug = props.params.slug
    let filter = props.filter

    this.props.dispatch(CategoryActions.getCategory(categorySlug))

    let options = {}
    if (categorySlug) options.category_slug = categorySlug
    if (filter) options[filter] = true
    this.props.dispatch(StoryActions.getStories(options))
  }

  openStory(story) {
    console.log('open story', story)
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    category: state.CategoriesReducers.category,
    stories: state.StoryReducers.stories,
    filter: ownProps.route.filter
  }
}
export default connect(mapStateToProps)(StoryListContainer)
