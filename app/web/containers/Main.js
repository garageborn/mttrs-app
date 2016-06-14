import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as CategoryActions from 'mttrs/app/actions/CategoryActions'
import HeaderContainer from 'mttrs/app/web/containers/HeaderContainer'
import TimelineContainer from 'mttrs/app/web/containers/TimelineContainer'

class Main extends Component {
  static fetchData({ dispatch, params, route }) {
    let categorySlug = route.categorySlug
    let filter = route.filter

    return [
      dispatch(CategoryActions.getCategory(categorySlug)),
      HeaderContainer.fetchData.apply(this, arguments),
      TimelineContainer.fetchData.apply(this, arguments)
    ]
  }

  componentWillReceiveProps(nextProps) {
    let slugChanged = nextProps.categorySlug !== this.props.categorySlug
    let filterChanged = nextProps.filter !== this.props.filter
    if (slugChanged || filterChanged) this.constructor.fetchData(nextProps)
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
export default connect(mapStateToProps)(Main)
