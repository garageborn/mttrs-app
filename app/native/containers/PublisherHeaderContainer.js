import React, { Component, PropTypes } from 'react'
import { View, TouchableHighlight, Image } from 'react-native'
import { connect } from 'react-redux'
import Header from '../components/Header'
import PublisherLogo from '../components/PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'
import { NavigationActions } from '@exponent/ex-navigation'
import { StorageActions } from '../actions/index'
import styles from '../styles/PublisherHeader'
import { DARK_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'

class PublisherHeaderContainer extends Component {
  getPublisherLogo() {
    const { publisher } = this.props
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return { uri }
  }

  get icon() {
    return <PublisherLogo skin='dark' source={this.getPublisherLogo()} />
  }

  render() {
    const { toggleMenu, publisher } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.left} />
        <Header
          toggleMenu={toggleMenu}
          title={publisher.name}
          icon={this.icon}
        />
      <TouchableHighlight
        underlayColor={DARK_TRANSPARENT_COLOR}
        style={styles.right}
        onPress={() => this.toggleFavoritePublisher(this.props.publisher)}>
          <Image source={this.favoritePublisherIcon}/>
        </TouchableHighlight>
      </View>
    )
  }

  get favoritePublisherIcon() {
    if (this.props.isFavorite) {
      return require('../assets/starActive.png')
    }

    return require('../assets/starInactive.png')
  }

  toggleFavoritePublisher() {
    if (this.props.isFavorite) {
      return this.removePublisherFromLocalStorage()
    }

    return this.addPublisherToLocalStorage()
  }

  addPublisherToLocalStorage() {
    const { dispatch, publisher } = this.props
    dispatch(StorageActions.addFavoritePublisher(publisher))
  }

  removePublisherFromLocalStorage() {
    const { dispatch, publisher } = this.props
    dispatch(StorageActions.removeFavoritePublisher(publisher))
  }
}

PublisherHeaderContainer.propTypes = {
  publisher: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  toggleMenu: PropTypes.func.isRequired
}

let mapStateToProps = (state, ownProps) => {
  let isFavorite = state.StorageReducer.favoritePublishers.items.indexOf(ownProps.publisher.id) !== -1

  return {
    isFavorite
  }
}

export default connect(mapStateToProps)(PublisherHeaderContainer)
