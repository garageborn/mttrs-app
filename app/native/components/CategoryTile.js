import React, { Component, PropTypes } from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
import styles from '../styles/Menu'
import * as cloudinary from '../../common/utils/Cloudinary'

class CategoryTile extends Component {
  render() {
    const { onPress, category } = this.props
    const { name, color, slug } = category
    return (
      <TouchableHighlight style={styles.categoryTouch} underlayColor={'rgba(255,255,255,.1)'} onPress={e => onPress(category)}>
        <View style={this.categoryStyle} shadowOffset={{width: 0, height: 2}} shadowColor={'rgba(0, 0, 0, 1)'} shadowOpacity={.5} elevation={1}>
          <Image style={styles.categoryIcon} source={{uri: this.categoryIcon}} />
          <Text style={[styles.categoryName, {color}]}>{name}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  get categoryIcon() {
    const { category } = this.props
    let options = { secure: true }

    return cloudinary.id(category.icon_id, options)
  }

  get categoryStyle() {
    const { category } = this.props
    return this.props.isActive ? [styles.category, styles.isActive, { borderColor: category.color }] : styles.category
  }
}

CategoryTile.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.any.isRequired
  }),
  onPress: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired
}

export default CategoryTile
