import React, { PropTypes, PureComponent } from 'react'
import { Image, View } from 'react-native'
import ToggleFavoriteContainer from '../../containers/ToggleFavoriteContainer'
import Touchable from '../../components/Touchable'
import PublisherListItem from '../../components/PublisherListItem'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import styles from './styles'
const activeImage = require('./assets/active.png')
const inactiveImage = require('./assets/inactive.png')

class FavoritePublishersItem extends PureComponent {
  constructor (props) {
    super(props)
    this.onPress = this.onPress.bind(this)
    this.handleFavoriteState = this.handleFavoriteState.bind(this)
    this.state = { active: true }
  }

  render () {
    const { publisher } = this.props

    return (
      <Touchable underlayColor={COLORLESS} onPress={this.onPress}>
        <View style={styles.container}>
          <PublisherListItem active={this.state.active} publisher={publisher} rightContent={this.rightContent} />
        </View>
      </Touchable>
    )
  }

  get rightContent () {
    return (
      <ToggleFavoriteContainer
        publisher={this.props.publisher}
        handleFavoriteState={this.handleFavoriteState}
        addComponent={this.addComponent}
        removeComponent={this.removeComponent}
      />
    )
  }

  get addComponent () {
    return (
      <View style={styles.rightContent}>
        <Image source={inactiveImage} />
      </View>
    )
  }

  get removeComponent () {
    return (
      <View style={styles.rightContent}>
        <Image source={activeImage} />
      </View>
    )
  }

  handleFavoriteState (isFavorite) {
    this.setState({ active: isFavorite })
  }

  onPress () {
    const { publisher, onPress } = this.props
    onPress(publisher)
  }

  get publisherName () {
    const { publisher } = this.props
    return publisher.display_name || publisher.name
  }
}

FavoritePublishersItem.propTypes = {
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    display_name: PropTypes.string,
    icon_id: PropTypes.string
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default FavoritePublishersItem
