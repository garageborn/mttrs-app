import React, { PropTypes, Component } from 'react'
import { Image, Text, View } from 'react-native'
import { withNativeAd } from 'react-native-fbads'
import _isEmpty from 'lodash/isEmpty'
import styles from './styles'
import Button from '../Button'

class TimelineAd extends Component {
  render () {
    const { nativeAd } = this.props
    if (_isEmpty(nativeAd)) return

    const { callToActionText, coverImage, description, icon, subtitle, title } = nativeAd

    return (
      <View>
        <Image source={{uri: icon}}/>
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
        <Image source={{uri: coverImage}}/>
        <Text>{description}</Text>
        <Button onPress={() => {}} skin={styles.button}>
          <Text>{callToActionText}</Text>
        </Button>
      </View>
    )
  }
}

TimelineAd.propTypes = {
}

export default withNativeAd(TimelineAd)
