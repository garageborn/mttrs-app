import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import FavoritePublishersManager from '../../components/FavoritePublishersManager'
import FavoritePublishersListContainer from '../FavoritePublishersListContainer'
import { FavoritePublishersActions, NavigationActions } from '../../actions/index'
import { isCurrentRoute } from '../../navigators/AppNavigator'

class FavoritePublishersContainer extends Component {
  constructor () {
    super()
    this.handleComplete = this.handleComplete.bind(this)
    this.handleButtonPress = this.handleButtonPress.bind(this)
  }

  componentWillMount () {
    this.props.dispatch(FavoritePublishersActions.getPublishers())
  }

  shouldComponentUpdate (nextProps) {
    if (!nextProps.isCurrentRoute) return false
    if (!this.props.isCurrentRoute && nextProps.isCurrentRoute) return true
    return this.props.favoritePublishers.isLoaded !== nextProps.favoritePublishers.isLoaded
  }

  render () {
    return (
      <FavoritePublishersManager
        handleButtonPress={this.handleButtonPress}
        handleComplete={this.handleComplete}
      >
        {this.renderPublisherList()}
      </FavoritePublishersManager>
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

  handleButtonPress () {
    this.props.dispatch(NavigationActions.addFavorites())
  }

  handleComplete () {
    const { navigation } = this.props
    navigation.goBack()
  }
}

FavoritePublishersContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  favoritePublishers: PropTypes.shape({
    isLoaded: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired
  }).isRequired,
  isCurrentRoute: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

let mapStateToProps = (state) => {
  return {
    isCurrentRoute: isCurrentRoute(state.nav, 'favoritePublishers'),
    favoritePublishers: {
      isLoaded: state.FavoritePublishersReducer.isLoaded,
      items: state.FavoritePublishersReducer.items
    }
  }
}

export default connect(mapStateToProps)(FavoritePublishersContainer)
