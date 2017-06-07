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
    const { data, selectedCategory } = this.props
    if (data.loading || !data.publishers) return null
    return (
      <FavoritePublishersSelector
        publishers={data.publishers}
        openPublisher={this.openPublisher}
        selectedCategory={selectedCategory}
      />
    )
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

const mapStateToProps = (state) => {
  return {
    selectedCategory: state.FavoritesReducer.selectedCategory
  }
}

const FavoritePublishersSelectorContainerWithData = withQuery(FavoritePublishersSelectorContainer)
export default connect(mapStateToProps)(FavoritePublishersSelectorContainerWithData)
