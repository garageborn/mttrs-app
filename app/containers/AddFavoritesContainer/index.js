import React, { Component, PropTypes } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import AddFavoritesHeading from '../../components/AddFavoritesHeading'
import AddFavoritesFooter from '../../components/AddFavoritesFooter'
import AddFavoritesListContainer from '../AddFavoritesListContainer'
import updateCurrentScene from '../../common/utils/updateCurrentScene'

class AddFavoritesContainer extends Component {
  constructor () {
    super()
    this.openFavoritesTimeline = this.openFavoritesTimeline.bind(this)
    updateCurrentScene(this, 'addFavorites')
  }

  shouldComponentUpdate (nextProps) {
    return this.props.favoritePublishers.isComplete !== nextProps.favoritePublishers.isComplete
  }

  render () {
    const { isComplete } = this.props.favoritePublishers
    const onPress = this.openFavoritesTimeline

    return (
      <ScrollView>
        <AddFavoritesHeading openFavoritesTimeline={onPress} isComplete={isComplete} />
        <AddFavoritesListContainer />
        <AddFavoritesFooter onPress={onPress} isComplete={isComplete} />
      </ScrollView>
    )
  }

  openFavoritesTimeline () {
    const { navigation } = this.props
    navigation.goBack()
  }
}

AddFavoritesContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  favoritePublishers: PropTypes.shape({
    isComplete: PropTypes.bool.isRequired
  }).isRequired,
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    favoritePublishers: {
      isComplete: state.FavoritePublishersReducer.items.length > 0
    }
  }
}

export default connect(mapStateToProps)(AddFavoritesContainer)
