import React, { PropTypes, PureComponent } from 'react'
import { View } from 'react-native'
import PublisherLogo from '../PublisherLogo'
import Touchable from '../Touchable'
import styles from './styles'

class FavoritePublisherSelector extends PureComponent {
  render () {
    const { onPress, publisher } = this.props

    return (
      <Touchable onPress={() => onPress(publisher)} underlayColor={'rgba(0,0,0,.1)'}>
        <View style={styles.container}>
          <PublisherLogo size={30} source={{ uri: publisher.icon.small }} />
        </View>
      </Touchable>
    )
  }
}

FavoritePublisherSelector.propTypes = {
  onPress: PropTypes.func.isRequired,
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired,
    image: PropTypes.shape({
      small: PropTypes.string
    })
  }).isRequired
}

export default FavoritePublisherSelector
