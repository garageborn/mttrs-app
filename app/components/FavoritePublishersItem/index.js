import React, { PropTypes, Component } from 'react'
import { View, Text } from 'react-native'
import ToggleFavoriteContainer from '../../containers/ToggleFavoriteContainer'
import PublisherLogo from '../PublisherLogo'
import * as cloudinary from '../../common/utils/Cloudinary'
import Touchable from '../../components/Touchable'
import { COLORLESS } from '../../constants/TouchUnderlayColors'

class FavoritePublishersItem extends Component {
  constructor (props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }

  render () {
    const { publisher } = this.props

    return (
      <View>
        <Touchable underlayColor={COLORLESS} onPress={this.onPress}>
          <View>
            {this.renderIcon()}
            <Text>{this.publisherName}</Text>
          </View>
        </Touchable>
        <ToggleFavoriteContainer
          publisher={publisher}
          addComponent={this.addPublisherComponent()}
          removeComponent={this.removePublisherComponent()}
        />
      </View>
    )
  }

  addPublisherComponent () {
    return <Text>Add</Text>
  }

  removePublisherComponent () {
    return <Text>Remove</Text>
  }

  renderIcon () {
    let { publisher } = this.props
    if (!publisher.icon_id) return
    const uri = cloudinary.id(publisher.icon_id, { secure: true })
    return <PublisherLogo size={30} source={{ uri }} />
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
