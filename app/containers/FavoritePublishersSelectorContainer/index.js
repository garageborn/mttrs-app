import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import withQuery from './index.gql'
import FavoritePublishersSelector from '../../components/FavoritePublishersSelector'
import { NavigationActions } from '../../actions/index'

class FavoritePublishersSelectorContainer extends Component {
  constructor () {
    super()
    this.openPublisher = this.openPublisher.bind(this)
  }

  render () {
    const { loading, publishers } = this.props.data
    if (loading || !publishers) return null
    return <FavoritePublishersSelector publishers={publishers} openPublisher={this.openPublisher} />
  }

  openPublisher (publisher) {
    const { dispatch } = this.props
    dispatch(NavigationActions.publisher(publisher))
  }
}

FavoritePublishersSelectorContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    publishers: PropTypes.any
  }),
  publisherIds: PropTypes.array.isRequired,
  selectedCategory: PropTypes.any
}

let mapStateToProps = (state) => {
  return {
    selectedCategory: state.FavoritesReducer.selectedCategory
  }
}

const FavoritePublishersSelectorContainerWithData = withQuery(FavoritePublishersSelectorContainer)
export default connect(mapStateToProps)(FavoritePublishersSelectorContainerWithData)
