import React, { Component, PropTypes } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'
import FavoritePublishersManager from '../../components/FavoritePublishersManager'
import FavoritePublishersListContainer from '../FavoritePublishersListContainer'
import FavoritePublishersManagerButton from '../../components/FavoritePublishersManagerButton'
import { FavoritePublishersActions, NavigationActions } from '../../actions/index'
import updateCurrentScene from '../../common/utils/updateCurrentScene'

class FavoritePublishersContainer extends Component {
  constructor () {
    super()
    this.handleComplete = this.handleComplete.bind(this)
    this.handleButtonPress = this.handleButtonPress.bind(this)
    updateCurrentScene(this, 'favoritePublishers')
  }

  componentWillMount () {
    this.props.dispatch(FavoritePublishersActions.getPublishers())
  }

  shouldComponentUpdate (nextProps) {
    return this.props.favoritePublishers.isLoaded !== nextProps.favoritePublishers.isLoaded
  }

  render () {
    return (
      <FavoritePublishersManager handleComplete={this.handleComplete} >
        {this.renderPublisherList()}
        <FavoritePublishersManagerButton onPress={this.handleButtonPress} />
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
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    favoritePublishers: {
      isLoaded: state.FavoritePublishersReducer.isLoaded,
      items: state.FavoritePublishersReducer.items
    }
  }
}

export default connect(mapStateToProps)(FavoritePublishersContainer)
