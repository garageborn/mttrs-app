import React, { Component, PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import styles from '../styles/Menu'
import * as cloudinary from '../../common/utils/Cloudinary'
import { WHITE_TRANSPARENT_COLOR } from '../../constants/TouchUnderlayColors'

class CategoryTile extends Component {
  render() {
    const { onPress, category } = this.props
    const { name, color } = category

    return (
      <View style={styles.categoryContainer}>
        <TouchableHighlight underlayColor={WHITE_TRANSPARENT_COLOR} onPress={e => onPress(category)}>
          <View style={this.categoryStyle} shadowOffset={{width: 0, height: 2}} shadowColor={'rgba(0, 0, 0, 1)'} shadowOpacity={.5} elevation={1}>
            {this.renderIcon()}
            <Text style={this.categoryNameStyle}>{name}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  renderIcon() {
    const { category, isActive } = this.props

    if (!category.icon_id) return

    let options = {
      secure: true
    }

    if (isActive) {
      options = {
        effect: 'colorize',
        color: '#FFF'
      }
    }

    let uri = cloudinary.id(category.icon_id, options)
    return <Image style={styles.categoryIcon} source={{uri: uri}} />
  }

  get categoryStyle() {
    const { category, isActive } = this.props
    return isActive ? [styles.category, { backgroundColor: category.color }] : styles.category
  }

  get categoryNameStyle() {
    const { category, isActive } = this.props
    const { color } = category
    return isActive ? [styles.categoryName, { color: '#FFF' }] : [styles.categoryName, { color }]
  }
}

CategoryTile.propTypes = {
  category: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
}

export default CategoryTile
