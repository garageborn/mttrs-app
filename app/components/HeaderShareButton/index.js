import React, { PropTypes } from 'react'
import { Image, View } from 'react-native'
import ShareButtonContainer from '../../containers/ShareButtonContainer'
import styles from '../HeaderButton/styles'

const HeaderShareButton = ({ link }) => (
  <ShareButtonContainer link={link}>
    <View style={styles.container}>
      <Image source={require('./assets/image.png')} />
    </View>
  </ShareButtonContainer>
)

HeaderShareButton.propTypes = {
  link: PropTypes.object.isRequired
}

export default HeaderShareButton
