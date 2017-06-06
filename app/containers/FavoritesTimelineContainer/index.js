import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import FavoritesTimeline from '../../components/FavoritesTimeline'

class FavoritesTimelineContainer extends Component {
  render () {
    const { data } = this.props
    return <FavoritesTimeline data={data} />
  }
}

FavoritesTimelineContainer.propTypes = {
  data: PropTypes.any.isRequired,
  publisherIds: PropTypes.array.isRequired,
  selectedCategory: PropTypes.any
}

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.FavoritesReducer.selectedCategory
  }
}

const FavoritesTimelineContainerWithData = withQuery(FavoritesTimelineContainer)
export default connect(mapStateToProps)(FavoritesTimelineContainerWithData)
