import React, { PropTypes } from 'react'
import { View, Image, Text } from 'react-native'
import Touchable from '../Touchable'
import PublisherLogo from '../PublisherLogo'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import iconShare from './assets/icon-share.png'
import iconClose from './assets/icon-close.png'
import styles from './styles'

const HeaderWebview = ({ link, publisherLogo, share, close }) => {
  return (
    <View style={styles.container} elevation={2}>
      <View style={styles.header}>
        <View style={styles.publisher}>
          <PublisherLogo size={25} skin='dark' source={publisherLogo} />
          <View style={styles.publisherInfo}>
            <Text style={styles.title}>
              {link.publisher.display_name || link.publisher.name}
            </Text>
            <Text style={styles.storyTitle} numberOfLines={1}>{link.title}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <Touchable underlayColor={COLORLESS} onPress={share}>
            <View style={styles.iconHighlight}>
              <Image style={styles.iconShare} source={iconShare} />
            </View>
          </Touchable>
          <Touchable underlayColor={COLORLESS} onPress={close}>
            <View style={[styles.iconHighlight, styles.iconCloseHighlight]}>
              <Image style={styles.iconClose} source={iconClose} />
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
      name: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  publisherLogo: PropTypes.any.isRequired,
  share: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
}

export default HeaderWebview
