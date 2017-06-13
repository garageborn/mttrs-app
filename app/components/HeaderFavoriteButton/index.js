import React, { PropTypes } from 'react'
import { Image, View } from 'react-native'
import HeaderButton from '../HeaderButton'
import ToggleFavoriteContainer from '../../containers/ToggleFavoriteContainer'

const HeaderFavoriteButton = ({ publisher }) => {
  const addComponent = () => {
    const content = <Image source={require('./assets/inactive.png')} />
    return (
      <View>
        <HeaderButton content={content} />
      </View>
    )
  }

  const removeComponent = () => {
    const content = <Image source={require('./assets/active.png')} />
    return (
      <View>
        <HeaderButton content={content} />
      </View>
    )
  }

  return (
    <ToggleFavoriteContainer
      publisher={publisher}
      addComponent={addComponent()}
      removeComponent={removeComponent()}
    />
  )
}

HeaderFavoriteButton.propTypes = {
  publisher: PropTypes.shape({
    id: PropTypes.any.isRequired
  }).isRequired
}

export default HeaderFavoriteButton
