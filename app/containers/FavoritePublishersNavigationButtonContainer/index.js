import React, { Component, PropTypes } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from '../../actions/index'
import FavoritePublishersNavigationButton from '../../components/FavoritePublishersNavigationButton'
import Touchable from '../../components/Touchable'

class FavoritePublishersNavigationButtonContainer extends Component {
  constructor () {
    super()
    this.onPress = this.onPress.bind(this)
  }

  render () {
    return (
      <Touchable onPress={() => this.onPress()}>
        <View>
          <FavoritePublishersNavigationButton />
        </View>
      </Touchable>
    )
  }

  onPress (category) {
    this.props.dispatch(NavigationActions.favoritePublishers())
  }
}

FavoritePublishersNavigationButtonContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(FavoritePublishersNavigationButtonContainer)
