import React, { PropTypes } from 'react'
import { View, Text } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import Touchable from '../../../Touchable'
import PaginatorDots from '../PaginatorDots'
import styles from './styles'

const messages = defineMessages({
  skip: {
    id: 'paginator.skip'
  },

  start: {
    id: 'paginator.start'
  }
})

const Paginator = ({ pages, currentPage, onEnd, intl }) => {
  let buttonSkip = intl.formatMessage(messages.skip)
  let buttonStart = intl.formatMessage(messages.start)

  return (
    <View style={styles.container}>
      <View style={styles.buttonLeft}>
        <Touchable onPress={onEnd}>
          <View>
            <Text style={styles.skip}>{buttonSkip.toUpperCase()}</Text>
          </View>
        </Touchable>
      </View>
      <PaginatorDots pages={pages} currentPage={currentPage} />
      <View style={styles.buttonRight}>
        {currentPage + 1 === pages &&
          <Touchable onPress={onEnd}>
            <View>
              <Text style={styles.start}>{buttonStart.toUpperCase()}</Text>
            </View>
          </Touchable>
        }
      </View>
    </View>
  )
}

Paginator.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onEnd: PropTypes.func.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired
  }).isRequired
}

export default injectIntl(Paginator)
