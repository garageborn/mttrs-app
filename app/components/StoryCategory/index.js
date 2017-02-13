import React, { PropTypes } from 'react'
import { Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import styles from './styles'

const messages = defineMessages({
  in: {
    id: 'storyCategory.in'
  }
})

const StoryCategory = ({intl, category}) => {
  const text = intl.formatMessage(messages.in)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {text} <Text style={[styles.category, { color: category.color }]}>
          {category.name.toUpperCase()}
        </Text>
      </Text>
    </View>

  )
}

StoryCategory.propTypes = {
  category: PropTypes.object,
  intl: PropTypes.object
}

export default injectIntl(StoryCategory)
