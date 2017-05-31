import React, { PropTypes, PureComponent } from 'react'
import { View } from 'react-native'
import { withNativeAd } from 'react-native-fbads'
import _isEmpty from 'lodash/isEmpty'
import AdMain from './components/AdMain'
import AdImage from './components/AdImage'
import AdFooter from './components/AdFooter'
import styles from './styles'

class TimelineAd extends PureComponent {
  render () {
    const { nativeAd } = this.props
    if (_isEmpty(nativeAd)) return null

    const { callToActionText, coverImage, description, icon, subtitle, title } = nativeAd
    console.log(title)
    return (
      <View style={styles.container}>
        <AdMain title={title} subtitle={subtitle} icon={icon} />
        <AdImage source={coverImage} />
        <AdFooter description={description} buttonText={callToActionText} />
      </View>
    )
  }
}

TimelineAd.propTypes = {
  nativeAd: PropTypes.shape({
    callToActionText: PropTypes.string,
    coverImage: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string
  })
}

export default withNativeAd(TimelineAd)
