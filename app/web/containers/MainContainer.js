import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as CategoryActions from '../../actions/CategoryActions'
import * as CurrentCategoryActions from '../../actions/CurrentCategoryActions'
import * as PublishersActions from '../../actions/PublishersActions'
import HeaderContainer from './HeaderContainer'
import TimelineContainer from './TimelineContainer'

class MainContainer extends Component {
  static fetchData({ dispatch, params, route }) {
    let categorySlug = route.categorySlug
    let filter = route.filter

    return [
      dispatch(CurrentCategoryActions.getCategory(categorySlug)),
      dispatch(CategoryActions.getCategories()),
      dispatch(PublishersActions.getPublishers()),
      TimelineContainer.fetchData.apply(this, arguments)
    ]
  }

  componentWillReceiveProps(nextProps) {
    let categorySlugChanged = nextProps.categorySlug !== this.props.categorySlug
    let publisherSlugChanged = nextProps.publisherSlug !== this.props.publisherSlug
    let filterChanged = nextProps.filter !== this.props.filter
    if (categorySlugChanged || publisherSlugChanged || filterChanged)
      this.constructor.fetchData(nextProps)
  }

  render() {
    return (
      <div>
        <HeaderContainer />
        <TimelineContainer />
      </div>
    )
  }
}

let mapStateToProps = (state, ownProps) => {
  return {
    categorySlug: ownProps.route.categorySlug,
    filter: ownProps.route.filter
  }
}
export default connect(mapStateToProps)(MainContainer)
