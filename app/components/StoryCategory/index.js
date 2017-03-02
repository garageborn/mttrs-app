import React, { PropTypes, Component } from 'react'
import { Text, View } from 'react-native'
import { injectIntl, defineMessages } from 'react-intl'
import styles from './styles'

const messages = defineMessages({
  in: { id: 'storyCategory.in' }
})

class StoryCategory extends Component {
  render () {
    const { category, intl } = this.props
    const text = intl.formatMessage(messages.in)

    return (
      <View style={this.containerStyles}>
        <Text style={styles.text}>
          {text} <Text style={[...styles.category, { color: category.color }]}>
            {category.name.toUpperCase()}
          </Text>
        </Text>
      </View>
    )
  }

  get containerStyles () {
    if (!this.props.visited) return styles.container
    return [styles.container, styles.visited]
  }

}

StoryCategory.propTypes = {
  visited: PropTypes.bool.isRequired,
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string
  }).isRequired,
  intl: PropTypes.object
}

export default injectIntl(StoryCategory)
