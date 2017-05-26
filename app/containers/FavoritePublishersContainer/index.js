import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import FavoritePublishersHeading from '../../components/FavoritePublishersHeading'
import FavoritePublishersListContainer from '../FavoritePublishersListContainer'
import { FavoritePublishersActions, NavigationActions } from '../../actions/index'

class FavoritePublishersContainer extends Component {
  constructor () {
    super()
    this.handleComplete = this.handleComplete.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(FavoritePublishersActions.getPublishers())
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.favoritePublishers.isLoaded !== nextProps.favoritePublishers.isLoaded
  }

  render () {
    return (
      <View>
        <FavoritePublishersHeading handleComplete={this.handleComplete} />
        {this.renderPublisherList()}
      </View>
    )
  }

  renderPublisherList () {
    const { favoritePublishers } = this.props
    if (!favoritePublishers.isLoaded) return this.renderLoading()
    return <FavoritePublishersListContainer publisherIds={favoritePublishers.items} />
  }

  renderLoading () {
    return (
      <View>
        <ActivityIndicator size='large' color='#AAA' />
      </View>
    )
  }

  handleComplete () {
    const { dispatch, favoritePublishers } = this.props
    if (favoritePublishers.items.length) {
      dispatch(NavigationActions.favoritesTimeline())
    } else {
      dispatch(NavigationActions.addFavorites())
    }
  }
}

FavoritePublishersContainer.propTypes = {
  favoritePublishers: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired
  }).isRequired
}

let mapStateToProps = (state) => {
  return {
    favoritePublishers: {
      isLoaded: state.FavoritePublishersReducer.isLoaded,
      items: state.FavoritePublishersReducer.items
    }
  }
}

export default connect(mapStateToProps)(FavoritePublishersContainer)
