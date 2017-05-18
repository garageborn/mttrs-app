import React, { Component, PropTypes } from 'react'
import withQuery from './index.gql'
import Timeline from '../Timeline'
import _isEqual from 'lodash/isEqual'

class CategoryTimeline extends Component {
  shouldComponentUpdate (nextProps) {
    if (!this.props.data) return true
    if (this.props.current) return true
    let loadingChanged = this.props.data.loading !== nextProps.data.loading
    let hasMoreChanged = this.props.data.hasMore !== nextProps.data.hasMore
    if (loadingChanged || hasMoreChanged) return true
    return !_isEqual(this.props.data.items, nextProps.data.items)
  }

  render () {
    return <Timeline type='category' data={this.props.data} />
  }
}

CategoryTimeline.propTypes = {
  data: PropTypes.object,
  current: PropTypes.bool.isRequired
}

export default withQuery(CategoryTimeline)
