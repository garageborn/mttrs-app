import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as CategoryActions from 'mttrs/app/actions/CategoryActions'
import * as StoryActions from 'mttrs/app/actions/StoryActions'
import * as FilterActions from 'mttrs/app/actions/FilterActions'
import HeaderContainer from 'mttrs/app/web/containers/HeaderContainer'
import FiltersContainer from 'mttrs/app/web/containers/FiltersContainer'
import StoryListContainer from 'mttrs/app/web/containers/StoryListContainer'

class Main extends Component {
  static fetchData({ dispatch, params, route }) {
    let categorySlug = params.slug
    let filter = route.filter

    return [
      dispatch(FilterActions.setFilter(filter)),
      dispatch(CategoryActions.getCategory(categorySlug)),
      HeaderContainer.fetchData.apply(this, arguments),
      StoryListContainer.fetchData.apply(this, arguments)
    ]
  }

  componentWillReceiveProps(nextProps) {
    let slugChanged = nextProps.params.slug !== this.props.params.slug
    let filterChanged = nextProps.filter !== this.props.filter
    if (slugChanged || filterChanged) this.constructor.fetchData(nextProps)
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <FiltersContainer />
        <StoryListContainer />
      </div>
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    filter: ownProps.route.filter
  }
}
export default connect(mapStateToProps)(Main)
