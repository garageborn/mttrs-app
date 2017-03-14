import React, { PropTypes, Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

class StoryCategory extends Component {
  render () {
    const { category } = this.props

    return (
      <View style={this.containerStyles}>
        <Text style={styles.text}>
          <Text style={[...styles.category, { color: category.color }]}>
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
  }).isRequired
}

export default StoryCategory
