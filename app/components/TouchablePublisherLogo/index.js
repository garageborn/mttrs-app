import React, { PropTypes } from 'react'
import { View } from 'react-native'
import Touchable from '../Touchable'
import PublisherLogo from '../PublisherLogo'

const TouchablePublisherLogo = ({
  size,
  skin,
  source,
  onPress,
  underlayColor
}) => (
  <Touchable onPress={onPress} underlayColor={underlayColor}>
    <View>
      <PublisherLogo size={size} skin={skin} source={source} />
    </View>
  </Touchable>
)

TouchablePublisherLogo.propTypes = {
  source: PropTypes.any,
  skin: PropTypes.string,
  size: PropTypes.number,
  onPress: PropTypes.func.isRequired,
  underlayColor: PropTypes.string
}

export default TouchablePublisherLogo
