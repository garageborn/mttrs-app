import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import FavoriteCategoriesDialogContainer from '../../containers/FavoriteCategoriesDialogContainer'
import FavoritesTimelineContainer from '../../containers/FavoritesTimelineContainer'
import FavoritePublishersSelectorContainer from '../../containers/FavoritePublishersSelectorContainer'
import EmptyFavoritesTimelineContainer from '../../containers/EmptyFavoritesTimelineContainer'
import { FavoritePublishersActions } from '../../actions/index'
import FavoritesTitleContainer from '../../containers/FavoritesTitleContainer'
import HeaderRight from '../../components/HeaderRight'
import headerStyles from '../../styles/Header'

class FavoritesTimelineScene extends Component {
  componentWillMount () {
    this.props.dispatch(FavoritePublishersActions.getPublishers())
  }

  render () {
    const { isLoaded, exists } = this.props
    if (!isLoaded) return this.renderLoading()
    if (!exists) return <EmptyFavoritesTimelineContainer />

    return (
      <View>
        <FavoriteCategoriesDialogContainer />
        <FavoritePublishersSelectorContainer />
        <FavoritesTimelineContainer />
      </View>
    )
  }

  renderLoading () {
    return (
      <View>
        <ActivityIndicator size='large' color='#AAA' />
      </View>
    )
  }
}

FavoritesTimelineScene.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  exists: PropTypes.bool.isRequired
}

let mapStateToProps = (state, ownProps) => {
  return {
    isLoaded: state.FavoritePublishersReducer.isLoaded,
    exists: state.FavoritePublishersReducer.items.length > 0
  }
}

FavoritesTimelineScene.navigationOptions = props => {
  return {
    headerTitle: <FavoritesTitleContainer type='favorites' {...props} />,
    headerRight: <HeaderRight />,
    ...headerStyles
  }
}

export default connect(mapStateToProps)(FavoritesTimelineScene)
