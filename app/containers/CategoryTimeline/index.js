import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withNavigation } from '@exponent/ex-navigation'
import withQuery from './index.gql'
import Timeline from '../Timeline'
import _isEqual from 'lodash/isEqual'
import { parse } from '../../common/utils/Parser'

class CategoryTimeline extends Component {
  shouldComponentUpdate (nextProps) {
    if (this.isActiveTimeline(nextProps)) return true
    let loadingChanged = this.props.data.loading !== nextProps.data.loading
    let hasMoreChanged = this.props.data.hasMore !== nextProps.data.hasMore
    if (loadingChanged || hasMoreChanged) return true
    return !_isEqual(this.props.data.items, nextProps.data.items)
  }

  render () {
    return <Timeline data={this.props.data} />
  }

  isActiveTimeline (props) {
    let currentRouteOnArray = props.navigationState.routes.find((item) =>
      item.model === props.model
    )
    return parse(currentRouteOnArray.key) === props.navigationState.index
  }
}

CategoryTimeline.propTypes = {
  data: PropTypes.object,
  isActiveRoute: PropTypes.bool
}

const mapStateToProps = (state, ownProps) => {
  const currentRoute = ownProps.navigator.getCurrentRoute()
  return {
    isActiveRoute: currentRoute.routeName === 'timeline'
  }
}

const CategoryTimelineWithData = withQuery(CategoryTimeline)
const CategoryWithRedux = connect(mapStateToProps)(CategoryTimelineWithData)
export default withNavigation(CategoryWithRedux)
