import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import TimelineContainer from '../TimelineContainer'

class FavoritesTimelineContainer extends Component {
  render () {
    const { data } = this.props
    return <TimelineContainer type='favorites' data={data} />
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
