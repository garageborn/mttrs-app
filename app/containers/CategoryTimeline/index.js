import React, { Component, PropTypes } from 'react'
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
    return <Timeline type='category' data={this.props.data} />
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
  model: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }).isRequired
}

const CategoryTimelineWithData = withQuery(CategoryTimeline)
export default withNavigation(CategoryTimelineWithData)
