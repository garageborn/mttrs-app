import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import _isEqual from 'lodash/isEqual'
import AnalyticsContainer from '../../containers/AnalyticsContainer'
import FavoritesTimelineContainer from '../../containers/FavoritesTimelineContainer'
import FavoritePublishersSelectorContainer from '../../containers/FavoritePublishersSelectorContainer'
import EmptyFavoritesTimelineContainer from '../../containers/EmptyFavoritesTimelineContainer'
import { FavoritePublishersActions } from '../../actions/index'
import FavoritesTitleContainer from '../../containers/FavoritesTitleContainer'
import FavoritesHeaderRight from '../../components/FavoritesHeaderRight'
import headerStyles from '../../styles/Header'
import updateCurrentScene from '../../common/utils/updateCurrentScene'

class FavoritesScene extends Component {
  constructor () {
    super()
    updateCurrentScene(this, 'favorites')
  }

  componentWillMount () {
    this.props.dispatch(FavoritePublishersActions.getPublishers())
  }

  shouldComponentUpdate (nextProps) {
    const isLoadedChanged = this.props.favoritePublishers.isLoaded !== nextProps.favoritePublishers.isLoaded
    const itemsChanged = !_isEqual(this.props.favoritePublishers.items, nextProps.favoritePublishers.items)
    return isLoadedChanged || itemsChanged
  }

  render () {
    console.log('FavoritesScene.render')
    return (
      <AnalyticsContainer scene={'favorites'} screenName={'/favorites'}>
        {this.renderFavorites()}
      </AnalyticsContainer>
    )
  }

  renderLoading () {
    return (
      <View>
        <ActivityIndicator size='large' color='#AAA' />
      </View>
    )
  }

  renderFavorites () {
    const { isLoaded, items } = this.props.favoritePublishers
    if (!isLoaded) return this.renderLoading()
    if (!items.length) return <EmptyFavoritesTimelineContainer />
    return (
      <View>
        <FavoritePublishersSelectorContainer publisherIds={items} />
        <FavoritesTimelineContainer publisherIds={items} />
      </View>
    )
  }
}

FavoritesScene.propTypes = {
  dispatch: PropTypes.func.isRequired,
  favoritePublishers: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired
  }).isRequired
}

const mapStateToProps = (state, ownProps) => {
  return {
    favoritePublishers: {
      isLoaded: state.FavoritePublishersReducer.isLoaded,
      items: state.FavoritePublishersReducer.items
    }
  }
}

FavoritesScene.navigationOptions = props => {
  return {
    headerTitle: <FavoritesTitleContainer {...props} />,
    headerRight: <FavoritesHeaderRight />,
    ...headerStyles
  }
}

export default connect(mapStateToProps)(FavoritesScene)
