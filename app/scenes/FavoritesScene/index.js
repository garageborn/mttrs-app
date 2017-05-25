import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { FavoritePublishersActions } from '../../actions/index'
import FavoritesTimelineScene from '../FavoritesTimelineScene'
import AddFavoritesScene from '../AddFavoritesScene'
import HeaderTitleContainer from '../../containers/HeaderTitleContainer'
import HeaderRight from '../../components/HeaderRight'
import headerStyles from '../../styles/Header'

class FavoritesScene extends Component {
  componentWillMount () {
    this.props.dispatch(FavoritePublishersActions.getPublishers())
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.isLoaded !== nextProps.isLoaded
  }

  render () {
    const { isLoaded, exists } = this.props
    if (!isLoaded) return null

    return exists ? <FavoritesTimelineScene /> : <AddFavoritesScene />
  }
}

FavoritesScene.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  exists: PropTypes.bool.isRequired
}

let mapStateToProps = (state, ownProps) => {
  return {
    isLoaded: state.FavoritePublishersReducer.isLoaded,
    exists: state.FavoritePublishersReducer.items.length > 0
  }
}

FavoritesScene.navigationOptions = props => {
  return {
    headerTitle: <HeaderTitleContainer {...props} />,
    headerRight: <HeaderRight />,
    ...headerStyles
  }
}


export default connect(mapStateToProps)(FavoritesScene)
