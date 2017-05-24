import React, { Component } from 'react'
import CategoryTimelineContainer from '../../containers/CategoryTimelineContainer'

class CategoryTimelineScene extends Component {
  render () {
    const categorySlug = this.props.navigation.state.routeName
    return <CategoryTimelineContainer categorySlug={categorySlug} />
  }
}

export default CategoryTimelineScene
