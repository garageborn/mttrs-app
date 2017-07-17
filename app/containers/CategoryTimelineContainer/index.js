import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import CategoryTimeline from '../../components/CategoryTimeline'
import updateCurrentScene from '../../common/utils/updateCurrentScene'

class CategoryTimelineContainer extends Component {
  constructor (props) {
    super(props)
    updateCurrentScene(this, props.category.slug)
  }

  render () {
    const { data } = this.props
    return <CategoryTimeline data={data} />
  }
}

CategoryTimelineContainer.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.any.isRequired,
    slug: PropTypes.string.isRequired
  }).isRequired,
  data: PropTypes.object.isRequired
}

const CategoryTimelineContainerWithData = withQuery(CategoryTimelineContainer)
export default connect()(CategoryTimelineContainerWithData)
