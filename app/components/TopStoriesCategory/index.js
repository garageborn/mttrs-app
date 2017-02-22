import React, { PropTypes } from 'react'
import { View, Image, Text } from 'react-native'
import Touchable from '../Touchable'
import { injectIntl, defineMessages } from 'react-intl'
import LinearGradient from 'react-native-linear-gradient'
import { DARK_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'
import cover from './assets/highlights.png'
import styles from './styles'

const messages = defineMessages({
  topStories: {
    id: 'header.topStories',
    defaultMessage: 'Top Stories'
  }
})

const TopStoriesCategory = ({ intl, openHome }) => {
  return (
    <View style={styles.container}>
      <Touchable underlayColor={DARK_TRANSPARENT_COLOR} onPress={openHome}>
        <View style={styles.topStories} shadowOffset={{width: 0, height: 2}} shadowColor={'rgba(0, 0, 0, 1)'} shadowOpacity={0.5} elevation={1}>
          <Image style={styles.image} source={cover}>
            <LinearGradient
              colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.5)']}
              style={styles.gradient}
            >
              <Text style={styles.name}>{intl.formatMessage(messages.topStories)}</Text>
              <View style={[styles.borderBottom, {backgroundColor: '#FF5607'}]} />
            </LinearGradient>
          </Image>
        </View>
      </Touchable>
    </View>
  )
}

TopStoriesCategory.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  openHome: PropTypes.func.isRequired
}

export default injectIntl(TopStoriesCategory)
