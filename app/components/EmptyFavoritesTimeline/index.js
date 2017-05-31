import React, { Component, PropTypes } from 'react'
import { Image, Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Button from '../Button'
import Heading from '../Heading'
import styles, { headingColor } from './styles'

const starIcon = require('./assets/star.png')
const bg = require('./assets/bg.png')

const messages = defineMessages({
  button: { id: 'emptyFavoritesTimeline.button' },
  heading: { id: 'emptyFavoritesTimeline.heading' }
})

class EmptyFavoritesTimeline extends Component {
  render () {
    const { intl, onPress } = this.props

    return (
      <View style={styles.container}>
        <Image style={styles.bg} source={bg} />
        <View style={styles.content}>
          <View style={styles.headingContainer}>
            <Heading textStyle={styles.textStyle} size='small' color={headingColor}>
              {intl.formatMessage(messages.heading)}
            </Heading>
          </View>
          <Image style={styles.icon} source={starIcon} />
          <View style={styles.buttonContainer}>
            <Button
              background='danger'
              content={intl.formatMessage(messages.button)}
              onPress={onPress}
              size='regular'
            />
          </View>
        </View>
      </View>
    )
  }
}

EmptyFavoritesTimeline.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired,
  onPress: PropTypes.func.isRequired
}

export default injectIntl(EmptyFavoritesTimeline)
