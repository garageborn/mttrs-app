import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'

class CategoryTimelineContainer extends Component {
  render () {
    const { data } = this.props
    return <TimelineContainer data={data} />
  }
}

CategoryTimelineContainer.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.any.isRequired,
    slug: PropTypes.string.isRequired
  }).isRequired,
  data: PropTypes.object.isRequired
}

let mapStateToProps = (state, ownProps) => {
  return {
    selectedTag: state.CategoriesReducer.selectedTags[ownProps.category.id]
  }
}

const CategoryTimelineContainerWithData = withQuery(CategoryTimelineContainer)
export default connect(mapStateToProps)(CategoryTimelineContainerWithData)
