import React, { PropTypes } from 'react'
import { View, Image, TouchableHighlight, Text } from 'react-native'
import PublisherLogo from '../PublisherLogo'
import { COLORLESS } from '../../constants/TouchUnderlayColors'
import styles from './styles'

const HeaderWebview = ({ link, publisherLogo, share, close }) => {
  return (
    <View style={styles.header} shadowOffset={{width: 0, height: 5}} shadowColor={'rgba(0, 0, 0, .6)'} shadowOpacity={0.1} elevation={1}>
      <View style={styles.publisher}>
        <PublisherLogo size={25} skin='dark' source={publisherLogo} />
        <View style={styles.publisherInfo}>
          <Text style={styles.title}>{link.publisher.name}</Text>
          <Text style={styles.storyTitle} numberOfLines={1}>{link.title}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableHighlight style={styles.iconHighlight} underlayColor={COLORLESS} onPress={share}>
          <Image style={styles.iconShare} source={require('../../assets/icons/icon-share.png')} />
        </TouchableHighlight>
        <TouchableHighlight style={[styles.iconHighlight, styles.iconCloseHighlight]} underlayColor={COLORLESS} onPress={close}>
          <Image style={styles.iconClose} source={require('../../assets/icons/icon-close.png')} />
        </TouchableHighlight>
      </View>
    </View>
  )
}

HeaderWebview.propTypes = {
  link: PropTypes.object.isRequired,
  publisherLogo: PropTypes.any.isRequired,
  share: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired
}

export default HeaderWebview
