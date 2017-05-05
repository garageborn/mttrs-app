/* eslint-disable react/jsx-no-bind */
import React, { PropTypes } from 'react'
import { View, Image, Text } from 'react-native'
import Touchable from '../Touchable'
import TouchablePublisherLogo from '../TouchablePublisherLogo'
import ShareButtonContainer from '../../containers/ShareButtonContainer'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import iconShare from './assets/icon-share.png'
import iconClose from './assets/icon-close.png'
import styles from './styles'

const HeaderWebview = ({ link, publisherLogo, close, onPress, publisher }) => {
  return (
    <View style={styles.container} elevation={2}>
      <View style={styles.header}>
        <View style={styles.publisher}>
          <TouchablePublisherLogo
            size={25}
            skin='dark'
            source={publisherLogo}
            underlayColor={COLORLESS}
            onPress={() => onPress(publisher)}
          />
          <View style={styles.publisherInfo}>
            <Touchable underlayColor={COLORLESS} onPress={() => onPress(publisher)}>
              <Text style={styles.title}>
                {link.publisher.display_name || link.publisher.name}
              </Text>
            </Touchable>
            <Text style={styles.storyTitle} numberOfLines={1}>{link.title}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <ShareButtonContainer link={link}>
            <View style={styles.iconHighlight}>
              <Image source={iconShare} />
            </View>
          </ShareButtonContainer>
          <Touchable underlayColor={COLORLESS} onPress={close}>
            <View style={[styles.iconHighlight, styles.iconCloseHighlight]}>
              <Image source={iconClose} />
            </View>
          </Touchable>
        </View>
      </View>
    </View>
  )
}

HeaderWebview.propTypes = {
  link: PropTypes.shape({
    title: PropTypes.string.isRequired,
    publisher: PropTypes.shape({
      display_name: PropTypes.string,
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  publisherLogo: PropTypes.any.isRequired,
  close: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  publisher: PropTypes.object.isRequired
}

export default HeaderWebview
